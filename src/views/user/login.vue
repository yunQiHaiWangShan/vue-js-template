<script setup>
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)

const formRef = ref(null)
const loginForm = ref({
  username: '',
  password: ''
})

// 使用新的表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { 
      type: 'string',
      min: 6,
      message: '密码长度不能小于6位',
      transform: value => value
    }
  ]
}

const handleLogin = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    const success = await userStore.login(loginForm.value)
    
    if (success) {
      ElMessage.success('登录成功')
      // 如果有重定向地址，则跳转到重定向地址
      const redirectPath = route.query.redirect || '/'
      router.replace(redirectPath)
    } else {
      ElMessage.error('登录失败')
    }
  } catch (error) {
    console.error('Login validation failed:', error)
    ElMessage.error('请检查输入内容')
  }
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2>用户登录</h2>
      </template>
      
      <el-form
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        label-width="80px"
        @keyup.enter="handleLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="loginForm.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            show-password
            placeholder="请输入密码"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--el-bg-color);
  
  .login-card {
    width: 480px;
    border-radius: var(--el-border-radius-base);
    box-shadow: var(--el-box-shadow-light);
    
    :deep(.el-card__header) {
      text-align: center;
      border-bottom: 1px solid var(--el-border-color-light);
      
      h2 {
        margin: 0;
        color: var(--el-text-color-primary);
      }
    }
  }
}
</style> 