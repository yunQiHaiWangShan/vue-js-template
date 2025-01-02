<template>
  <div class="header-layout">
    <!-- 顶部导航 -->
    <header 
      class="header"
      :style="{
        height: layoutStore.theme.header.height,
        backgroundColor: layoutStore.theme.header.backgroundColor,
        borderColor: layoutStore.theme.header.borderColor
      }"
    >
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="Logo">
        <span>Vue Admin</span>
      </div>
      
      <!-- 导航菜单 -->
      <nav 
        class="menu"
        :style="{
          height: layoutStore.theme.header.menuHeight,
          backgroundColor: layoutStore.theme.header.menuBackgroundColor
        }"
      >
        <router-link 
          v-for="route in routes" 
          :key="route.path"
          :to="`/examples/${route.path}`"
          class="menu-item"
          :class="{ active: currentPath === `/examples/${route.path}` }"
        >
          <i :class="route.meta?.icon || 'el-icon-menu'"></i>
          <span>{{ route.meta?.title || route.name }}</span>
        </router-link>
      </nav>
      
      <!-- 用户信息 -->
      <div class="user-info">
        <el-dropdown>
          <span class="user-name">
            <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span>Admin</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>
    
    <!-- 主内容区 -->
    <main 
      class="main-content1"
      :style="{
        backgroundColor: layoutStore.theme.main.backgroundColor,
        padding: layoutStore.theme.main.padding,
        marginTop: layoutStore.theme.header.height
      }"
    >
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()

// 获取路由列表
const routes = computed(() => {
  // 获取根路由下的 examples 路由
  const examplesRoute = router.options.routes
    .find(route => route.path === '/')
    ?.children
    ?.find(route => route.path === '/examples')
  return examplesRoute?.children || []
})

// 当前路径
const currentPath = computed(() => route.path)

// Helper functions for template
const getIcon = (route) => route.meta?.icon || 'el-icon-menu'
const getTitle = (route) => route.meta?.title || route.name
</script>

<style scoped>
.header-layout {
  min-height: 100vh;
  background-color: var(--el-bg-color);
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%);
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.logo img {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

.menu {
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
}

.menu-item {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  color: var(--el-text-color-primary);
  text-decoration: none;
  transition: all 0.3s;
}

.menu-item:hover {
  color: var(--el-color-primary);
  background-color: rgb(64 158 255 / 10%);
}

.menu-item.active {
  color: var(--el-color-primary);
  border-bottom: 2px solid var(--el-color-primary);
}

.menu-item i {
  margin-right: 8px;
  font-size: 16px;
}

.user-info {
  margin-left: auto;
}

.user-name {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-name span {
  margin-left: 8px;
}

.main-content {
  min-height: calc(100vh - var(--header-height));
}

/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 