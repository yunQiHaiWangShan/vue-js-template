import { request } from '@/utils/request'

/**
 * 用户相关接口
 */
class UserAPI {
  constructor() {
    this.baseURL = '/user'
  }

  /**
   * 用户登录
   * @param {Object} data - 登录参数
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @returns {Promise<Object>} 登录结果
   */
  login(data) {
    return request.post('/auth/login', data, {
      customConfig: {
        transformRequest: data => ({
          ...data,
          password: window.btoa(data.password) // 简单的密码编码
        }),
        transformResponse: data => ({
          token: data.token,
          expires: new Date(data.expires).getTime()
        })
      }
    })
  }

  /**
   * 获取用户信息
   * @returns {Promise<Object>} 用户信息
   */
  getUserInfo() {
    return request.get(`${this.baseURL}/info`, {
      customConfig: {
        enableCache: true,
        cacheTimeout: 5 * 60 * 1000, // 5分钟缓存
        onError: error => {
          if (error.response?.status === 401) {
            return null
          }
          throw error
        }
      }
    })
  }

  /**
   * 获取用户列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.pageSize - 每页数量
   * @param {string} [params.keyword] - 搜索关键词
   * @param {string} [params.status] - 用户状态
   * @returns {Promise<Object>} 用户列表结果
   */
  getUserList(params) {
    return request.get(`${this.baseURL}/list`, {
      params,
      customConfig: {
        // Mock 数据
        transformResponse: () => ({
          items: Array.from({ length: 10 }, (_, index) => ({
            id: index + 1,
            username: `user${index + 1}`,
            email: `user${index + 1}@example.com`,
            status: index % 2 === 0 ? 'active' : 'inactive'
          })),
          total: 100
        }),
        // 转换响应数据
        transformResponse: data => ({
          list: data.items,
          total: data.total,
          page: params.page,
          pageSize: params.pageSize
        })
      }
    })
  }

  /**
   * 创建用户
   * @param {Object} data - 用户数据
   * @returns {Promise<Object>} 创建结果
   */
  createUser(data) {
    return request.post(`${this.baseURL}/create`, data, {
      customConfig: {
        // Mock 数据
        transformResponse: () => ({
          success: true,
          id: Math.floor(Math.random() * 1000)
        }),
        // 转换请求数据
        transformRequest: data => {
          const { password, ...rest } = data
          return {
            ...rest,
            password: window.btoa(password)
          }
        }
      }
    })
  }

  /**
   * 更新用户信息
   * @param {string} id - 用户ID
   * @param {Object} data - 用户数据
   * @returns {Promise<Object>} 更新结果
   */
  updateUser(id, data) {
    return request.put(`${this.baseURL}/${id}`, data, {
      customConfig: {
        // Mock 数据
        transformResponse: () => ({
          success: true
        }),
        // 数据验证
        transformRequest: data => {
          const { id, createdAt, updatedAt, ...rest } = data
          return rest
        }
      }
    })
  }

  /**
   * 删除用户
   * @param {string} id - 用户ID
   * @returns {Promise<boolean>} 删除结果
   */
  deleteUser(id) {
    return request.delete(`${this.baseURL}/${id}`, {
      customConfig: {
        // Mock 数据
        transformResponse: () => true,
        // 自定义成功处理
        onSuccess: () => true,
        // 自定义错误处理
        onError: error => {
          if (error.code === 'USER_IN_USE') {
            throw new Error('用户正在使用中，无法删除')
          }
          throw error
        }
      }
    })
  }

  /**
   * 批量更新用户状态
   * @param {Array<{id: string, status: string}>} users - 用户状态列表
   * @returns {Promise<Object>} 更新结果
   */
  batchUpdateStatus(users) {
    return request.post(`${this.baseURL}/batch-update-status`, users, {
      customConfig: {
        // Mock 数据
        transformResponse: () => ({
          success: users.filter((_, i) => i % 4 !== 0),
          failure: users.filter((_, i) => i % 4 === 0)
        }),
        transformResponse: data => ({
          successCount: data.success.length,
          failureCount: data.failure.length,
          failures: data.failure
        })
      }
    })
  }

  /**
   * 上传用户头像
   * @param {string} userId - 用户ID
   * @param {File} file - 头像文件
   * @param {Function} onProgress - 上传进度回调
   * @returns {Promise<string>} 头像URL
   */
  uploadAvatar(userId, file, onProgress) {
    return request.upload(`${this.baseURL}/${userId}/avatar`, file, onProgress)
  }
}

// 导出用户API实例
export const userApi = new UserAPI() 