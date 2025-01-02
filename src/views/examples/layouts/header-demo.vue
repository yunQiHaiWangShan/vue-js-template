<template>
  <div class="header-demo">
    <el-card class="feature-card">
      <template #header>
        <div class="card-header">
          <span>顶部导航布局功能演示</span>
        </div>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <div class="feature-title">
                <el-icon><Brush /></el-icon>
                <span>导航栏主题</span>
              </div>
            </template>
            <el-color-picker 
              v-model="menuColor" 
              show-alpha
              @change="updateTheme"
            />
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <div class="feature-title">
                <el-icon><Expand /></el-icon>
                <span>全屏模式</span>
              </div>
            </template>
            <el-button type="primary" @click="toggleFullscreen">
              {{ isFullscreen ? '退出全屏' : '进入全屏' }}
            </el-button>
          </el-card>
        </el-col>
      </el-row>

      <el-card class="mt-4">
        <template #header>
          <div class="card-header">
            <span>示例内容</span>
          </div>
        </template>
        <div class="demo-content">
          <el-descriptions title="顶部导航布局特点" :column="1" border>
            <el-descriptions-item label="导航方式">
              水平导航菜单，适合层级较浅的应用
            </el-descriptions-item>
            <el-descriptions-item label="视觉效果">
              视觉层次清晰，导航一目了然
            </el-descriptions-item>
            <el-descriptions-item label="响应式">
              在移动端自动转为下拉菜单
            </el-descriptions-item>
            <el-descriptions-item label="空间利用">
              最大化内容展示区域，适合展示型网站
            </el-descriptions-item>
          </el-descriptions>

          <el-divider>功能展示</el-divider>
          
          <el-tabs type="border-card">
            <el-tab-pane label="导航菜单">
              <el-menu mode="horizontal" :ellipsis="false">
                <el-menu-item index="1">首页</el-menu-item>
                <el-sub-menu index="2">
                  <template #title>工作台</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3">消息中心</el-menu-item>
              </el-menu>
            </el-tab-pane>
            <el-tab-pane label="使用说明">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="feature" label="功能" width="180" />
                <el-table-column prop="description" label="说明" />
                <el-table-column prop="usage" label="使用方法" width="280" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Brush, Expand } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

// 导航栏颜色
const menuColor = ref(layoutStore.theme.header.menuBackgroundColor)

// 更新主题
const updateTheme = (color) => {
  layoutStore.updateTheme({
    header: {
      ...layoutStore.theme.header,
      menuBackgroundColor: color
    }
  })
}

// 全屏控制
const isFullscreen = ref(false)
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// 示例数据
const tableData = [
  {
    feature: '导航菜单',
    description: '水平导航菜单，支持下拉子菜单',
    usage: '<el-menu mode="horizontal">'
  },
  {
    feature: '主题定制',
    description: '自定义导航栏颜色等样式',
    usage: 'layoutStore.updateTheme({ header: { ... } })'
  },
  {
    feature: '全屏模式',
    description: '支持内容全屏展示',
    usage: 'document.documentElement.requestFullscreen()'
  }
]
</script>

<style scoped>
.header-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mt-4 {
  margin-top: 16px;
}

.demo-content {
  margin-top: 16px;
}

:deep(.el-descriptions__label) {
  width: 120px;
  font-weight: bold;
}

.el-divider {
  margin: 32px 0;
}

:deep(.el-menu--horizontal) {
  border-bottom: none;
}
</style> 