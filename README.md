# vue-js-template
一个基于最新vite + vue3 + elementPlus的js项目模板

## 技术栈
- 构建工具：Vite 5.x
- 前端框架：Vue 3.5.x
- UI 框架：Element Plus 2.9.x
- 状态管理：Pinia 2.3.x
- 路由：Vue Router 4.5.x
- HTTP 请求：Axios 1.6.x
- 代码规范：ESLint 8.x + Prettier 3.x + Stylelint 16.x
- Git 规范：husky + lint-staged
- 包管理器：pnpm 8.x（必需）
- Node 版本要求：>=20.0.0

## 项目特性
- 🚀 快速启动：基于 Vite 的极速开发体验
- 📦 组件自动导入：基于 unplugin-auto-import 和 unplugin-vue-components
- 🔥 热更新：快速响应代码变更
- 📱 主题定制：可自定义 Element Plus 主题
- 🔒 权限管理：路由级别的权限控制
- 📝 代码规范：统一的代码风格和提交规范
- 📊 错误监控：生产环境错误捕获
- 🌐 环境配置：开发、测试、生产多环境配置
- 📈 构建分析：使用 rollup-plugin-visualizer 分析构建产物
- 🗜️ 资源压缩：使用 vite-plugin-compression 和 vite-plugin-imagemin 优化资源

## 项目结构
```
vue-js-template
├── public/                 # 静�����源
├── src/
│   ├── api/               # 接口请求
│   ├── assets/            # 项目资源
│   ├── components/        # 公共组件
│   ├── config/            # 全局配置
│   ├── directives/        # 自定义指令
│   ├── hooks/             # 组合式函数
│   ├── layout/            # 布局组件
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   ├── styles/            # 全局样式
│   ├── utils/             # 工具函数
│   ├── views/             # 页面组件
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── .eslintrc.js          # ESLint 配置
├── .prettierrc           # Prettier 配置
├── .env                  # 环境变量
├── .env.development      # 开发环境变量
├── .env.production       # 生产环境变量
├── vite.config.js        # Vite 配置
└── package.json          # 项目依赖

## 快速开始

```bash
# 推荐使用 pnpm
pnpm install

# 开发环境启动
pnpm dev

# 打包
pnpm build

# 代码格式化
pnpm lint
```

## 开发规范

### 命名规范
- 文件夹命名：小写字母，多个单词用 - 连接
- 组件命名：大驼峰命名法（PascalCase）
- 变量命名：小驼峰命名法（camelCase）
- 常量命名：全大写，下划线连接（UPPER_SNAKE_CASE）

### 代码规范
- 使用 ESLint + Prettier 进行代码格式化
- 提交前自动进行代码检查和格式化
- 遵循 Vue3 官方推荐的代码风格指南

### 样式规范
- SCSS 变量和 mixin 命名使用 kebab-case 命名法
- 使用 CSS Modules 导出变量时，导出的变量名使用 camelCase
- 样式文件使用 stylelint 进行规范检查
- 主题相关的变量统一在 variables.scss 中管理

### Git 提交规范
提交信息格式：`<type>: <description>`

type 类型：
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构代码
- test: 测试相关
- chore: 构建程或辅助工具的变动

## 注意事项
1. 开发时注意代码分层，保持组件的单一职责
2. 及时更新依赖包，关注安全漏洞提醒
3. 生产环境部署前确保关闭调试工具和console日志
4. 重要操作需要做好错误处理和用户提示

## API 模块使用文档

### 1. 基础使用

#### 1.1 发起请求
```javascript
import { request } from '@/utils/request'

// GET 请求
const data = await request.get('/api/endpoint', { params })

// POST 请求
const result = await request.post('/api/endpoint', data, config)

// PUT 请求
const updated = await request.put('/api/endpoint', data, config)

