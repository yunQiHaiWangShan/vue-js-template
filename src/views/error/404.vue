<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <h2>页面不存在</h2>
      <p>抱歉，您访问的页面不存在或已被删除</p>
      <BaseButton type="primary" @click="router.push('/')">
        返回首页
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
</script>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.content {
  text-align: center;
}

h1 {
  font-size: 120px;
  margin: 0;
  color: #409eff;
}

h2 {
  font-size: 30px;
  margin: 20px 0;
  color: #303133;
}

p {
  color: #606266;
  margin-bottom: 30px;
}
</style> 