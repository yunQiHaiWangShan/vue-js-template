/**
 * 验证工具函数
 */
export const validateUtils = {
  /**
   * 手机号验证
   * @param {string} value - 手机号
   * @returns {boolean} 验证结果
   */
  isPhone(value) {
    return /^1[3-9]\d{9}$/.test(value)
  },

  /**
   * 邮箱验证
   * @param {string} value - 邮箱
   * @returns {boolean} 验证结果
   */
  isEmail(value) {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)
  },

  /**
   * URL验证
   * @param {string} value - URL
   * @returns {boolean} 验证结果
   */
  isUrl(value) {
    return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)
  }
} 