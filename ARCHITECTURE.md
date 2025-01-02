# Vue.js 项目架构设计文档

> [!TIP]
> 为了更好的阅读体验，建议使用支持 Markdown 目录导航的编辑器（如 VSCode）阅读此文档，并开启大纲视图（Outline）。
> - VSCode: 使用快捷键 `Ctrl+Shift+P`(Windows) 或 `Cmd+Shift+P`(Mac)，搜索并执行 `Markdown: Open Preview to the Side` 命令，同时打开 `Outline` 视图
> - 其他编辑器: 请开启类似的文档大纲或目录导航功能

## 目录

1. [整体架构](#1-整体架构)
   - [1.1 技术选型说明](#11-技术选型说明)
   - [1.2 项目分层架构](#12-项目分层架构)

2. [开发范式](#2-开发范式)
   - [2.1 组件设计原则](#21-组件设计原则)
   - [2.2 组件分类与职责](#22-组件分类与职责)
   - [2.3 组件通信规范](#23-组件通信规范)
   - [2.4 代码组织规范](#24-代码组织规范)
   - [2.5 组合式函数规范](#25-组合式函数规范)
   - [2.6 最佳实践](#26-最佳实践)

3. [状态管理](#3-状态管理)
   - [3.1 Pinia Store 设计](#31-pinia-store-设计)
   - [3.2 Store 使用规范](#32-store-使用规范)
   - [3.3 Store 最佳实践](#33-store-最佳实践)

4. [网络请求](#4-网络请求)
   - [4.1 请求层设计](#41-请求层设计)
   - [4.2 API 管理](#42-api-管理)
   - [4.3 使用示例](#43-使用示例)
   - [4.4 最佳实践](#44-最佳实践)
   - [4.5 高级功能](#45-高级功能)

5. [路由设计](#5-路由设计)
   - [5.1 基础路由结构](#51-基础路由结构)
   - [5.2 动态路由配置](#52-动态路由配置)
   - [5.3 路由守卫实现](#53-路由守卫实现)
   - [5.4 路由元信息设计](#54-路由元信息设计)
   - [5.5 路由工具函数](#55-路由工具函数)
   - [5.6 使用示例](#56-使用示例)
   - [5.7 最佳实践](#57-最佳实践)

6. [工具函数](#6-工具函数)
   - [6.1 工具分类](#61-工具分类)
   - [6.2 工具函数规范](#62-工具函数规范)

7. [性能优化](#7-性能优化)
   - [7.1 代码层面优化](#71-代码层面优化)
   - [7.2 资源加载优化](#72-资源加载优化)
   - [7.3 构建优化](#73-构建优化)
   - [7.4 运行时优化](#74-运行时优化)
   - [7.5 性能监控](#75-性能监控)
   - [7.6 最佳实践](#76-最佳实践)

8. [开发流程](#8-开发流程)
   - [8.1 分支管理](#81-分支管理)
   - [8.2 代码提交](#82-代码提交)
   - [8.3 发布流程](#83-发布流程)

9. [工程化配置](#9-工程化配置)
   - [9.1 Vite 插件管理规范](#91-vite-插件管理规范)
   - [9.2 环境配置](#92-环境配置)
   - [9.3 代码规范配置](#93-代码规范配置)
   - [9.4 Git 配置](#94-git-配置)
   - [9.5 构建优化配置](#95-构建优化配置)
   - [9.6 多环境打包脚本](#96-多环境打包脚本)
   - [9.7 依赖管理](#97-依赖管理)

10. [布局设计](#10-布局设计)
    - [10.1 布局层次结构](#101-布局层次结构)
    - [10.2 布局组件职责](#102-布局组件职责)
    - [10.3 布局配置](#103-布局配置)
    - [10.4 布局最佳实践](#104-布局最佳实践)
    - [10.5 注意事项](#105-注意事项)

## 1. 整体架构

### 1.1 技术选型说明

- **Vue 3**：使用 Composition API，提供更好的代码组织和复用能力
- **Element Plus**：成熟的 UI 组件库，适合快速构建企业级应用
- **Vite**：现代化的构建工具，提供更快的开发体验
- **Pinia**：轻量级状态管理方案，更好的 TypeScript 支持
- **Vue Router**：官方路由方案，支持路由懒加载

### 1.2 项目分层架构

#### 1.2.1 整体分层

```
表现层（Presentation Layer）
    ↓↑
业务逻辑层（Business Logic Layer）
    ↓↑
数据访问层（Data Access Layer）
    ↓↑
基础设施层（Infrastructure Layer）
```

#### 1.2.2 分层职责

1. **表现层（Presentation Layer）**

   - 位置：`src/views/`、`src/components/`
   - 职责：
     - 页面渲染和用户交互
     - 表单验证和数据格式化
     - 组件间通信
     - 路由视图管理
   - 核心模块：
     - 页面组件（Views）
     - 业务组件（Business Components）
     - 基础组件（Base Components）
     - 布局组件（Layout Components）

   ```vue
   // 表现层示例
   <template>
     <div class="user-list">
       <UserSearchForm :search-params="searchParams" @search="handleSearch" />
       <UserTable
         :data="tableData"
         :loading="loading"
         @update="handleUpdate"
         @delete="handleDelete"
       />
       <BasePagination
         v-model:current="pagination.current"
         v-model:size="pagination.size"
         :total="pagination.total"
         @change="handlePageChange"
       />
     </div>
   </template>

   <script setup>
     import { ref, reactive, onMounted } from 'vue'
     import { useUserList } from '@/composables/user/useUserList'
     import { useMessage } from '@/composables/common/useMessage'

     // 组合式函数调用
     const { tableData, loading, pagination, searchParams, fetchUserList, updateUser, deleteUser } =
       useUserList()

     const { showSuccess, showError } = useMessage()

     // 事件处理
     const handleSearch = async () => {
       try {
         await fetchUserList()
         showSuccess('查询成功')
       } catch (error) {
         showError(error.message)
       }
     }

     const handleUpdate = async user => {
       try {
         await updateUser(user)
         showSuccess('更新成功')
       } catch (error) {
         showError(error.message)
       }
     }

     const handleDelete = async userId => {
       try {
         await deleteUser(userId)
         showSuccess('删除成功')
         await fetchUserList() // 刷新列表
       } catch (error) {
         showError(error.message)
       }
     }

     const handlePageChange = () => {
       fetchUserList()
     }

     // 生命周期
     onMounted(() => {
       fetchUserList()
     })
   </script>
   ```

2. **业务逻辑层（Business Logic Layer）**

   - 位置：`src/stores/`、`src/composables/`
   - 职责：
     - 业务规则实现
     - 数据处理和转换
     - 状态管理
     - 业务流程控制
   - 核心模块：
     - Store 模块（Pinia Stores）
     - 组合式函数（Composables）
     - 业务工具（Business Utils）

   ```javascript
   // 业务逻辑层示例
   // stores/userStore.js
   export const useUserStore = defineStore('user', {
     state: () => ({
       userList: [],
       currentUser: null,
       loading: false
     }),
     actions: {
       async fetchUsers(params) {
         this.loading = true
         try {
           const data = await userApi.getUsers(params)
           this.userList = this.formatUserData(data)
         } finally {
           this.loading = false
         }
       }
     }
   })

   // composables/useUserManagement.js
   export function useUserManagement() {
     const userStore = useUserStore()
     const loading = computed(() => userStore.loading)

     const handleUserOperation = async (type, userData) => {
       switch (type) {
         case 'create':
           await userStore.createUser(userData)
           break
         case 'update':
           await userStore.updateUser(userData)
           break
         // ...其他操���
       }
     }

     return {
       loading,
       handleUserOperation
     }
   }
   ```

3. **数据访问层（Data Access Layer）**

   - 位置：`src/api/`
   - 职责：
     - API 接口封装
     - 数据持久化
     - 缓存管理
     - 数据转换
   - 核心模块：
     - API 模块
     - 数据模型
     - 缓存服务

   ```javascript
   // 数据访问层示例
   // api/userApi.js
   export const userApi = {
     // API 方法
     getUsers: params => request.get('/api/users', { params }),
     createUser: data => request.post('/api/users', data),
     updateUser: (id, data) => request.put(`/api/users/${id}`, data),

     // 缓存方法
     getUserFromCache: async id => {
       const cached = await cache.get(`user:${id}`)
       if (cached) return cached

       const user = await request.get(`/api/users/${id}`)
       await cache.set(`user:${id}`, user)
       return user
     }
   }
   ```

4. **基础设施层（Infrastructure Layer）**

   - 位置：`src/utils/`、`src/plugins/`
   - 职责：
     - 网络请求封装
     - 工具函数
     - 全局配置
     - 插件管理
   - 核心模块：
     - HTTP 客户端
     - 工具库
     - 插件配置
     - 常量定义

   ```javascript
   // 基础设施层示例
   // utils/request/index.ts
   const service = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
     timeout: 5000
   })
   
   // 请求拦截器
   service.interceptors.request.use(
     config => {
       const userStore = useUserStore()
       
       // 设置 token
       if (userStore.token) {
         config.headers.Authorization = `Bearer ${userStore.token}`
       }
       
       return config
     },
     error => {
       return Promise.reject(error)
     }
   )
   
   // 响应拦截器
   service.interceptors.response.use(
     response => {
       const { code, data, message } = response.data
       
       // 请求成功
       if (code === 0) {
         return data
       }
       
       // 业务错误
       const error = new Error(message || 'Error')
       error.code = code
       return Promise.reject(error)
     },
     error => {
       const { response } = error
       
       // 处理 HTTP 错误
       if (response?.status === 401) {
         const userStore = useUserStore()
         userStore.logout()
         router.push('/login')
       }
       
       return Promise.reject(error)
     }
   )
   
   // 请求方法封装
   export const request = {
     get: <T = any>(url: string, config?: AxiosRequestConfig) =>
       service.get<T>(url, config),
     
     post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
       service.post<T>(url, data, config),
     
     put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
       service.put<T>(url, data, config),
     
     delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
       service.delete<T>(url, config),
     
     upload: (url: string, file: File, onProgress?: (percent: number) => void) => {
       const formData = new FormData()
       formData.append('file', file)
       
       return service.post(url, formData, {
         headers: {
           'Content-Type': 'multipart/form-data'
         },
         onUploadProgress: (e: ProgressEvent) => {
           if (onProgress) {
             const percent = Math.round((e.loaded * 100) / e.total)
             onProgress(percent)
           }
         }
       })
     }
   }
   
   // 使用示例
   // api/user.ts
   export function useUserApi() {
     return {
       // 登录
       login: (data: LoginForm) => 
         request.post<LoginResult>('/auth/login', data),
   
       // 获取用户信息
       getUserInfo: () => 
         request.get<UserInfo>('/user/info'),
   
       // 更新用户信息
       updateUserInfo: (data: Partial<UserInfo>) => 
         request.put<UserInfo>('/user/info', data),
   
       // 上传头像
       uploadAvatar: (file: File, onProgress?: (percent: number) => void) => 
         request.upload('/user/avatar', file, onProgress)
     }
   }
   
   // 组件中使用
   const userApi = useUserApi()
   const { loading, data, error, execute } = useRequest(userApi.getUserInfo)
   ```

   这种设计提供了：

   1. **类型安全**
      - 使用 TypeScript 类��������
      - 泛型支持请求响应类型
      - 完整的类型推导

   2. **统一���错误处理**
      - HTTP 错误处理
      - 业务错误处理
      - 全局错误拦截

   3. **请求拦截器**
      - Token 自动注入
      - 请求参数处理
      - 请求头配置

   4. **响应拦截器**
      - 响应数据转换
      - 错误状态处理
      - 登录状态维护

   5. **上传功能**
      - 文件上传支持
      - 上传进度回调
      - 自动处理表单数据

   6. **组合式 API 集成**
      - 与 useRequest 无缝配合
      - 支持响应式数据
      - 自动管理加载状态

#### 1.2.3 分层通信规则

1. **单向数据流**

   - 数据流向：基础设施层 → 数据访问层 → 业务逻辑层 → ���现���
   - 事件流向：表现层 → 业务逻辑层 → 数据访问层 → 基础设施层

2. **层间通信原则**

   - 上层只能调用直接下层��接���
   - 禁止跨层调用
   - 通过依赖注入方式实现层间解耦

3. **数据�����规范**
   ```
   用户操作
     ↓
   表现层（触发事件）
     ↓
   ���务逻辑层（处��业务）
     ↓
   数据访问层（请求数据）
     ↓
   基础设施层（发送请求）
     ↓
   服务端响应
     ↓
   基础设施层（处理响应）
     ↓
   数据访问层（转换数据）
     ↓
   业务逻辑层（更新状态）
     ↓
   表现层（更新视图）
   ```

#### 1.2.4 分层开发规范

1. **表现层规范**

   - 关注视图渲染和用户交互
   - 不直接调用 API
   - 通过 Props/Events 进行组件通信
   - 复杂逻辑委托给业务逻辑层

2. **业务逻辑层规范**

   - 实现�����业务规则
   - 管理应用状态
   - 处理业务异常
   - 提供业务接口给表现层

3. **数据访问层规范**

   - 统一的数据访问接口
   - 数据格式转换
   - 实现数据缓存策略
   - 处理网络异常

4. **基础设施层规范**
   - 提供基础工具和服务
   - 不包含业务逻辑
   - 保持功能的通用性
   - 统一的错误处理

## 2. 开发范式

### 2.1 组件设计原则

- **单一职责**：每个组件只负责一个特定的功能
- **可预测性**：组件的行为应该是可预测的
- **可测试性**：组件应该易于测试
- **可维护性**：代码结构清晰，易于理解和修改
- **代码量控制**：单个组件代码建议不超过 300 行，超过时考虑拆分

### 2.2 组件分类与职责

1. **基础组件（Base）**

   - 特点：纯展示，无业务逻辑，高复用性
   - 示例：按钮、输入框、标签
   - 位置：`src/components/base/`
   - 命名：以 Base 开头，如 `BaseButton.vue`
   - 职责：
     - UI 呈现
     - 基础交互
     - 通用功能封装

   ```vue
   // BaseButton.vue 示例
   <template>
     <el-button :type="type" :size="size" :loading="loading" v-bind="$attrs" @click="handleClick">
       <slot />
     </el-button>
   </template>
   ```

2. **业务组件（Business）**

   - 特点：包含特定业务逻���，可复用于相似业务场景
   - 示例：用户信息卡片、订单列表项
   - 位置：`src/components/business/`
   - 命名：使用业务名称，如 `UserTable.vue`
   - 职责：
     - 业务数据展示
     - 业务逻辑处理
     - 与���础组件组合

   ```vue
   // UserTable.vue 示例
   <template>
     <div class="user-table">
       <el-table v-loading="loading" :data="data">
         <!-- 业务相关的列定义 -->
       </el-table>
     </div>
   </template>
   ```

3. **布局组件（Layout）**

   - 特点：负责页面结构和布局
   - 示例：头部、侧边栏、页面容器
   - 位置：`src/layout/`
   - 命名：描述布局功能，如 `MainLayout.vue`
   - 职责：
     - 页面框架结构
     - 导航管理
     - 布局适配

4. **页面组件（Views）**
   - 特点：路由页面，组合其他组件
   - 位置：`src/views/`
   - 命名：与路由名对应，如 `UserList.vue`
   - 职责：
     - 页面组合
     - 数据获取
     - 状态管理
     - 业���流程控制

### 2.3 组件通信规范

1. **Props 定义规范**

   ```javascript
   const props = defineProps({
     // 必须提供默认值
     type: {
       type: String,
       default: 'primary'
     },
     // 必须的属性
     data: {
       type: Array,
       required: true
     },
     // 带验证的属性
     status: {
       type: String,
       validator: value => ['active', 'inactive'].includes(value)
     }
   })
   ```

2. **事件规范**
   ```javascript
   // 明确的事件名和参数
   const emit = defineEmits({
     update: value => true,
     delete: id => typeof id === 'number'
   })
   ```

### 2.4 代码组织规范

1. **文件结构**

   ```
   ComponentName.vue
   ├── <template>
   │   └── 模板内容
   ├── <script setup>
   │   ├── 1. 导入声明
   │   ├── 2. Props/Emits 定义
   │   ├── 3. 响应式数据
   │   ├── 4. 组合式函数
   │   ├── 5. 计算属性
   │   ├── 6. 监听器
   │   ├── 7. 生命周期钩子
   │   └── 8. ��法定义
   └── <style scoped>
       └── 样式定义
   ```

2. **命名规范**
   - 组件文件名：PascalCase（如 UserList.vue）
   - Props/Emits：camelCase（如 onUpdate）
   - 事件处理方法：handle 前缀（如 handleSubmit）
   - 组合式函数：use 前缀（如 useUserData）

### 2.5 组合式函数（Composables）规范

1. **基本结构**

   ```javascript
   // hooks/useTableData.js
   export function useTableData(fetchFunction) {
     // 1. 响应式数据定义
     const state = reactive({})

     // 2. 计算属性
     const computedValue = computed(() => {})

     // 3. 方法定义
     const methods = {
       async loadData() {}
     }

     // 4. 生命周期钩子
     onMounted(() => {})

     // 5. 返回值
     return {
       ...toRefs(state),
       ...methods
     }
   }
   ```

2. **使用原则**
   - 职责单一
   - 命名语义化
   - 参数灵活可配置
   - 返回值解构明确

### 2.6 最佳实践

1. **性能优化**

   - 合理使用 computed 而不是 method
   - v-show vs v-if 的选择
   - 大列表使用虚拟滚动
   - 组件按需加载

2. **代码质量**

   - 及时抽取重复逻辑
   - 保持组件粒度适中
   - 遵循 SOLID 原则
   
3. **团队协作**
   - 遵循 ESLint 规范
   - 编写清晰的注释
   - 保持代码风格一致
   - 做好组件文档

## 3. 状态管理

### 3.1 Pinia Store 设计

#### 3.1.1 目录结构
```
src/store/
├── modules/          # Store 模块目录
│   ├── user.js      # 用户相关状态
│   └── ...          # 其他模块
└── index.js         # Store 入口文件
```

#### 3.1.2 模块设计原则
- 按业务领域划分模块，每个模块管理相关的状态
- 使用 Options API 风格定义 store，保持代码结构清晰
- 合理使用 getters 处理派生状态
- actions 中处理异步����辑和复杂的状态变更

#### 3.1.3 示例代码
```js
export const useExampleStore = defineStore('example', () => {
  // 状态定义（使用 ref）
  const state1 = ref(initialValue)
  const state2 = ref(initialValue)

  // 计算属性（使用 computed）
  const computedValue = computed(() => {
    return state1.value + state2.value
  })

  // Actions（使用普通函数或异步函数）
  function action1() {
    state1.value = newValue
  }

  async function action2() {
    const result = await api.getData()
    state2.value = result
  }

  return {
    // 暴露状态
    state1,
    state2,
    
    // 暴露计算属性
    computedValue,
    
    // 暴露 actions
    action1,
    action2
  }
})
```

### 3.2 Store 使用规范

#### 3.2.1 命名规范
- Store 模块文件使用小写，如：`user.js`、`app.js`
- Store 定义使用 `useXxxStore` 格式，如：`useUserStore`、`useAppStore`
- State 属性使用驼峰命名
- Getters 和 Actions 使用动词或动词短语

#### 3.2.2 使用方式
```js
// 组件中使用 store
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
// 解构响应式状态和 getter
const { token, userInfo } = storeToRefs(userStore)
// 直接调用 action
userStore.login(credentials)
```

### 3.3 Store 最佳实践

#### 3.3.1 状态设计
- 只存储全局共享的状态
- 避免存储可以通过计算得到的数据
- 敏感数据（如 token）在 logout 时要清空

#### 3.3.2 性能优化
- 合理使用 `storeToRefs` 保持响应性
- 避免在 getter 中进行复杂计算
- 对频繁变化的状态使用 `shallowRef`

#### 3.3.3 状态持久化
- 使用 `pinia-plugin-persistedstate` 进行状态持久化
- 只持久化必要的状态，避免存储敏感信息
- 提供清除持久化数据的方法

#### 3.3.4 错误处理
- Action 中的异步操作要做好错误处理
- 状态变更失败时要恢复到之前的状态
- 提供统一的错误提示机制

## 4. 网络请求

### 4.1 请求层���计

#### 4.1.1 基础配置

```javascript
// utils/request/config.js
export const REQUEST_CONFIG = {
  // 基础配置
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,

  // 重试配置
  retry: 2,
  retryDelay: 1000,

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

// utils/request/index.js
import axios from 'axios'
import { REQUEST_CONFIG } from './config'
import { useUserStore } from '@/stores/user'
import { useCache } from '@/composables/useCache'
import { useLoading } from '@/composables/useLoading'
import { useMessage } from '@/composables/useMessage'

class RequestService {
  constructor(config) {
    this.instance = axios.create(config)
    this.pending = new Map()
    this.cache = new Map()
    this.setupInterceptors()
  }

  // 合并配置
  mergeConfig(config = {}) {
    const { customConfig = {} } = config
    return {
      ...config,
      customConfig: {
        ...REQUEST_CONFIG.customConfig,
        ...customConfig,
        headers: {
          ...REQUEST_CONFIG.customConfig.headers,
          ...customConfig.headers
        }
      }
    }
  }

  // 请求方法封装
  async request(config) {
    const mergedConfig = this.mergeConfig(config)
    const { customConfig } = mergedConfig

    try {
      // 转换请求数据
      if (customConfig.transformRequest) {
        mergedConfig.data = customConfig.transformRequest(mergedConfig.data)
      }

      const response = await this.instance.request(mergedConfig)

      // 转换响应数据
      if (customConfig.transformResponse) {
        response.data = customConfig.transformResponse(response.data)
      }

      // 调用成功回调
      const result = await customConfig.onSuccess(response.data, response)

      // 调用完成回调
      customConfig.onComplete(null, result)

      return result
    } catch (error) {
      // 调用错误回调
      const result = await customConfig.onError(error)

      // 调用完成回调
      customConfig.onComplete(error)

      return Promise.reject(result)
    }
  }

  // 便捷方法
  get(url, config = {}) {
    return this.request({ ...config, method: 'get', url })
  }

  post(url, data = {}, config = {}) {
    return this.request({ ...config, method: 'post', url, data })
  }

  put(url, data = {}, config = {}) {
    return this.request({ ...config, method: 'put', url, data })
  }

  delete(url, config = {}) {
    return this.request({ ...config, method: 'delete', url })
  }
}

// 使用示例
export const request = new RequestService(REQUEST_CONFIG)
```

#### 4.1.2 自定义配置使用示例

```javascript
// API 调用示例
class UserAPI {
  constructor() {
    this.baseURL = '/user'
  }

  // 基础使用
  login(params) {
    return request.post(`${this.baseURL}/login`, params)
  }

  // 自定义配置使用
  getUserInfo(config = {}) {
    return request.get(`${this.baseURL}/info`, {
      useCache: true,
      loading: false,
      // 自定义配置
      customConfig: {
        // 自定义请求头
        headers: {
          'Custom-Header': 'value'
        },
        // 自定义成功回调
        onSuccess: data => {
          // 对响应数据进行处理
          return {
            ...data,
            fullName: `${data.firstName} ${data.lastName}`
          }
        },
        // 自定义错误处理
        onError: error => {
          // 特定错误处理逻辑
          if (error.response?.status === 404) {
            return {
              code: 404,
              message: '用户信息不存在'
            }
          }
          return Promise.reject(error)
        },
        // 自定义完成回调
        onComplete: (error, data) => {
          if (error) {
            console.error('请求失败:', error)
          } else {
            console.log('请求成功:', data)
          }
        },
        // 自定义响应数据转换
        transformResponse: data => {
          // 转换响应数据
          return {
            ...data,
            timestamp: new Date().getTime()
          }
        },
        // 自定义请求数据转换
        transformRequest: data => {
          // 转换请求数据
          return {
            ...data,
            clientTime: new Date().getTime()
          }
        }
      }
    })
  }

  // 批量操作示例
  batchUpdate(userList) {
    return request.post(`${this.baseURL}/batch-update`, userList, {
      customConfig: {
        // 自定义请求转换，处理批量数据
        transformRequest: data => {
          return data.map(user => ({
            ...user,
            updateTime: new Date().getTime()
          }))
        },
        // 自定义响应转换，处理批量结果
        transformResponse: data => {
          return {
            successList: data.filter(item => item.code === 0),
            failList: data.filter(item => item.code !== 0)
          }
        }
      }
    })
  }

  // 文件上传示例
  uploadAvatar(file) {
    const formData = new FormData()
    formData.append('file', file)

    return request.post(`${this.baseURL}/avatar`, formData, {
      customConfig: {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        // 上传进度回调
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log('上传进度:', percentCompleted)
        }
      }
    })
  }
}

// 在组件中使用
const handleGetUserInfo = async () => {
  try {
    const result = await userApi.getUserInfo({
      customConfig: {
        // 组件级别的自定义配置
        onSuccess: data => {
          // 处理成功响应
          store.commit('setUserInfo', data)
          return data
        },
        onError: error => {
          // 处理错误
          showError(error.message)
          return Promise.reject(error)
        }
      }
    })
    console.log('用户信息:', result)
  } catch (error) {
    console.error('��������用户信息失败:', error)
  }
}
```

这样的设计提供了：

1. **灵活的配置项**

   - 自定义请求头
   - 自定义回调函数
   - 数据转换能力

2. **多层次配置**

   - 全局默认配置
   - 接口级别配置
   - 请求级别配置

3. **完整的生命周期**

   - 请求前数据转换
   - 响应后数据转换
   - 成功/失败/完成回���

4. **特殊场景支��**
   - 文件上传进度
   - 批量操作处理
   - 自定义错误处理

### 4.2 API 管理

#### 4.2.1 API 模块化

```javascript
// api/user/index.js
import { request } from '@/utils/request'

class UserAPI {
  constructor() {
    this.baseURL = '/user'
  }

  login(params) {
    return request.post(`${this.baseURL}/login`, params)
  }

  getUserInfo() {
    return request.get(`${this.baseURL}/info`, {
      useCache: true,
      loading: false
    })
  }

  updateUserInfo(data) {
    return request.put(`${this.baseURL}/info`, data)
  }
}

export const userApi = new UserAPI()
```

### 4.3 ��用示例

#### 4.3.1 基础使用

```vue
<script setup>
// 由于配置了自动导入，不需要手���导入 ref, onMounted 等 Vue API
// 也不需要手动导入 useRequest 等组合式函数
const { getUserInfo, updateUserInfo } = useUserApi()
const { loading, data: userInfo, execute } = useRequest(getUserInfo)

// 获取用户信息
const fetchUserInfo = async () => {
  await execute()
}

// 更新用户信息
const updateInfo = async (data) => {
  await updateUserInfo(data)
  // 重新获取用户信息
  await fetchUserInfo()
}

// 生命周期钩子
onMounted(() => {
  fetchUserInfo()
})
</script>
```

#### 4.3.2 错误处理

```vue
<script setup>
const { login } = useUserApi()
const { showError } = useMessage()

// 使用 useRequest 处理请求状态和错误
const { 
  loading, 
  error, 
  execute: executeLogin 
} = useRequest(login, {
  onError: (err) => {
    if (err.response) {
      showError('请求错误：' + err.response.data.message)
    } else if (err.request) {
      showError('网络错误，请检查网络连接')
    } else {
      showError('发生未知错误')
    }
  }
})

// 登录处理
const handleLogin = async (loginForm) => {
  await executeLogin(loginForm)
}
</script>
```

#### 4.3.3 请求取消

```vue
<script setup>
const { fetchData } = useDataApi()

// ��建取消控制器
const controller = new AbortController()

// 使用 useRequest 处理请求，传入 signal
const { data, loading, execute } = useRequest(
  () => fetchData({ signal: controller.signal })
)

// 组件卸载时取消请求
onUnmounted(() => {
  controller.abort()
})
</script>
```

### 4.4 最佳实践

1. **请求封装原则**

```javascript
// composables/useRequest.js
export function useRequest(requestFn, options = {}) {
  const {
    immediate = true,
    initialData = null,
    onSuccess,
    onError,
    onFinally
  } = options

  const data = shallowRef(initialData)
  const error = shallowRef(null)
  const loading = ref(false)

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
    error,
    loading,
    execute
  }
}
```

2. **性能优化**

```javascript
// composables/useRequestCache.js
export function useRequestCache(key, requestFn, ttl = 5 * 60 * 1000) {
  const cache = useCache()

  const request = async () => {
    // 检查缓存
    const cached = cache.get(key)
    if (cached) return cached

    // 发起请求
    const data = await requestFn()
    
    // 设置缓存
    cache.set(key, data, ttl)
    return data
  }

  return useRequest(request)
}
```

3. **安全性**

```javascript
// composables/useSecureRequest.js
export function useSecureRequest(requestFn) {
  const { encrypt, decrypt } = useEncryption()

  const secureRequest = async (data) => {
    // 加密请求数据
    const encryptedData = await encrypt(data)
    
    // 发送请求
    const response = await requestFn(encryptedData)
    
    // 解密响应数据
    return decrypt(response)
  }

  return useRequest(secureRequest)
}
```

4. **可维护性**

```javascript
// api/modules/user.js
export function useUserApi() {
  // API 请求函数
  const login = (credentials) => 
    request.post('/api/login', credentials)
  
  const getUserInfo = () => 
    request.get('/api/user/info')
  
  const updateUserInfo = (data) => 
    request.put('/api/user/info', data)

  // 导出组合式函数
  return {
    // 基础请求
    login,
    getUserInfo,
    updateUserInfo,
    
    // 带状态的请求
    useLogin: (options = {}) => useRequest(login, options),
    useUserInfo: (options = {}) => useRequest(getUserInfo, options),
    useUpdateUserInfo: (options = {}) => useRequest(updateUserInfo, options)
  }
}
```

5. **请求实例配置**

```javascript
// utils/request/index.js
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    
    // 设置 token
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { code, data, message } = response.data
    
    // 请求成功
    if (code === 0) {
      return data
    }
    
    // 业务错误
    const error = new Error(message || 'Error')
    error.code = code
    return Promise.reject(error)
  },
  error => {
    const { response } = error
    
    // 处理 HTTP 错误
    if (response?.status === 401) {
      const userStore = useUserStore()
      userStore.logout()
      router.push('/login')
    }
    
    return Promise.reject(error)
  }
)

// 请求方法封装
export const request = {
  get: (url, config) =>
    service.get(url, config),
  
  post: (url, data, config) =>
    service.post(url, data, config),
  
  put: (url, data, config) =>
    service.put(url, data, config),
  
  delete: (url, config) =>
    service.delete(url, config),
  
  upload: (url, file, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    
    return service.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        if (onProgress) {
          const percent = Math.round((e.loaded * 100) / e.total)
          onProgress(percent)
        }
      }
    })
  }
}
```

### 4.5 高级功能

1. **请求重试**

```javascript
// utils/request/retry.js
export function createRetryInterceptor(maxRetries = 3, retryDelay = 1000) {
  return async (error) => {
    const { config } = error
    if (!config || !config.retryTimes) {
      config.retryTimes = 0
    }

    if (config.retryTimes >= maxRetries) {
      return Promise.reject(error)
    }

    config.retryTimes++

    // 延迟重试
    await new Promise(resolve => setTimeout(resolve, retryDelay))
    return service(config)
  }
}

// 使用重试拦截器
service.interceptors.response.use(
  response => response,
  createRetryInterceptor()
)
```

2. **请求缓存**

```javascript
// utils/request/cache.js
export function createCacheInterceptor(ttl = 60000) {
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
      const response = await service(config)
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

// 使用缓存拦截器
service.interceptors.request.use(createCacheInterceptor())
```

3. **请求取消**

```javascript
// utils/request/cancel.js
export function createCancelTokenInterceptor() {
  const pendingMap = new Map()

  function generateReqKey(config) {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  }

  function addPending(config) {
    const requestKey = generateReqKey(config)
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
      if (!pendingMap.has(requestKey)) {
        pendingMap.set(requestKey, cancel)
      }
    })
  }

  function removePending(config) {
    const requestKey = generateReqKey(config)
    if (pendingMap.has(requestKey)) {
      const cancel = pendingMap.get(requestKey)
      cancel(requestKey)
      pendingMap.delete(requestKey)
    }
  }

  return {
    requestInterceptor: config => {
      removePending(config)
      addPending(config)
      return config
    },
    responseInterceptor: response => {
      removePending(response.config)
      return response
    },
    errorInterceptor: error => {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message)
      } else {
        removePending(error.config || {})
      }
      return Promise.reject(error)
    }
  }
}

// 使用取消令牌拦截器
const cancelInterceptor = createCancelTokenInterceptor()
service.interceptors.request.use(cancelInterceptor.requestInterceptor)
service.interceptors.response.use(
  cancelInterceptor.responseInterceptor,
  cancelInterceptor.errorInterceptor
)
```

4. **请求队列**

```javascript
// utils/request/queue.js
export function createRequestQueue(maxConcurrent = 5) {
  const queue = []
  let running = 0

  function runNext() {
    if (queue.length === 0 || running >= maxConcurrent) return

    running++
    const { config, resolve, reject } = queue.shift()

    service(config)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        running--
        runNext()
      })
  }

  return {
    add(config) {
      return new Promise((resolve, reject) => {
        queue.push({ config, resolve, reject })
        runNext()
      })
    }
  }
}

// 使用请求队列
const requestQueue = createRequestQueue()

// 修改 request 方法
export const request = {
  get: (url, config) => requestQueue.add({ ...config, url, method: 'get' }),
  post: (url, data, config) => requestQueue.add({ ...config, url, data, method: 'post' }),
  // ... 其他方法
}
```

### 4.6 最佳实践建议

1. **错误处理**
   - 统一的错误处理机制
   - 业务错误码管理
   - 友好的错误提示

2. **性能优化**
   - 请求缓存策略
   - 并发请求控制
   - 请求取消管理

3. **安全性**
   - Token 管理
   - 敏感数据加密
   - XSS/CSRF 防护

4. **可维护性**
   - 模块化组织
   - 统一的接口规范
   - 完善的注释文档

5. **监控和日志**
   - 请求耗时统计
   - 错误日志记录
   - 性能监控指标

## 5. 路由设计

### 5.1 基础路由结构

```javascript
// router/routes/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './basic'
import { setupRouterGuard } from './guard'

// 基础路由，不需要权限验证
export const basicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404',
      hidden: true
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 设置路由守卫
setupRouterGuard(router)

export default router
```

### 5.2 动态路由配置

```javascript
// router/routes/async.js
// 需要根据权限动态加载的路由
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard',
          affix: true,
          roles: ['admin', 'user'] // 可访问角色
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'setting',
      roles: ['admin'] // 仅管理员可访问
    },
    children: [
      {
        path: 'user',
        name: 'UserManage',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'user',
          roles: ['admin'],
          permissions: ['system:user:list'] // 需要的权限点
        }
      }
    ]
  }
]

// 处理动态路由
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// 权限判断
function hasPermission(roles, route) {
  if (route.meta?.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  }
  return true
}
```

### 5.3 路由守卫实现

```javascript
// router/guard/index.js
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import NProgress from 'nprogress'

export function setupRouterGuard(router) {
  // 进度条配置
  NProgress.configure({ showSpinner: false })

  router.beforeEach(async (to, from, next) => {
    // 开启进度条
    NProgress.start()

    // 设置页面标题
    const title = to.meta?.title
    if (title) {
      document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
    }

    const userStore = useUserStore()
    const permissionStore = usePermissionStore()

    // 白名单处理
    const whiteList = ['/login', '/404', '/403']
    if (whiteList.includes(to.path)) {
      next()
      NProgress.done()
      return
    }

    // 登录状态检查
    if (!userStore.token) {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
      return
    }

    // 获取用户信息和权限
    if (!userStore.userInfo) {
      try {
        await userStore.getUserInfo()
      } catch (error) {
        // 获取用户信息失败，可能是 token 过期
        await userStore.logout()
        next(`/login?redirect=${to.path}`)
        return
      }
    }

    // 权限路由处理
    if (!permissionStore.isRoutesLoaded) {
      try {
        // 生成可访问路由
        const accessRoutes = await permissionStore.generateRoutes(userStore.roles)
        
        // 动态添加路由
        accessRoutes.forEach(route => {
          router.addRoute(route)
        })

        // 设置路由加载标志
        permissionStore.setRoutesLoaded(true)

        // 重定向到目标路由
        next({ ...to, replace: true })
      } catch (error) {
        next('/403')
      }
    } else {
      next()
    }
  })

  router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
  })

  // 路由错误处理
  router.onError((error) => {
    console.error('路由错误:', error)
    NProgress.done()
  })
}

// router/guard/permission.js
export function createPermissionGuard(router) {
  return async function permissionGuard(to, from, next) {
    const userStore = useUserStore()
    const { userInfo } = userStore
    
    // 检查页面权限
    if (to.meta?.permissions) {
      const hasPermission = to.meta.permissions.some(
        permission => userInfo?.permissions?.includes(permission)
      )
      
      if (!hasPermission) {
        next('/403')
        return
      }
    }
    
    // 检查角色权限
    if (to.meta?.roles) {
      const hasRole = to.meta.roles.some(
        role => userInfo?.roles?.includes(role)
      )
      
      if (!hasRole) {
        next('/403')
        return
      }
    }
    
    next()
  }
}

// router/guard/keepAlive.js
export function createKeepAliveGuard(router) {
  return function keepAliveGuard(to, from) {
    const componentName = to.matched.find(item => item.name === to.name)?.name
    
    if (componentName && to.meta?.keepAlive) {
      // 添加到缓存列表
      const keepAliveStore = useKeepAliveStore()
      keepAliveStore.add(componentName)
    }
  }
}

// router/guard/title.js
export function createTitleGuard(router) {
  return function titleGuard(to) {
    const title = to.meta?.title
    if (title) {
      document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
    }
  }
}

// router/guard/auth.js
export function createAuthGuard(router) {
  return async function authGuard(to, from, next) {
    const userStore = useUserStore()
    
    // Token 过期检查
    if (userStore.token && userStore.isTokenExpired()) {
      try {
        // 尝试刷新 Token
        await userStore.refreshToken()
        next()
      } catch (error) {
        // 刷新失败，跳转登录页
        await userStore.logout()
        next(`/login?redirect=${to.path}`)
      }
      return
    }
    
    next()
  }
}

// 使用示例
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
import { 
  createPermissionGuard,
  createKeepAliveGuard,
  createTitleGuard,
  createAuthGuard
} from './guard'

const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes
})

// 注册路由��卫
setupRouterGuard(router)

// 注册其��守卫
router.beforeEach(createAuthGuard(router))
router.beforeEach(createPermissionGuard(router))
router.afterEach(createKeepAliveGuard(router))
router.afterEach(createTitleGuard(router))

export default router
```

### 5.4 路由元信息设计

```javascript
// router/types/meta.js
export const RouteMeta = {
  // 页面标题
  title: {
    type: String,
    default: ''
  },
  
  // 页面权限
  permissions: {
    type: Array,
    default: () => []
  },
  
  // 角色权限
  roles: {
    type: Array,
    default: () => []
  },
  
  // 是否缓存页面
  keepAlive: {
    type: Boolean,
    default: false
  },
  
  // 是否在菜单中隐藏
  hidden: {
    type: Boolean,
    default: false
  },
  
  // 菜单图标
  icon: {
    type: String,
    default: ''
  },
  
  // 菜单排序
  sort: {
    type: Number,
    default: 0
  },
  
  // 页面加载动画
  loading: {
    type: Boolean,
    default: true
  },
  
  // 过渡动画名称
  transition: {
    type: String,
    default: 'fade-slide'
  },
  
  // 是否固定在标签栏
  affix: {
    type: Boolean,
    default: false
  },
  
  // 父级路由名称
  parentName: {
    type: String,
    default: ''
  }
}
```

### 5.5 路由工具函数

```javascript
// router/utils/index.js

// 扁平化路由
export function flattenRoutes(routes) {
  const result = []
  routes.forEach(route => {
    if (route.children) {
      result.push(...flattenRoutes(route.children))
    }
    result.push(route)
  })
  return result
}

// 构建面包屑
export function buildBreadcrumb(route) {
  const breadcrumbs = []
  route.matched.forEach(item => {
    if (item.meta?.title && !item.meta?.hidden) {
      breadcrumbs.push({
        title: item.meta.title,
        path: item.path
      })
    }
  })
  return breadcrumbs
}

// 获取第一个可访问的路由
export function getFirstAccessibleRoute(routes) {
  for (const route of routes) {
    if (!route.meta?.hidden) {
      if (route.children) {
        const childRoute = getFirstAccessibleRoute(route.children)
        if (childRoute) return childRoute
      }
      return route
    }
  }
  return null
}

// 根据路由名称查找路由
export function findRouteByName(name, routes) {
  for (const route of routes) {
    if (route.name === name) return route
    if (route.children) {
      const childRoute = findRouteByName(name, route.children)
      if (childRoute) return childRoute
    }
  }
  return null
}

// 获取路由的完整路径
export function getRoutePath(route) {
  let path = route.path
  let parent = route.parent
  while (parent) {
    path = `${parent.path}/${path}`.replace(/\/+/g, '/')
    parent = parent.parent
  }
  return path
}

// 路由排序
export function sortRoutes(routes) {
  return routes.sort((a, b) => {
    const orderA = a.meta?.sort || 0
    const orderB = b.meta?.sort || 0
    return orderA - orderB
  })
}
```

### 5.6 使用示例

```javascript
// views/layout/components/Breadcrumb.vue
<script setup>
const route = useRoute()
const breadcrumbs = computed(() => buildBreadcrumb(route))
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="item.path">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

// views/layout/components/Menu.vue
<script setup>
const router = useRouter()
const permissionStore = usePermissionStore()

// 获取排序后的路由菜单
const menuRoutes = computed(() => {
  const routes = permissionStore.routes.filter(route => !route.meta?.hidden)
  return sortRoutes(routes)
})

// 处理菜单点击
const handleMenuClick = (route) => {
  if (route.meta?.link) {
    window.open(route.meta.link)
  } else {
    router.push(route.path)
  }
}
</script>

<template>
  <el-menu router>
    <template v-for="route in menuRoutes" :key="route.path">
      <menu-item :route="route" @click="handleMenuClick" />
    </template>
  </el-menu>
</template>

// composables/useRouteGuard.js
export function useRouteGuard() {
  const router = useRouter()
  const userStore = useUserStore()

  // 注册路由守卫
  onMounted(() => {
    router.beforeEach(async (to, from, next) => {
      // 检查权限
      if (to.meta?.permissions) {
        const hasPermission = to.meta.permissions.some(
          permission => userStore.permissions.includes(permission)
        )
        if (!hasPermission) {
          next('/403')
          return
        }
      }
      next()
    })
  })
}

// composables/useRouteCache.js
export function useRouteCache() {
  const keepAliveComponents = ref([])

  // 添加缓存组件
  const addCache = (name) => {
    if (name && !keepAliveComponents.value.includes(name)) {
      keepAliveComponents.value.push(name)
    }
  }

  // 移除缓存组件
  const removeCache = (name) => {
    const index = keepAliveComponents.value.indexOf(name)
    if (index > -1) {
      keepAliveComponents.value.splice(index, 1)
    }
  }

  // 清空缓存
  const clearCache = () => {
    keepAliveComponents.value = []
  }

  return {
    keepAliveComponents,
    addCache,
    removeCache,
    clearCache
  }
}
```

### 5.7 最佳实践

1. **路由组织**
   - 按模块拆分路由配置
   - 使用路由元信息控制行为
   - 实现路由懒加载

2. **权限控制**
   - 基于角色的路由控制
   - 细粒度的权限点控制
   - 动态路由加载

3. **性能优化**
   - 路由组件按需加载
   - 合理使用路由缓存
   - 优化路由切换动画

4. **用户体验**
   - 路由切换进度条
   - 页面切换动画
   - 路由错误处理

5. **开发规范**
   - 统一的路由命名规则
   - 清晰的路由层级结构
   - 完善的路由文档注释

## 6. 工具函数

### 6.1 工具分类

1. **数据处理工具**
```javascript
// utils/data.js
export const dataUtils = {
  // 深拷贝
  deepClone(obj) {
    if (!obj || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    
    const clone = Array.isArray(obj) ? [] : {}
    Object.keys(obj).forEach(key => {
      clone[key] = dataUtils.deepClone(obj[key])
    })
    return clone
  },

  // 对象合并
  merge(target, ...sources) {
    sources.forEach(source => {
      Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === 'object') {
          target[key] = target[key] || {}
          this.merge(target[key], source[key])
        } else {
          target[key] = source[key]
        }
      })
    })
    return target
  },

  // 数组去重
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
```

2. **日期处理工具**
```javascript
// utils/date.js
export const dateUtils = {
  // 格式化日期
  format(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) return ''
    date = new Date(date)
    const o = {
      'Y+': date.getFullYear(),
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    
    Object.keys(o).forEach(k => {
      const str = o[k].toString()
      fmt = fmt.replace(new RegExp(`(${k})`), 
        match => match.length === 1 ? str : str.padStart(match.length, '0'))
    })
    
    return fmt
  },

  // 相对时间
  fromNow(time) {
    const now = Date.now()
    const diff = now - new Date(time).getTime()
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}天前`
    if (hours > 0) return `${hours}小时前`
    if (minutes > 0) return `${minutes}分钟前`
    return '刚刚'
  },

  // 日期比较
  compare(date1, date2) {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    return d1.getTime() - d2.getTime()
  }
}
```

3. **字符串工具**
```javascript
// utils/string.js
export const stringUtils = {
  // 驼峰转换
  camelCase(str) {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
  },

  // 短横线转换
  kebabCase(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase()
  },

  // 首字母大写
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  // 生成随机字符串
  random(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
}
```

4. **数字工具**
```javascript
// utils/number.js
export const numberUtils = {
  // 格式化数字
  format(num, precision = 2) {
    const map = [
      { value: 1e9, symbol: 'B' },
      { value: 1e6, symbol: 'M' },
      { value: 1e3, symbol: 'K' }
    ]
    
    for (const { value, symbol } of map) {
      if (num >= value) {
        return (num / value).toFixed(precision) + symbol
      }
    }
    return num.toString()
  },

  // 千分位格式化
  thousands(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  // 数字精度处理
  round(num, precision = 2) {
    return Number(Math.round(num + 'e' + precision) + 'e-' + precision)
  }
}
```

5. **验证工具**
```javascript
// utils/validate.js
export const validateUtils = {
  // 手机号验证
  isPhone(value) {
    return /^1[3-9]\d{9}$/.test(value)
  },

  // 邮箱验证
  isEmail(value) {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)
  },

  // URL验证
  isUrl(value) {
    return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)
  },

  // 身份证验证
  isIdCard(value) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
  }
}
```

### 6.2 工具函数规范

1. **命名规��**
   - 使用动词开头，如 `formatDate`、`validateEmail`
   - 使用驼峰命名法
   - 名称要清晰表达功能

2. **注释规范**
```javascript
/**
 * 函数功能描述
 * @param {参数类型} paramName - 参数说明
 * @returns {返回值类型} 返回值说明
 * @example
 * // 使用示例
 * const result = functionName(params)
 */
```

3. **错误处理**
```javascript
export function safelyExecute(fn, fallback = null) {
  try {
    return fn()
  } catch (error) {
    console.error('执行错误:', error)
    return fallback
  }
}
```

4. **参数校验**
```javascript
export function validateParams(params, rules) {
  const errors = []
  Object.keys(rules).forEach(key => {
    const value = params[key]
    const rule = rules[key]
    
    if (rule.required && !value) {
      errors.push(`${key} 是必填项`)
    }
    
    if (rule.type && typeof value !== rule.type) {
      errors.push(`${key} 必须是 ${rule.type} 类型`)
    }
    
    if (rule.validate && !rule.validate(value)) {
      errors.push(`${key} 验证失败`)
    }
  })
  return errors
}
```

5. **性能优化**
```javascript
// 函数缓存装饰器
export function memoize(fn) {
  const cache = new Map()
  return function (...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

// 函数节流
export function throttle(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

// 函数防抖
export function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```

### 6.3 最佳实践

1. **模块化组织**
   - 按功能分类组织工具函数
   - 相关功能放在同一模块
   - 导出统一的接口

2. **单一职责**
   - 每个函数只做一件事
   - 功能单一，便于测试和维护
   - 避免副作用

3. **参数设计**
   - 参数数量不超过3个
   - 使用对象参数传递多个参数
   - 提供默认值

4. **返回值设计**
   - 返回值类型一致
   - 错误处理统一
   - 避免返回undefined

5. **测试友好**
   - 纯函数设计
   - 完善的错误处理

## 7. 性能优化

### 7.1 代码层面优化

#### 7.1.1 Vue 组件优化

```javascript
// 1. 合理使用 v-show 和 v-if
<template>
  <!-- 频繁切换使用 v-show -->
  <div v-show="visible">频繁切换的内容</div>

  <!-- 条件渲染使用 v-if -->
  <div v-if="shouldRender">条件渲染的内容</div>
</template>

// 2. 使用计算属性代替方法
export default {
  // 推荐
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  },
  // 不推荐
  methods: {
    getFullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
}

// 3. 使用 v-once 处理静态内容
<template>
  <div v-once>{{ staticContent }}</div>
</template>

// 4. 使用 keep-alive 缓存组件
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cachedViews">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
```

#### 7.1.2 列表优化

```javascript
// 1. 大列表虚拟滚动
<template>
  <el-virtual-scroll-bar
    :items="largeList"
    :item-size="50"
    v-slot="{ item, index }"
  >
    <div class="list-item">{{ item.name }}</div>
  </el-virtual-scroll-bar>
</template>

// 2. 列表分页加载
const usePageList = () => {
  const list = ref([])
  const loading = ref(false)
  const finished = ref(false)

  const loadMore = async () => {
    if (loading.value || finished.value) return
    loading.value = true
    try {
      const { data, isLast } = await fetchListData()
      list.value.push(...data)
      finished.value = isLast
    } finally {
      loading.value = false
    }
  }

  return {
    list,
    loading,
    finished,
    loadMore
  }
}
```

#### 7.1.3 事件优化

```javascript
// 1. 防抖和节流
import { ref } from 'vue'
import { useThrottleFn, useDebounceFn } from '@vueuse/core'

// 搜索防抖
const searchText = ref('')
const search = useDebounceFn(text => {
  // 执行搜索
}, 300)

// 滚动节流
const handleScroll = useThrottleFn(() => {
  // 处理滚动
}, 100)

// 2. 及时销毁事件监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
```

### 7.2 资源加载优化

#### 7.2.1 路由懒加载

```javascript
// router/index.js
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/index.vue')
    // 使用注释指定 chunk 名称
    // webpackChunkName: "dashboard"
  }
]
```

#### 7.2.2 组件按需加载

```javascript
// 1. Element Plus 按需引入
import { createApp } from 'vue'
import { ElButton, ElTable, ElForm } from 'element-plus'

const app = createApp(App)
const components = [ElButton, ElTable, ElForm]

components.forEach(component => {
  app.use(component)
})

// 2. 自动导入
// vite.config.js
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
}
```

#### 7.2.3 图片资源优化

```javascript
// 1. 图片懒加载
<template>
  <img
    v-lazy="imageUrl"
    loading="lazy"
    alt="图片描述"
  >
</template>

// 2. 使用适当的图片格式
const getImageUrl = (url, options = {}) => {
  const { width, height, quality } = options
  return `${url}?imageView2/1/w/${width}/h/${height}/q/${quality}`
}

// 3. 图片预加载
const preloadImages = (urls) => {
  urls.forEach(url => {
    const img = new Image()
    img.src = url
  })
}
```

### 7.3 构建优化

#### 7.3.1 Vite 构建配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(),
    // Gzip 压缩
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  // 构建优化
  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus'],
          utils: ['lodash-es', 'axios'],
          echarts: ['echarts']
        },
        // 用于从入口点创建的块的打包输出格式
        entryFileNames: 'js/[name]-[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'js/[name]-[hash].js',
        // 用于输出静态资源的命名
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    },

    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        // 删除注释
        comments: false
      }
    }
  }
})
```

#### 7.3.2 图片资源优化

```javascript
// vite.config.js
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    // 图片压缩
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false
          },
          {
            name: 'removeEmptyAttrs',
            active: true
          }
        ]
      }
    })
  ]
})
```

#### 7.3.3 预构建优化

```javascript
// vite.config.js
export default defineConfig({
  optimizeDeps: {
    // 预构建分析入口点
    entries: ['./src/main.js'],
    // 强制预构建的依赖项
    include: ['vue', 'vue-router', 'pinia', 'axios', 'element-plus/es'],
    // 排除预构建的依赖项
    exclude: ['your-local-package']
  }
})
```

#### 7.3.4 静态资源处理

```javascript
// vite.config.js
export default defineConfig({
  build: {
    // 静态资源处理
    assetsInlineLimit: 4096, // 4kb以下的资源内联为base64
    assetsDir: 'assets',
    // 自定义静态资源输出目录
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'media'
          } else if (/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'img'
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts'
          }
          return `${extType}/[name]-[hash][extname]`
        }
      }
    }
  }
})
```

### 7.4 运行时优化

#### 7.4.1 数据缓存策略

```javascript
// utils/cache.js
class CacheService {
  constructor() {
    this.storage = window.localStorage
    this.prefix = 'app_cache_'
  }

  set(key, value, ttl = 60 * 60 * 1000) {
    const data = {
      value,
      expire: Date.now() + ttl
    }
    this.storage.setItem(this.prefix + key, JSON.stringify(data))
  }

  get(key) {
    const data = JSON.parse(this.storage.getItem(this.prefix + key))
    if (data && data.expire > Date.now()) {
      return data.value
    }
    this.remove(key)
    return null
  }

  remove(key) {
    this.storage.removeItem(this.prefix + key)
  }
}

export const cache = new CacheService()
```

#### 7.4.2 状态管理优化

```javascript
// stores/index.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 避免存储大量数据
    // 只存储必要的状态
    userInfo: null,
    settings: null
  }),

  // 使用 getters 缓存计算结果
  getters: {
    userPermissions: state => state.userInfo?.permissions || []
  }
})
```

### 7.5 性能监控

#### 7.5.1 性能指标收集

```javascript
// utils/performance.js
export function collectPerformance() {
  const performance = window.performance

  // 页面加载时间
  const timing = performance.timing
  const pageLoadTime = timing.loadEventEnd - timing.navigationStart

  // 资源加载时间
  const resources = performance.getEntriesByType('resource')
  const resourceTiming = resources.map(resource => ({
    name: resource.name,
    duration: resource.duration
  }))

  // 首次渲染时间
  const paint = performance.getEntriesByType('paint')
  const firstPaint = paint[0]?.startTime

  return {
    pageLoadTime,
    resourceTiming,
    firstPaint
  }
}
```

### 7.6 最佳实践

1. **代码优化**

   - 避免不必要的组件渲染
   - 合理使用计算属性和侦听器
   - 及时清理副作用和事件监听
   - 使用异步组件和懒加载

2. **资源优化**

   - 图片懒加载和预加载
   - 合理使用缓存策略
   - 按需加载第三方库
   - 代码分割和压缩

3. **构建优化**

   - 合理配置打包策略
   - 优化构建速度
   - 减小构建体积
   - 使用现代构建工具

4. **运行时优��**
   - 合理使用缓存
   - 优化大数据渲染
   - 减少不必要的计算
   - 优化动画性能

## 8. 开发流程

### 8.1 分支管理

- master：主分支，用于生产环境
- develop：开发分支，用于开发环境
- feature/\*：功能分支
- hotfix/\*：紧急修复分支

### 8.2 代码提交

- 遵循 Git 提交规范
- 提交前进行代码检查
- 进行代码审查

### 8.3 发布流程

1. 代码合并到 develop
2. 测试验证
3. 合并到 master
4. 打包发布
5. 监控观察

## 9. 工程化配置

### 9.1 Vite 插件管理规范

为了更好地管理 Vite 插件，我们采用模块化的方式组织插件配置��这种方式可以让插件配置清晰、易维护，并且支持根据环境动态加载插件。

#### 9.1.1 插件目录结构

```bash
vite/
  ├── plugins/
  │   ├── index.js          # 插件统一导出
  │   ├── vue.js            # Vue 插件配置
  │   ├── auto-import.js    # API 自动导入配置
  │   ├── components.js     # 组件自动导入配置
  │   ├── compression.js    # Gzip 压缩配置
  │   ├── imagemin.js       # 图片压缩配置
  │   └── visualizer.js     # 构建分析配置
  └── utils/                # 工具函数
```

#### 9.1.2 插件配置规范

1. **单一职责**：每个插件配置文件只负责一个插件的配置
```javascript
// vite/plugins/vue.js
import vue from '@vitejs/plugin-vue'

export function createVuePlugin() {
  return vue()
}
```

2. **命名规范**：
   - 文件名：使用插件的主要功能命名，如 `vue.js`, `auto-import.js`
   - 导出函数：使用 `create` 前缀，如 `createVuePlugin`, `createAutoImport`
   - 配置变量：使用描述性名称，如 `vitePlugins`, `pluginOptions`

3. **配置结构**：
```javascript
// vite/plugins/[plugin-name].js
import plugin from 'plugin-package'

export function create[PluginName](options = {}) {
  return plugin({
    // 插件配置项
    ...options
  })
}
```

4. **插件管理**：在 index.js 中集中管理所有插件
```javascript
// vite/plugins/index.js
import vue from '@vitejs/plugin-vue'
import { createAutoImport } from './auto-import'
import { createCompression } from './compression'
import { createImagemin } from './imagemin'
import { createVisualizer } from './visualizer'

export function createVitePlugins(viteEnv, isBuild) {
  const vitePlugins = [
    // 基础插件
    vue()
  ]

  // 自动导入
  vitePlugins.push(...createAutoImport())

  // 生产环境插件
  if (isBuild) {
    // Gzip 压缩
    vitePlugins.push(createCompression())
    // 图片压缩
    vitePlugins.push(createImagemin())
    // 构建分析
    vitePlugins.push(createVisualizer())
  }

  return vitePlugins
}
```

#### 9.1.3 插件分类

1. **基础插件**（开发和生产环境都需要）：
   - Vue 插件：提供 Vue 3 支持
   - 自动导入：API 和组件的自动导入
   - 组件解析：Element Plus 组件的按需加载

2. **开发插件**（仅开发环境）：
   - 开发服务器配置
   - HMR 相关插件
   - 调试工具

3. **生产插件**（仅生产环境）：
   - Gzip 压缩：减小构建体积
   - 图片压缩：优化图片资源
   - 构建分析：分析构建产物

#### 9.1.4 最佳实践

1. **环境区分**：
   - 使用 `isBuild` 标志区分开发和生产环境
   - 根据环境变量 `viteEnv` 进行细粒度控制
   - 避免在开发环境加载生产环境插件

2. **配置复用**：
   - 将通用配置提取为常量
   - 支持通过参数覆盖默认配置
   - 避免重复的配置代码

3. **性能优化**：
   - 开发环境只加载必要的插件
   - 按需加载生产环境插件
   - 避免不必要的插件配置

4. **可维护性**：
   - 清晰的文件组织结构
   - 统一的命名和配置风格
   - 必要的注释说明

5. **扩展性**：
   - 易于添加新插件
   - 支持自定义配置
   - 插件间依赖清晰

这种插件管理方式的优势：
- 更好的代码组织和维护性
- 配置逻辑清晰，易于理解
- 支持环境区分和按需加载
- 便于团队协作和代码审查
- 易于扩展和定制化

### 9.2 环境配置

#### 9.2.1 环境变量文件

```bash
.env                    # 所有环境都会加载
.env.development       # 开发环境加载
.env.production        # 生产环境加载
.env.staging          # 预发布环境加载

# .env 示例
VITE_APP_TITLE=Vue Admin Template
VITE_APP_API_BASE_URL=/api
VITE_APP_PUBLIC_PATH=/
VITE_APP_MOCK=false

# .env.development 示例
VITE_APP_ENV=development
VITE_APP_API_BASE_URL=http://localhost:3000/api
VITE_APP_MOCK=true
VITE_APP_PROXY=[["/api","http://localhost:3000"]]

# .env.production 示例
VITE_APP_ENV=production
VITE_APP_API_BASE_URL=https://api.example.com
VITE_APP_MOCK=false
VITE_APP_COMPRESS=true
```

#### 9.2.2 环境配置使用

```javascript
// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'

export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  // 处理环境变量
  const viteEnv = wrapperEnv(env)
  
  const { VITE_APP_PUBLIC_PATH, VITE_APP_PROXY, VITE_APP_MOCK } = viteEnv

  return {
    base: VITE_APP_PUBLIC_PATH,
    server: {
      host: true,
      port: 3000,
      proxy: createProxy(VITE_APP_PROXY)
    },
    build: {
      target: 'es2015',
      outDir: `dist-${mode}`,
      // 生产环境移除 console
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: mode === 'production'
        }
      },
      // 关闭生成 map 文件
      sourcemap: mode !== 'production'
    },
    plugins: createVitePlugins(viteEnv, command === 'build')
  }
})

// build/utils.js
export function wrapperEnv(envConf) {
  const ret = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_APP_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'))
      } catch (error) {
        realName = ''
      }
    }
    ret[envName] = realName
  }
  return ret
}

// build/proxy.js
export function createProxy(proxyList = []) {
  const ret = {}
  for (const [prefix, target] of proxyList) {
    ret[prefix] = {
      target,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp('^' + prefix), ''),
      // https 配置
      ...(target.startsWith('https') ? { secure: false } : {})
    }
  }
  return ret
}
```

### 9.3 代码规范配置

#### 9.3.1 ESLint 配置

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    // Vue 规则
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/script-setup-uses-vars': 'error',
    'vue/no-mutating-props': 'error',
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'below'
    }],

    // JS 规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'no-var': 'error',
    'prefer-const': ['error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: false
    }],
    'object-shorthand': ['error', 'always'],
    'prefer-template': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'no-param-reassign': ['error', { props: false }],

    // 代码风格
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last']
  }
}
```

#### 9.3.2 StyleLint 配置

```javascript
// .stylelintrc.js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    // 基础规则
    'string-quotes': 'single',
    'no-duplicate-selectors': true,
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'selector-max-id': 0,
    'selector-class-pattern': null,
    'rule-empty-line-before': ['always', {
      except: ['first-nested'],
      ignore: ['after-comment']
    }],

    // Vue 相关
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['deep', 'global']
    }],
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
    }],

    // SCSS 相关
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-pattern': '^[a-z][a-zA-Z0-9]+$',
    'scss/selector-no-redundant-nesting-selector': true,

    // 属性排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'flex-direction',
      'justify-content',
      'align-items',
      'width',
      'height',
      'margin',
      'padding',
      'background',
      'border',
      'color',
      'font',
      'text-align'
    ]
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts']
}
```

### 9.4 Git 配置

#### 9.4.1 Git Hooks

```javascript
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 执行 lint-staged
npm run lint-staged

// package.json
{
  "scripts": {
    // 开发时使用
    "lint": "npm run lint:style && npm run lint:js && npm run format",
    "lint:js": "eslint --ext .js,.vue,.ts,.tsx src --fix",
    "lint:style": "stylelint \"src/**/*.{css,scss,less,vue}\" --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,vue,ts,tsx,css,scss,less,json,md}\"",

    // Git hooks 使用
    "prepare": "husky install",
    "lint-staged": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,less,vue}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

#### 9.4.2 Commit 规范

```javascript
// .commitlintrc.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复
        'docs', // 文档
        'style', // 格式
        'refactor', // 重构
        'perf', // 性能
        'test', // 测试
        'build', // 构建
        'ci', // CI/CD
        'chore', // 其他
        'revert' // 回滚
      ]
    ]
  }
}
```

### 9.5 构建优化配置

#### 9.5.1 基础构建配置

```javascript
// vite.config.js
export default defineConfig({
  build: {
    // 构建目标
    target: 'es2015',
    // 输出目录
    outDir: 'dist',
    // 静态资源目录
    assetsDir: 'assets',
    // 小于此阈值的导入或引用资源将内联为 base64 编码
    assetsInlineLimit: 4096,
    // CSS 代码拆分
    cssCodeSplit: true,
    // 启用/禁用 CSS 提取
    cssExtract: true,
    // 生产环境移除 console
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      },
      format: {
        comments: false
      }
    },
    // 关闭 brotli 压缩大小报告
    brotliSize: false,
    // chunk 大小警告的限制
    chunkSizeWarningLimit: 2000,
    // 启用/禁用生成 manifest.json
    manifest: true
  }
})
```

#### 9.5.2 分包策略配置

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 分包配置
        manualChunks: {
          // 第三方库分包
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus'],
          'echarts': ['echarts'],
          'utils': ['lodash-es', 'axios', 'dayjs'],
          
          // 业务代码分包
          'layouts': ['@/layouts/index.vue'],
          'views': ['@/views/index.vue'],
          'stores': ['@/stores/index.js']
        },
        // 用于从入口点创建的块的打包输出格式
        entryFileNames: 'js/[name]-[hash].js',
        // 用于动态导入的块的打包输出格式
        chunkFileNames: 'js/[name]-[hash].js',
        // 用于静态资源的输出格式
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'media'
          } else if (/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'img'
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts'
          }
          return `${extType}/[name]-[hash][extname]`
        }
      }
    }
  }
})
```

#### 9.5.3 性能优化配置

```javascript
// vite.config.js
import compression from 'vite-plugin-compression'
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    // Gzip 压缩
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // 10kb以上进行压缩
      deleteOriginFile: false
    }),
    
    // 兼容旧版浏览器
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    
    // 构建分析
    visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  
  build: {
    // 预构建配置
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'axios',
        'element-plus/es'
      ],
      exclude: []
    }
  }
})
```

#### 9.5.4 构建优化最佳实践

1. **代码分割策略**
   - 基于路由的代码分割
   - 第三方库单独分包
   - 公共模块提取
   - 异步组件懒加载

2. **资源优化**
   - 小图片转 base64
   - 开启 Gzip 压缩
   - 合理配置缓存策略
   - 图片资源优化

3. **构建性能**
   - 优化构建缓存
   - 并行构建处理
   - 按需编译文件
   - 减少构建体积

4. **浏览器兼容**
   - 设置目标浏览器
   - 添加需要的 polyfill
   - CSS 浏览器前缀
   - 代码降级处理

5. **监控和分析**
   - 构建速度监控
   - 包体积分析
   - 性能指标收集
   - 错误监控集成

### 9.6 多环境打包本

#### 9.6.1 环境配置文件

```bash
scripts/
  ├── build.js              # 构建脚本
  ├── config/               # 环境配置
  │   ├── index.js         # 配置入口
  │   ├── dev.js           # 开发环境配置
  │   ├── test.js          # 测试环境配置
  │   ├── staging.js       # 预发布环境配置
  │   └── prod.js          # 生产环境配置
  └── utils/               # 工具函数
      └── env.js           # 环境工具
```

#### 9.6.2 构建脚本实现

```javascript
// scripts/build.js
const { build } = require('vite')
const { resolve } = require('path')
const { loadEnv } = require('vite')
const chalk = require('chalk')

async function buildApp(mode) {
  const env = loadEnv(mode, process.cwd())
  console.log(chalk.blue(`正在打包 ${mode} 环境...`))
  
  try {
    await build({
      root: process.cwd(),
      mode,
      configFile: resolve(__dirname, '../vite.config.js'),
      envDir: resolve(__dirname, '../env')
    })
    
    console.log(chalk.green(`${mode} 环境打包完成！`))
  } catch (error) {
    console.error(chalk.red(`${mode} 环境打包失败：`), error)
    process.exit(1)
  }
}

// 获取命令行参数
const mode = process.argv[2] || 'production'
buildApp(mode)
```

#### 9.6.3 环境配置实现

```javascript
// scripts/config/index.js
const devConfig = require('./dev')
const testConfig = require('./test')
const stagingConfig = require('./staging')
const prodConfig = require('./prod')

const configs = {
  development: devConfig,
  test: testConfig,
  staging: stagingConfig,
  production: prodConfig
}

module.exports = function getConfig(mode) {
  return configs[mode] || prodConfig
}

// scripts/config/dev.js
module.exports = {
  outputDir: 'dist-dev',
  publicPath: '/',
  proxy: {
    '/api': 'http://localhost:3000'
  },
  define: {
    APP_ENV: JSON.stringify('development')
  }
}

// scripts/config/prod.js
module.exports = {
  outputDir: 'dist',
  publicPath: '/app/',
  proxy: {
    '/api': 'https://api.example.com'
  },
  define: {
    APP_ENV: JSON.stringify('production')
  },
  // 生产环境特有配置
  optimization: {
    minify: true,
    splitChunks: true,
    extractCSS: true
  }
}
```

#### 9.6.4 打包命令配置

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "node scripts/build.js production",
    "build:dev": "node scripts/build.js development",
    "build:test": "node scripts/build.js test",
    "build:staging": "node scripts/build.js staging",
    "build:analyze": "node scripts/build.js production --analyze",
    "preview": "vite preview",
    "preview:dist": "npm run build && npm run preview"
  }
}
```

#### 9.6.5 环境变量处理

```javascript
// scripts/utils/env.js
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

function loadEnv(mode) {
  const basePath = path.resolve(process.cwd(), '.env')
  const envPath = path.resolve(process.cwd(), `.env.${mode}`)
  
  let envConfig = {}
  
  // 加载基础环境变量
  if (fs.existsSync(basePath)) {
    envConfig = { ...envConfig, ...dotenv.parse(fs.readFileSync(basePath)) }
  }
  
  // 加载特定环境变量
  if (fs.existsSync(envPath)) {
    envConfig = { ...envConfig, ...dotenv.parse(fs.readFileSync(envPath)) }
  }
  
  // 处理环境变量
  for (const key in envConfig) {
    if (typeof envConfig[key] === 'string') {
      // 解析布尔值
      if (envConfig[key] === 'true') envConfig[key] = true
      if (envConfig[key] === 'false') envConfig[key] = false
      
      // 解析数字
      if (/^\d+$/.test(envConfig[key])) {
        envConfig[key] = Number(envConfig[key])
      }
      
      // 解析 JSON
      if (envConfig[key].startsWith('{') || envConfig[key].startsWith('[')) {
        try {
          envConfig[key] = JSON.parse(envConfig[key])
        } catch (e) {
          // 保持原值
        }
      }
    }
  }
  
  return envConfig
}

module.exports = {
  loadEnv
}
```

### 9.7 依赖管理

#### 9.7.1 依赖分类策略

```javascript
// package.json
{
  // 核心依赖：项目运行必需的依赖
  "dependencies": {
    // 框架核心
    "vue": "^3.3.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    
    // UI 组件库
    "element-plus": "^2.3.0",
    
    // 工具库
    "axios": "^1.4.0",
    "lodash-es": "^4.17.21",
    "dayjs": "^1.11.0"
  },
  
  // 开发依赖：仅开发环境需要
  "devDependencies": {
    // 构建工具
    "vite": "^4.3.0",
    "@vitejs/plugin-vue": "^4.2.0",
    "sass": "^1.62.0",
    
    // 代码规范
    "eslint": "^8.40.0",
    "prettier": "^2.8.0",
    "stylelint": "^15.6.0",
    
    // Git 工具
    "husky": "^8.0.0",
    "lint-staged": "^13.2.0",
    "@commitlint/cli": "^17.6.0",
    
    // 类型支持
    "typescript": "^5.0.0",
    "@types/node": "^18.16.0"
  },
  
  // 同级依赖：可选但推荐的依赖
  "peerDependencies": {
    "vue": "^3.3.0"
  },
  
  // 打包排除：不打包进最终产物
  "externals": {
    "vue": "Vue",
    "vue-router": "VueRouter",
    "element-plus": "ElementPlus"
  }
}
```

#### 9.7.2 版本控制策略

```javascript
// package.json
{
  // 锁定版本策略
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },
  
  // 包管理器配置
  "packageManager": "pnpm@7.0.0",
  
  // 依赖版本规则
  "dependencies": {
    // 固定版本：用于核心依赖
    "vue": "3.3.4",
    
    // 补丁版本更新：用于稳定依赖
    "axios": "~1.4.0",
    
    // 次版本更新：用于活跃依赖
    "lodash-es": "^4.17.21"
  }
}

// .npmrc
// 包管理器配置
registry=https://registry.npmmirror.com
save-exact=true
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=true

// .nvmrc
// Node.js 版本控制
16.20.0
```

#### 9.7.3 依赖更新策略

```javascript
// package.json
{
  "scripts": {
    // 依赖检查
    "deps:check": "npx npm-check-updates",
    // 依赖更新
    "deps:update": "npx npm-check-updates -u && npm install",
    // 依赖清理
    "deps:clean": "rm -rf node_modules package-lock.json && npm install",
    // 依赖分析
    "deps:analyze": "npx depcheck",
    // 漏洞检查
    "deps:audit": "npm audit"
  }
}

// scripts/checkDeps.js
const { execSync } = require('child_process')
const chalk = require('chalk')

// 检查依赖更新
function checkUpdates() {
  try {
    const output = execSync('npx npm-check-updates').toString()
    console.log(chalk.blue('依赖更新检查结果：'))
    console.log(output)
  } catch (error) {
    console.error(chalk.red('依赖检查失败：'), error)
  }
}

// 检查安全漏洞
function checkVulnerabilities() {
  try {
    const output = execSync('npm audit').toString()
    console.log(chalk.blue('安全漏洞检查结果：'))
    console.log(output)
  } catch (error) {
    console.error(chalk.red('漏洞检查失败：'), error)
  }
}

// 执行检查
checkUpdates()
checkVulnerabilities()
```

#### 9.7.4 依赖管理最佳实践

1. **版本控制原则**
   - 核心依赖使用固定版本
   - 工具依赖使用宽松版本
   - 定期更新依赖版本
   - 使用 lockfile 锁定版本

2. **依赖选择标准**
   - 选择社区活跃的包
   - 优先使用官方推荐
   - 考虑包的体积和性能
   - 评估依赖的稳定性

3. **性能优化策略**
   - 使用 pnpm 提升安装速度
   - 合理配置 externals
   - 按需加载组件和模块
   - 优化依赖引入方式

4. **安全性管理**
   - 定期进行安全审计
   - 及时更新有漏洞的包
   - 使用私有 npm 源
   - 配置包完整性检查

5. **工程化实践**
   - 统一依赖管理工具
   - 规范依赖引入方式
   - 自动化依赖检查
   - 完善的更新机制

## 10. 布局设计

### 10.1 布局层次结构
```
应用
 ├── 布局容器（Layout Container）
 │    ├── 基础布局（BaseLayout）
 │    │    └── 全局组件（Global Components）
 │    ├── 侧边栏布局（SidebarLayout）
 │    │    ├── 侧边栏（Sidebar）
 │    │    │    ├── Logo
 │    │    │    └── 导航菜单（Nav Menu）
 │    │    ├── 顶部栏（Header）
 │    │    │    ├── 折叠按钮
 │    │    │    ├── 面包屑
 │    │    │    └── 用户信息
 │    │    └── 主内容区（Main Content）
 │    │         ├── 路由视图（Router View）
 │    │         └── 页面组件（Page Components）
 │    └── 顶部导航布局（HeaderLayout）
 │         ├── 顶部栏（Header）
 │         │    ├── Logo
 │         │    ├── 导航菜单（Nav Menu）
 │         │    └── 用户信息
 │         └── 主内容区（Main Content）
 │              ├── 路由视图（Router View）
 │              └── 页面组件（Page Components）
 └── 全局组件（Global Components）
```

### 10.2 布局组件职责

#### 10.2.1 基础布局（BaseLayout）
- 提供布局的基础结构和公共功能
- 管理布局的切换和状态
- 处理响应式布局适配
- 提供布局配置接口

#### 10.2.2 侧边栏布局（SidebarLayout）
- 继承基础布局
- 实现侧边栏导航模式
- 控制侧边栏的展开/折叠
- 管理侧边菜单状态

#### 10.2.3 顶部导航布局（HeaderLayout）
- 继承基础布局
- 实现顶部导航模式
- 管理顶部菜单状态
- 处理下拉菜单交互

#### 10.2.4 布局组件通用职责
- 导航菜单渲染
- 用户信息展示
- 路由视图管理
- 主题样式控制

### 10.3 布局配置

#### 10.3.1 布局主题配置
```javascript
// 布局主题配置
export const layoutTheme = {
  // 侧边栏布局主题
  sidebar: {
    width: '200px',
    collapsedWidth: '64px',
    backgroundColor: '#304156',
    textColor: '#fff',
    activeTextColor: '#409EFF'
  },
  // 顶部导航布局主题
  header: {
    height: '60px',
    backgroundColor: '#fff',
    borderColor: '#dcdfe6',
    menuHeight: '50px',
    menuBackgroundColor: '#304156',
    menuTextColor: '#fff',
    menuActiveTextColor: '#409EFF'
  },
  // 主内容区主题
  main: {
    backgroundColor: '#f0f2f5',
    padding: '20px'
  }
}

// 布局配置
export const layoutConfig = {
  // 默认布局
  defaultLayout: 'sidebar',
  
  // 可用布局
  layouts: {
    sidebar: {
      name: '侧边栏布局',
      component: 'SidebarLayout'
    },
    header: {
      name: '顶部导航布局',
      component: 'HeaderLayout'
    }
  },
  
  // 布局切换配置
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
```

### 10.4 布局最佳实践

#### 10.4.1 布局组件实现
```vue
<!-- layouts/BaseLayout.vue -->
<template>
  <div class="base-layout">
    <slot name="layout">
      <!-- 默认布局内容 -->
    </slot>
  </div>
</template>

<!-- layouts/SidebarLayout.vue -->
<template>
  <base-layout>
    <template #layout>
      <el-container>
        <el-aside :width="sidebarWidth">
          <sidebar-menu
            :collapse="isCollapse"
            :menu-items="menuItems"
            :theme="theme.sidebar"
          />
        </el-aside>
        <el-container>
          <el-header>
            <header-bar
              :is-collapse="isCollapse"
              @toggle="toggleSidebar"
            />
          </el-header>
          <el-main>
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </template>
  </base-layout>
</template>

<!-- layouts/HeaderLayout.vue -->
<template>
  <base-layout>
    <template #layout>
      <el-container>
        <el-header>
          <header-menu
            :menu-items="menuItems"
            :theme="theme.header"
          />
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </template>
  </base-layout>
</template>
```

#### 10.4.2 布局状态管理
```javascript
// stores/layout.js
export const useLayoutStore = defineStore('layout', {
  state: () => ({
    // 当前布局
    currentLayout: 'sidebar',
    // 布局配置
    config: layoutConfig,
    // 布局主题
    theme: layoutTheme,
    // 侧边栏状态
    sidebar: {
      collapsed: false
    }
  }),
  
  actions: {
    // 切换布局
    setLayout(layout) {
      if (this.config.layouts[layout]) {
        this.currentLayout = layout
      }
    },
    
    // 切换侧边栏
    toggleSidebar() {
      this.sidebar.collapsed = !this.sidebar.collapsed
    },
    
    // 更新主题
    updateTheme(theme) {
      this.theme = merge(this.theme, theme)
    }
  },
  
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'layout',
        storage: localStorage,
        paths: ['currentLayout', 'sidebar', 'theme']
      }
    ]
  }
})
```

#### 10.4.3 路由配置
```javascript
// router/index.js
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          layout: 'sidebar' // 指定使用侧边栏布局
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: '个人中心',
          layout: 'header' // 指定使用顶部导航布局
        }
      }
    ]
  }
]
```

### 10.5 注意事项
1. 布局组件应该是可扩展的，便于添加新的布局模式
2. 布局切换时需要保持页面状态和数据
3. 不同布局下的导航菜单应保持一致的数据源
4. 布局切换动画要流畅自然
5. 响应式设计要兼顾不同布局模式
6. 用户的布局偏好设置应该持久化保存
7. 路由配置中可以指定每个页面的默认布局
8. 主题配置要考虑不同布局的特殊需求
