/**
 * 创建缓存拦截器
 * @param {number} ttl - 缓存过期时间(ms)
 * @param {import('axios').AxiosInstance} service - Axios 实例
 * @returns {Function} 缓存拦截器
 */
export function createCacheInterceptor(ttl = 60000, service) {
  const cache = new Map()

  return async (config) => {
    if (config.method !== 'get' || !config.useCache) {
      return config
    }

    const key = `${config.url}${JSON.stringify(config.params || {})}`
    const cached = cache.get(key)

    if (cached && Date.now() - cached.timestamp < ttl) {
      return Promise.resolve(cached.data)
    }

    try {
      const response = await service.request(config)
      cache.set(key, {
        data: response,
        timestamp: Date.now()
      })
      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
} 