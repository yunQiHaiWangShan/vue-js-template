/**
 * 通用请求处理组合式函数
 * @param {Function} requestFn - 请求函数
 * @param {Object} options - 配置选项
 * @returns {Object} 请求状态和控制方法
 */
export function useRequest(requestFn, options = {}) {
  const {
    immediate = true,
    initialData = null,
    onSuccess,
    onError,
    onFinally
  } = options

  const data = ref(initialData)
  const loading = ref(false)
  const error = ref(null)

  const execute = async (...args) => {
    loading.value = true
    error.value = null

    try {
      const result = await requestFn(...args)
      data.value = result
      onSuccess?.(result)
      return result
    } catch (err) {
      error.value = err
      onError?.(err)
      return Promise.reject(err)
    } finally {
      loading.value = false
      onFinally?.()
    }
  }

  if (immediate) {
    execute()
  }

  return {
    data,
    loading,
    error,
    execute
  }
} 