// 布局主题配置
export const layoutTheme = {
  // 侧边栏布局主题
  sidebar: {
    width: '200px',
    collapsedWidth: '200px',
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
    menuBackgroundColor: '#fff',
    menuTextColor: '#fff',
    menuActiveTextColor: '#409EFF'
  },
  // 主内容区主题
  main: {
    backgroundColor: '#f0f2f5',
    padding: '20px'
  }
}

export const useLayoutStore = defineStore('layout', () => {
  // 当前布局
  const currentLayout = ref('sidebar')
  
  // 布局主题
  const theme = ref(layoutTheme)
  
  // 侧边栏状态
  const sidebar = ref({
    collapsed: false
  })
  
  // 计算属性
  const sidebarWidth = computed(() => 
    sidebar.value.collapsed ? theme.value.sidebar.collapsedWidth : theme.value.sidebar.width
  )
  
  // Actions
  function setLayout(layout) {
    if (layout === 'sidebar' || layout === 'header') {
      currentLayout.value = layout
    }
  }
  
  function toggleSidebar() {
    sidebar.value.collapsed = !sidebar.value.collapsed
  }
  
  function updateTheme(newTheme) {
    theme.value = {
      ...theme.value,
      ...newTheme
    }
  }
  
  return {
    currentLayout,
    theme,
    sidebar,
    sidebarWidth,
    setLayout,
    toggleSidebar,
    updateTheme
  }
}, {
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