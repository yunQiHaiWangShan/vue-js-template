/**
 * 数据处理工具函数
 */
export const dataUtils = {
  /**
   * 深拷贝
   * @param {*} obj - 需要拷贝的对象
   * @returns {*} 拷贝后的对象
   */
  deepClone(obj) {
    if (!obj || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    
    const clone = Array.isArray(obj) ? [] : {}
    Object.keys(obj).forEach(key => {
      clone[key] = this.deepClone(obj[key])
    })
    return clone
  },

  /**
   * 数组去重
   * @param {Array} arr - 需要去重的数组
   * @param {string} [key] - 对象数组根据key去重
   * @returns {Array} 去重后的数组
   */
  unique(arr, key) {
    if (!Array.isArray(arr)) return arr
    if (key) {
      const map = new Map()
      return arr.filter(item => {
        if (!map.has(item[key])) {
          map.set(item[key], true)
          return true
        }
        return false
      })
    }
    return [...new Set(arr)]
  }
} 