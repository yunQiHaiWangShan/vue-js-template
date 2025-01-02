import axios from 'axios'

export function createCancelTokenInterceptor() {
  const pendingMap = new Map()

  function generateReqKey(config) {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  }

  function addPending(config) {
    const requestKey = generateReqKey(config)
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
      if (!pendingMap.has(requestKey)) {
        pendingMap.set(requestKey, cancel)
      }
    })
  }

  function removePending(config) {
    const requestKey = generateReqKey(config)
    if (pendingMap.has(requestKey)) {
      const cancel = pendingMap.get(requestKey)
      cancel(requestKey)
      pendingMap.delete(requestKey)
    }
  }

  return {
    requestInterceptor: config => {
      removePending(config)
      addPending(config)
      return config
    },
    responseInterceptor: response => {
      removePending(response.config)
      return response
    },
    errorInterceptor: error => {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message)
      } else {
        removePending(error.config || {})
      }
      return Promise.reject(error)
    }
  }
} 