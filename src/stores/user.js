export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)
  const permissions = ref([])

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => userInfo.value?.username)
  const avatar = computed(() => userInfo.value?.avatar)
  const hasPermission = (permission) => permissions.value.includes(permission)

  // Actions
  /**
   * 设置token
   * @param {string} newToken - 用户token
   */
  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  /**
   * 清除token
   */
  function clearToken() {
    token.value = ''
    localStorage.removeItem('token')
  }

  /**
   * 设置用户信息
   * @param {Object} info - 用户信息
   */
  function setUserInfo(info) {
    userInfo.value = info
    if (info?.permissions) {
      permissions.value = info.permissions
    }
  }

  /**
   * 用户登录
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @returns {Promise} 登录结果
   */
  async function login(username, password) {
    try {
      const data = await userApi.login({ username, password })
      setToken(data.token)
      await fetchUserInfo()
      return data
    } catch (error) {
      clearToken()
      throw error
    }
  }

  /**
   * 获取用户信息
   * @returns {Promise} 用户信息
   */
  async function fetchUserInfo() {
    try {
      const data = await userApi.getUserInfo()
      setUserInfo(data)
      return data
    } catch (error) {
      clearToken()
      throw error
    }
  }

  /**
   * 用户登出
   */
  async function logout() {
    clearToken()
    userInfo.value = null
    permissions.value = []
  }

  return {
    // 状态
    token,
    userInfo,
    permissions,
    
    // 计算属性
    isLoggedIn,
    username,
    avatar,
    hasPermission,
    
    // Actions
    setToken,
    clearToken,
    setUserInfo,
    login,
    fetchUserInfo,
    logout
  }
}) 