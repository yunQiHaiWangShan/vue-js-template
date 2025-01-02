/**
 * 创建重试拦截器
 * @param {Object} options - 重试配置选项
 * @param {boolean} options.enableRetry - 是否启用重试
 * @param {number} options.maxRetries - 最大重试次数
 * @param {number} options.retryDelay - 重试延迟时间(ms)
 * @param {import('axios').AxiosInstance} service - Axios 实例
 * @returns {Function} 重试拦截器
 */
export function createRetryInterceptor(options, service) {
  const { enableRetry = false, maxRetries = 2, retryDelay = 1000 } = options

  return async (error) => {
    const config = error.config

    // 如果未启用重试或配置中明确禁用重试，直接返回错误
    if (!enableRetry || config?.disableRetry) {
      return Promise.reject(error)
    }

    // 初始化重试次数
    if (!config || typeof config.retryTimes === 'undefined') {
      config.retryTimes = 0
    }

    // 检查是否超过最大重试次数
    if (config.retryTimes >= maxRetries) {
      return Promise.reject(error)
    }

    // 增加重试次数
    config.retryTimes++

    // 延迟重试
    await new Promise(resolve => setTimeout(resolve, retryDelay))
    return service.request(config)
  }
} 