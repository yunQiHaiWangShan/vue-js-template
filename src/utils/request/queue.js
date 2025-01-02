/**
 * 创建请求队列
 * @param {number} maxConcurrent - 最大并发数
 * @param {import('axios').AxiosInstance} service - Axios 实例
 * @returns {Object} 请求队列实例
 */
export function createRequestQueue(maxConcurrent = 5, service) {
  const queue = []
  let running = 0

  function runNext() {
    if (queue.length === 0 || running >= maxConcurrent) return

    running++
    const { config, resolve, reject } = queue.shift()

    service.request(config)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        running--
        runNext()
      })
  }

  return {
    add(config) {
      return new Promise((resolve, reject) => {
        queue.push({ config, resolve, reject })
        runNext()
      })
    }
  }
} 