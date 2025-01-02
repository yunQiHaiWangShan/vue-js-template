/**
 * 错误码映射表
 */
export const ERROR_CODE_MAP = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时'
}

/**
 * 业务错误码映射表
 */
export const BUSINESS_CODE_MAP = {
  10001: '用户名或密码错误',
  10002: '账号已被禁用',
  10003: '权限不足',
  10004: '操作频繁，请稍后重试'
}

/**
 * 处理HTTP错误
 * @param {Error} error - 错误对象
 * @returns {string} 错误信息
 */
export function handleHttpError(error) {
  const { response } = error
  const status = response?.status
  const message = ERROR_CODE_MAP[status] || '网络错误，请稍后重试'
  return message
}

/**
 * 处理业务错误
 * @param {Error} error - 错误对象
 * @returns {string} 错误信息
 */
export function handleBusinessError(error) {
  const code = error.code
  const message = BUSINESS_CODE_MAP[code] || error.message || '操作失败'
  return message
}

/**
 * 统一错误处理
 * @param {Error} error - 错误对象
 */
export function handleError(error) {
  const { showError } = useMessage()
  
  // 处理HTTP错误
  if (error.response) {
    const message = handleHttpError(error)
    showError(message)
    return
  }
  
  // 处理业务错误
  if (error.code) {
    const message = handleBusinessError(error)
    showError(message)
    return
  }
  
  // 处理其他错误
  showError(error.message || '未知错误')
} 