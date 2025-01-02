export const REQUEST_CONFIG = {
  // 基础配置
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,

  // 重试配置
  enableRetry: false, // 默认关闭重试
  retry: 2,          // 重试次数
  retryDelay: 1000,  // 重试延迟时间

  // 缓存配置
  enableCache: true,
  cacheTimeout: 5 * 60 * 1000, // 5分钟

  // 自定义默认配置
  customConfig: {
    // 默认请求头
    headers: {
      'Content-Type': 'application/json'
    },
    // 默认成功回调
    onSuccess: (data, response) => data,
    // 默认失败回调
    onError: error => Promise.reject(error),
    // 默认完成回调
    onComplete: () => {},
    // 默认转换响应数据
    transformResponse: data => data,
    // 默认转换请求数据
    transformRequest: data => data,
    // 默认的业务成功状态码
    successCode: 0
  }
} 