<template>
  <div class="sidebar-layout">

    <!-- PC端侧边栏 -->
    <aside 
      class="sidebar"
      :class="{ collapsed: layoutStore.sidebar.collapsed }"
      :style="{
        width: layoutStore.sidebarWidth,
        backgroundColor: layoutStore.theme.sidebar.backgroundColor
      }"
    >
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="Logo">
        <span v-show="!layoutStore.sidebar.collapsed">Vue Admin</span>
      </div>
      
      <!-- 导航菜单 -->
      <nav class="menu">
        <router-link 
          v-for="route in routes" 
          :key="route.path"
          :to="`/examples/${route.path}`"
          class="menu-item"
          :class="{ active: currentPath === `/examples/${route.path}` }"
        >
          <i :class="getIcon(route)"></i>
          <span class="linkText">{{ getTitle(route) }}</span>
        </router-link>
     
      </nav>
      
  
    </aside>
    
    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 顶部导航 -->
      <header 
        class="header"
        :style="{
          height: layoutStore.theme.header.height,
          backgroundColor: layoutStore.theme.header.backgroundColor,
          borderColor: layoutStore.theme.header.borderColor
        }"
      >

        <div  class="collapse-btn" @click="layoutStore.toggleSidebar">
          <i :class="layoutStore.sidebar.collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>

        <!-- 用户信息 -->
        <div class="user-info">
          <el-dropdown>
            <span class="user-name">
              <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <span class="hide-on-mobile">Admin</span>
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
      
      <!-- 内容区 -->
      <main 
        class="main-content2"
        :style="{
          backgroundColor: layoutStore.theme.main.backgroundColor,
          padding: layoutStore.theme.main.padding
        }"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()

// 响应式断点
const breakpoints = useBreakpoints({
  mobile: 768,
  tablet: 992,
  desktop: 1200,
})

const isMobile = computed(() => breakpoints.smaller('tablet'))

// 移动端抽屉状态
const showDrawer = ref(false)
const closeDrawer = () => {
  showDrawer.value = false
}

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
const getTitle = (route) => {
   
  return route.meta?.title || route.name
}

// 监听移动端状态变化
watch(isMobile, (newValue) => {
  if (newValue) {
    // 在移动端时自动折叠侧边栏
    layoutStore.sidebar.collapsed = true
  }
})

// 组件挂载时的处理
onMounted(() => {
  // 初始化移动端状态
  if (isMobile.value) {
    layoutStore.sidebar.collapsed = true
  }
  
  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
})

// 组件卸载时的清理
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 处理窗口大小变化
const handleResize = () => {
  if (isMobile.value) {
    showDrawer.value = false
    layoutStore.sidebar.collapsed = true
  }
}
</script>

<style scoped lang="scss">
.menu{
  .menu-item{
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 16px;
    text-decoration: none;
    transition: all 0.3s;
  }

  .linkText{
    color: #fff;
  }

  .router-link-exact-active{
    color:#fff;
  }
}

.sidebar-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  overflow: hidden;
  z-index: 1000;
}



.logo {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: #fff;
  transition: all 0.3s;
}

.logo img {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}


.menu-item:hover {
  background-color: rgb(255 255 255 / 10%);
}

.menu-item.active {
  background-color: var(--el-color-primary);
}

.menu-item i {
  margin-right: 12px;
  font-size: 18px;
}

.collapse-btn {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.collapse-btn:hover {
  background-color: rgb(255 255 255 / 10%);
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid;
}

.menu-btn {
  font-size: 20px;
  cursor: pointer;
}

.user-info {
  cursor: pointer;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.main-content {
  flex: 1;
  overflow: auto;
}

/* 响应式样式 */
@media screen and (width <= 768px) {
  .hide-on-mobile {
    display: none;
  }
  
  .sidebar {
    display: none;
  }
  
  .header {
    padding: 0 12px;
  }
}

/* 抽屉样式 */
.sidebar-drawer :deep(.el-drawer__body) {
  padding: 0;
  background-color: var(--el-color-primary-dark);
}
</style> 