// DELETE 请求
const deleted = await request.delete('/api/endpoint', config)
```

#### 1.2 文件上传
```javascript
// 单文件上传
const result = await request.upload('/api/upload', file, (progress) => {
  console.log(`上传进度: ${progress}%`)
})
```

#### 1.3 批量请求
```javascript
const results = await request.all([
  { url: '/api/endpoint1', method: 'get' },
  { url: '/api/endpoint2', method: 'post', data: {} }
])
```

### 2. 高级特性

#### 2.1 请求配置
```javascript
const config = {
  // 请求头
  headers: { 'Custom-Header': 'value' },
  
  // 自定义配置
  customConfig: {
    // 转换请求数据
    transformRequest: (data) => {
      // 处理请求数据
      return data
    },
    
    // 转换响应数据
    transformResponse: (data) => {
      // 处理响应数据
      return data
    },
    
    // 成功回调
    onSuccess: (data, response) => {
      // 处理成功响应
      return data
    },
    
    // 错误回调
    onError: (error) => {
      // 处理错误
      return Promise.reject(error)
    },
    
    // 完成回调
    onComplete: (error, result) => {
      // 请求完成后的处理
    }
  }
}
```

#### 2.2 请求缓存
```javascript
// 启用缓存的请求
const data = await request.get('/api/cached-endpoint', {
  customConfig: {
    enableCache: true,
    cacheTimeout: 5 * 60 * 1000 // 5分钟缓存
  }
})
```

#### 2.3 请求重试
```javascript
// 启用重试的请求
const data = await request.get('/api/retry-endpoint', {
  customConfig: {
    enableRetry: true,
    retry: 3,           // 重试3次
    retryDelay: 1000    // 延迟1秒
  }
})
```

### 3. 错误处理

#### 3.1 全局错误处理
默认情况下，所有请求错误都会经过全局错误处理：
- HTTP 状态错误（如 404、500 等）
- 业务错误（非 0 状态码）
- 网络错误
- 超时错误

#### 3.2 自定义错误处理
```javascript
const data = await request.get('/api/endpoint', {
  customConfig: {
    onError: (error) => {
      // 自定义错误处理
      console.error('请求失败:', error)
      return Promise.reject(error)
    }
  }
})
```

### 4. 认证与授权

#### 4.1 Token 认证
系统会自动为请求添加 Bearer Token：
```javascript
// Token 会自动添加到请求头
// Authorization: Bearer <token>
const data = await request.get('/api/protected-endpoint')
```

#### 4.2 401 处理
当收到 401 响应时，系统会：
1. 自动清除用户 token
2. 跳转到登录页面
3. 中断当前请求

### 5. 性能优化

#### 5.1 请求队列
系统默认限制并发请求数为 5，超出的请求会进入队列等待执行。

#### 5.2 请求取消
```javascript
// 使用取消令牌
const cancelToken = request.CancelToken.source()

const data = await request.get('/api/endpoint', {
  cancelToken: cancelToken.token
})

// 取消请求
cancelToken.cancel('请求已取消')
```

### 6. 最佳实践

#### 6.1 API 模块化
推荐使用类的方式组织 API 模块：

```javascript
// api/modules/user.js
import { request } from '@/utils/request'

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
          password: window.btoa(data.password) // 密码编码
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
}

// 导出单例实例
export const userApi = new UserAPI()
```

使用示例：
```javascript
import { userApi } from '@/api/modules/user'

// 登录
const loginResult = await userApi.login({
  username: 'admin',
  password: '123456'
})

// 获取用户信息
const userInfo = await userApi.getUserInfo()
```

#### 6.2 错误处理
```javascript
try {
  const result = await userApi.deleteUser(id)
} catch (error) {
  if (error.code === 'USER_IN_USE') {
    // 处理特定业务错误
    console.error('用户正在使用中，无法删除')
  } else {
    // 处理其他错误
    console.error('删除用户失败:', error)
  }
}
```

### 7. 环境配置

在不同环境下的 API 配置：

```bash
# .env.development
VITE_API_BASE_URL=http://dev-api.example.com

