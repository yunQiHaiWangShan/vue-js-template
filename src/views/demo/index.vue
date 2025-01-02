<template>
  <div class="demo-page">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <h3>欢迎使用 Vue Admin</h3>
        </div>
      </template>
      <div class="card-content">
        <p>这是一个基于 Vue 3 + Element Plus 的后台管理系统模板。</p>
        <p>当前支持以下功能：</p>
        <ul>
          <li>灵活的布局系统（支持侧边栏和顶部导航两种布局）</li>
          <li>主题配置</li>
          <li>用户管理示例</li>
        </ul>
        <el-button type="primary" @click="goToUser">查看用户管理示例</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
const router = useRouter()

const goToUser = () => {
  router.push('/user')
}
</script>

<style scoped>
.demo-page {
  padding: 20px;
}

.welcome-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.card-content {
  line-height: 1.8;
}

.card-content ul {
  margin: 16px 0;
  padding-left: 20px;
}

.card-content li {
  margin: 8px 0;
}
</style> 