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
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <BaseButton
            type="primary"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </BaseButton>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { showError, showSuccess } = useMessage()

// 表单引用
const formRef = ref(null)

// 登录表单数据
const loginForm = ref({
  username: '',
  password: ''
})

// 加载状态
const loading = ref(false)

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ]
}

// 处理登录
const handleLogin = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    await userStore.login(loginForm.value.username, loginForm.value.password)
    showSuccess('登录成功')
    router.push('/')
  } catch (error) {
    if (error?.message) {
      showError(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.login-card {
  width: 480px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.login-card :deep(.el-card__header) {
  text-align: center;
  border-bottom: 1px solid #e4e7ed;
}

.login-card h2 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.el-form {
  padding: 20px 40px;
}
</style> 