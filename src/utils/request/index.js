import axios from 'axios'
import { REQUEST_CONFIG } from './config'
import { createRetryInterceptor } from './retry'
import { createCacheInterceptor } from './cache'
import { createCancelTokenInterceptor } from './cancel'
import { createRequestQueue } from './queue'
import { handleError } from './error'

/**
 * 请求服务类
 * @class RequestService
 */
class RequestService {
  constructor(config) {
    this.config = config
    this.instance = axios.create(config)
    this.setupInterceptors()
    this.queue = createRequestQueue(5, this.instance)
  }

  setupInterceptors() {
    // 取消令牌拦截器
    const cancelInterceptor = createCancelTokenInterceptor()
    this.instance.interceptors.request.use(
      cancelInterceptor.requestInterceptor,
      error => Promise.reject(error)
    )
    this.instance.interceptors.response.use(
      cancelInterceptor.responseInterceptor,
      cancelInterceptor.errorInterceptor
    )

    // 缓存拦截器
    const cacheInterceptor = createCacheInterceptor(
      this.config.cacheTimeout,
      this.instance
    )
    this.instance.interceptors.request.use(
      cacheInterceptor,
      error => Promise.reject(error)
    )

    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        const userStore = useUserStore()
        if (userStore.token) {
          config.headers.Authorization = `Bearer ${userStore.token}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      response => {
        const { code, data, message } = response.data
        if (code === this.config.customConfig.successCode) {
          return data
        }
        const error = new Error(message || 'Error')
        error.code = code
        return Promise.reject(error)
      },
      error => {
        // 处理 HTTP 错误状态
        if (error.response?.status === 401) {
          const userStore = useUserStore()
          userStore.logout()
          window.location.href = '/login'
          return Promise.reject(error)
        }

        // 统一错误处理
        handleError(error)
        return Promise.reject(error)
      }
    )

    // 重试拦截器
    this.instance.interceptors.response.use(
      response => response,
      createRetryInterceptor(
        {
          enableRetry: this.config.enableRetry,
          maxRetries: this.config.retry,
          retryDelay: this.config.retryDelay
        },
        this.instance
      )
    )
  }

  /**
   * 合并配置
   * @param {Object} config - 请求配置
   * @returns {Object} 合并后的配置
   */
  mergeConfig(config = {}) {
    const { customConfig = {} } = config
    return {
      ...config,
      customConfig: {
        ...this.config.customConfig,
        ...customConfig,
        headers: {
          ...this.config.customConfig.headers,
          ...customConfig.headers
        }
      }
    }
  }

  /**
   * 请求方法封装
   * @param {Object} config - 请求配置
   * @returns {Promise} 请求结果
   */
  async request(config) {
    const mergedConfig = this.mergeConfig(config)
    const { customConfig } = mergedConfig

    try {
      // 转换请求数据
      if (customConfig.transformRequest) {
        mergedConfig.data = customConfig.transformRequest(mergedConfig.data)
      }

      // 使用请求队列
      const response = await this.queue.add(mergedConfig)

      // 转换响应数据
      if (customConfig.transformResponse) {
        response.data = customConfig.transformResponse(response.data)
      }

      // 调用成功回调
      const result = await customConfig.onSuccess(response.data, response)

      // 调用完成回调
      customConfig.onComplete?.(null, result)

      return result
    } catch (error) {
      // 调用错误回调
      const result = await customConfig.onError(error)

      // 调用完成回调
      customConfig.onComplete?.(error)

      return Promise.reject(result)
    }
  }

  /**
   * GET 请求
   * @param {string} url - 请求地址
   * @param {Object} config - 请求配置
   * @returns {Promise} 请求结果
   */
  get(url, config = {}) {
    return this.request({ ...config, method: 'get', url })
  }

  /**
   * POST 请求
   * @param {string} url - 请求地址
   * @param {Object} data - 请求数据
   * @param {Object} config - 请求配置
   * @returns {Promise} 请求结果
   */
  post(url, data = {}, config = {}) {
    return this.request({ ...config, method: 'post', url, data })
  }

  /**
   * PUT 请求
   * @param {string} url - 请求地址
   * @param {Object} data - 请求数据
   * @param {Object} config - 请求配置
   * @returns {Promise} 请求结果
   */
  put(url, data = {}, config = {}) {
    return this.request({ ...config, method: 'put', url, data })
  }

  /**
   * DELETE 请求
   * @param {string} url - 请求地址
   * @param {Object} config - 请求配置
   * @returns {Promise} 请求结果
   */
  delete(url, config = {}) {
    return this.request({ ...config, method: 'delete', url })
  }

  /**
   * 文件上传
   * @param {string} url - 上传地址
   * @param {File} file - 文件对象
   * @param {Function} onProgress - 上传进度回调
   * @returns {Promise} 上传结果
   */
  upload(url, file, onProgress) {
    const formData = new FormData()
    formData.append('file', file)
    
    return this.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        if (onProgress) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percent)
        }
      }
    })
  }

  /**
   * 批量请求
   * @param {Array<Object>} requests - 请求配置数组
   * @returns {Promise} 所有请求的结果数组
   */
  all(requests) {
    return Promise.all(requests.map(config => this.request(config)))
  }
}

// 导出请求实例
export const request = new RequestService(REQUEST_CONFIG) 