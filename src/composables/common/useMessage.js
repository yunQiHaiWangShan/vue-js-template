/**
 * 消息提示组合式函数
 * @returns {Object} 消息提示方法集合
 */
export function useMessage() {
  const showSuccess = (message) => {
    ElMessage.success(message)
  }

  const showError = (message) => {
    ElMessage.error(message)
  }

  const showWarning = (message) => {
    ElMessage.warning(message)
  }

  const showInfo = (message) => {
    ElMessage.info(message)
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
} 