<template>
  <MainLayout :active-menu="activeMenu">
    <!-- 菜单插槽 -->
    <template #menu>
      <el-menu-item index="home">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="user" @click="router.push('/user')">
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
    </template>

    <!-- 头部插槽 -->
    <template #header>
      <div class="user-info">
        <el-dropdown>
          <span class="user-dropdown">
            管理员
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>

    <!-- 主内容区 -->
    <div class="home-content">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="full-height">
            <template #header>
              <div class="card-header">
                <span>数据统计</span>
                <BaseButton type="link">查看详情</BaseButton>
              </div>
            </template>
            <div class="data-overview">
              <div class="data-item">
                <div class="data-title">用户总数</div>
                <div class="data-value">1,234</div>
              </div>
              <div class="data-item">
                <div class="data-title">今日活跃</div>
                <div class="data-value">123</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card class="full-height">
            <template #header>
              <div class="card-header">
                <span>最近登录</span>
                <BaseButton type="link">更多</BaseButton>
              </div>
            </template>
            <el-table :data="recentLogins" stripe>
              <el-table-column prop="username" label="用户名" />
              <el-table-column prop="loginTime" label="登录时间" />
              <el-table-column prop="ip" label="IP地址" />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </MainLayout>
</template>

<script setup>
const router = useRouter()
const route = useRoute()

// 当前激活的菜单
const activeMenu = computed(() => route.name)

// 模拟最近登录数据
const recentLogins = ref([
  {
    username: '张三',
    loginTime: '2023-12-27 10:00:00',
    ip: '192.168.1.1'
  },
  {
    username: '李四',
    loginTime: '2023-12-27 09:30:00',
    ip: '192.168.1.2'
  },
  {
    username: '王五',
    loginTime: '2023-12-27 09:00:00',
    ip: '192.168.1.3'
  }
])
</script>

<style scoped>
.home-content {
  height: 100%;
}

.el-row {
  height: 100%;
}

.el-col {
  height: 100%;
}

.full-height {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.full-height :deep(.el-card__body) {
  flex: 1;
  overflow: auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.data-overview {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 20px 0;
}

.data-item {
  padding: 20px;
}

.data-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 10px;
}

.data-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #303133;
}

:deep(.el-table) {
  height: 100%;
}
</style>
