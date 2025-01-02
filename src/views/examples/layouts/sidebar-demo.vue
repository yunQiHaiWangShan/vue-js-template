<template>
  <div class="sidebar-demo">
    <el-card class="feature-card">
      <template #header>
        <div class="card-header">
          <span>侧边栏布局功能演示</span>
        </div>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <div class="feature-title">
                <el-icon><Fold /></el-icon>
                <span>菜单折叠</span>
              </div>
            </template>
            <el-switch
              v-model="layoutStore.sidebar.collapsed"
              active-text="折叠"
              inactive-text="展开"
            />
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <div class="feature-title">
                <el-icon><Brush /></el-icon>
                <span>主题定制</span>
              </div>
            </template>
            <el-color-picker 
              v-model="sidebarColor" 
              show-alpha
              @change="updateTheme"
            />
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
          <el-descriptions title="侧边栏布局特点" :column="1" border>
            <el-descriptions-item label="导航层级">
              支持多级菜单导航，适合复杂的应用结构
            </el-descriptions-item>
            <el-descriptions-item label="空间利用">
              垂直空间利用率高，可以展示更多的导航项
            </el-descriptions-item>
            <el-descriptions-item label="响应式">
              在移动端自动切换为抽屉式菜单
            </el-descriptions-item>
            <el-descriptions-item label="可定制性">
              支持菜单折叠、主题定制等功能
            </el-descriptions-item>
          </el-descriptions>

          <el-divider>使用示例</el-divider>
          
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="feature" label="功能" width="180" />
            <el-table-column prop="description" label="说明" />
            <el-table-column prop="usage" label="使用方法" width="280" />
          </el-table>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Fold, Brush } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

// 侧边栏颜色
const sidebarColor = ref(layoutStore.theme.sidebar.backgroundColor)

// 更新主题
const updateTheme = (color) => {
  layoutStore.updateTheme({
    sidebar: {
      ...layoutStore.theme.sidebar,
      backgroundColor: color
    }
  })
}

// 示例数据
const tableData = [
  {
    feature: '菜单折叠',
    description: '通过折叠按钮控制侧边栏宽度',
    usage: 'layoutStore.sidebar.collapsed = true/false'
  },
  {
    feature: '主题定制',
    description: '自定义侧边栏颜色等样式',
    usage: 'layoutStore.updateTheme({ sidebar: { ... } })'
  },
  {
    feature: '响应式布局',
    description: '自动适应不同屏幕尺寸',
    usage: '无需额外配置，自动启用'
  }
]
</script>

<style scoped>
.sidebar-demo {
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
</style> 