# .env.production
VITE_API_BASE_URL=http://api.example.com
```

### 8. 类型定义

如果使用 TypeScript，可以这样定义响应类型：

```typescript
interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

interface UserInfo {
  id: number
  name: string
  email: string
}

// 使用类型
const response = await request.get<ApiResponse<UserInfo>>('/user/info')
```

### 9. 完整调用示例

以下是一个完整的用户管理功能调用示例：

```vue
<template>
  <div class="user-management">
    <!-- 用户列表 -->
    <el-table v-loading="loading" :data="userList">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="250">
        <template #default="{ row }">
          <el-button @click="handleEdit(row)">编辑</el-button>
          <el-button @click="handleDelete(row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑用户' : '新建用户'">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="启用" value="active" />
            <el-option label="禁用" value="inactive" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { userApi } from '@/api/modules/user'

// 数据定义
const loading = ref(false)
const userList = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({
  id: null,
  username: '',
  email: '',
  status: 'active'
})

// 表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符' }
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入正确的邮箱格式' }
  ],
  status: [{ required: true, message: '请选择状态' }]
}

// 获取用户列表
async function fetchUserList() {
  loading.value = true
  try {
    const { list, total } = await userApi.getUserList({
      page: 1,
      pageSize: 10
    })
    userList.value = list
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

// 编辑用户
function handleEdit(row) {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

// 新建用户
function handleCreate() {
  isEdit.value = false
  form.value = {
    id: null,
    username: '',
    email: '',
    status: 'active'
  }
  dialogVisible.value = true
}

// 删除用户
async function handleDelete(row) {
  try {
    await ElMessageBox.confirm('确定要删除此用户吗？', '提示', {
      type: 'warning'
    })
    
    await userApi.deleteUser(row.id)
    ElMessage.success('删除成功')
    await fetchUserList()
  } catch (error) {
    if (error.code === 'USER_IN_USE') {
      ElMessage.error('用户正在使用中，无法删除')
    } else if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 保存用户
async function handleSave() {
  try {
    if (isEdit.value) {
      await userApi.updateUser(form.value.id, form.value)
      ElMessage.success('更新成功')
    } else {
      const { success, userId } = await userApi.createUser(form.value)
      if (success) {
        ElMessage.success('创建成功')
      }
    }
    dialogVisible.value = false
    await fetchUserList()
  } catch (error) {
    ElMessage.error(isEdit.value ? '更新失败' : '创建失败')
  }
}

// 上传头像示例
async function handleAvatarUpload(userId, file) {
  try {
    const avatarUrl = await userApi.uploadAvatar(userId, file, (progress) => {
      console.log(`上传进度: ${progress}%`)
    })
    ElMessage.success('头像上传成功')
    return avatarUrl
  } catch (error) {
    ElMessage.error('头像上传失败')
  }
}

// 批量更新状态示例
async function handleBatchUpdateStatus(users) {
  try {
    const { successCount, failureCount, failures } = await userApi.batchUpdateStatus(users)
    if (failureCount > 0) {
      ElMessage.warning(`${failureCount} 个用户状态更新失败`)
      console.error('失败详情:', failures)
    } else {
      ElMessage.success('批量更新成功')
    }
    await fetchUserList()
  } catch (error) {
    ElMessage.error('批量更新失败')
  }
}

// 初始化
onMounted(() => {
  fetchUserList()
})
</script>
```

这个示例展示了：

1. **基础操作**
   - 获取用户列表
   - 创建用户
   - 更新用户
   - 删除用户

2. **高级功能**
   - 文件上传（头像）
   - 批量操作
   - 进度回调

3. **错误处理**
   - 业务错误处理
   - 全局错误提示
   - 加载状态管理

4. **UI 交互**
   - 表格展示
   - 表单验证
   - 确认对话框
   - 加载状态
   - 操作反馈

5. **最佳实践**
   - 组件化设计
   - 响应式数据
   - 异步操作处理
   - 统一的错误处理
   - 友好的用户提示
