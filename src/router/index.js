import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useLayoutStore } from '@/stores/layout'

const routes = [
  {
    path: '/',
    component: BaseLayout,
    redirect: '/examples/welcome',
    children: [
      {
        path: '/examples',
        name: 'Examples',
        redirect: '/examples/welcome',
        meta: {
          title: '布局示例',
          icon: 'el-icon-menu'
        },
        children: [
          {
            path: 'welcome',
            name: 'LayoutWelcome',
            component: () => import('@/views/examples/layouts/welcome.vue'),
            meta: {
              title: '布局介绍',
              icon: 'el-icon-info',
              layout: 'sidebar'
            }
          },
          {
            path: 'sidebar-demo',
            name: 'SidebarDemo',
            component: () => import('@/views/examples/layouts/sidebar-demo.vue'),
            meta: {
              title: '侧边栏布局',
              icon: 'el-icon-s-fold',
              layout: 'sidebar'
            }
          },
          {
            path: 'header-demo',
            name: 'HeaderDemo',
            component: () => import('@/views/examples/layouts/header-demo.vue'),
            meta: {
              title: '顶部导航布局',
              icon: 'el-icon-menu',
              layout: 'header'
            }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置文档标题
  const title = to.meta?.title
  if (title) {
    document.title = `${title} - Vue Admin`
  }

  // 获取布局信息
  const layout = to.meta?.layout || 'sidebar'
  const layoutStore = useLayoutStore()
  // 根据路由 meta 信息设置布局
  layoutStore.setLayout(layout)
  
  // 如果是移动端访问，自动折叠侧边栏
  if (window.innerWidth <= 768 && layout === 'sidebar') {
    layoutStore.sidebar.collapsed = true
  }

  // 记录访问历史
  if (!from.name) {
    console.log('首次访问:', to.fullPath)
  } else {
    console.log('路由切换:', from.fullPath, '->', to.fullPath)
  }

  // 继续路由导航
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 路由切换后，滚动到页面顶部
  window.scrollTo(0, 0)
})

export default router
