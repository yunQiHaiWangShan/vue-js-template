<template>
  <div class="layout-examples">
    <el-tabs v-model="activeTab" class="demo-tabs">
      <el-tab-pane label="布局切换" name="switch">
        <BaseLayoutExample />
      </el-tab-pane>
      
      <el-tab-pane label="侧边栏布局" name="sidebar">
        <SidebarLayoutExample />
      </el-tab-pane>
      
      <el-tab-pane label="顶部导航布局" name="header">
        <HeaderLayoutExample />
      </el-tab-pane>
    </el-tabs>

    <el-card class="features-card">
      <template #header>
        <div class="card-header">
          <span>布局系统特性</span>
        </div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="动态切换">
          支持在运行时无缝切换不同布局模式，并提供平滑过渡动画
        </el-descriptions-item>
        <el-descriptions-item label="响应式设计">
          自适应不同屏幕尺寸，在移动端和桌面端都能提供良好体验
        </el-descriptions-item>
        <el-descriptions-item label="状态管理">
          使用 Pinia 管理布局状态，支持持久化保存用户偏好
        </el-descriptions-item>
        <el-descriptions-item label="主题定制">
          支持自定义主题色、暗黑模式等样式定制
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="usage-card">
      <template #header>
        <div class="card-header">
          <span>使用方法</span>
        </div>
      </template>
      <el-steps :active="1" finish-status="success">
        <el-step title="引入布局">
          <template #description>
            <pre><code>import BaseLayout from '@/layouts/BaseLayout.vue'</code></pre>
          </template>
        </el-step>
        <el-step title="使用布局">
          <template #description>
            <pre><code>&lt;BaseLayout&gt;
  &lt;router-view /&gt;
&lt;/BaseLayout&gt;</code></pre>
          </template>
        </el-step>
        <el-step title="切换布局">
          <template #description>
            <pre><code>const layoutStore = useLayoutStore()
layoutStore.currentLayout = 'sidebar' // 或 'header'</code></pre>
          </template>
        </el-step>
      </el-steps>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseLayoutExample from '@/examples/BaseLayoutExample.vue'
import SidebarLayoutExample from '@/examples/SidebarLayoutExample.vue'
import HeaderLayoutExample from '@/examples/HeaderLayoutExample.vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
const activeTab = ref('switch')
</script>

<style scoped>
.layout-examples {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.features-card,
.usage-card {
  margin-top: 20px;
}

.card-header {
  font-weight: bold;
}

pre {
  background-color: #f5f7fa;
  padding: 12px;
  border-radius: 4px;
  margin: 8px 0;
}

code {
  color: #409eff;
}

:deep(.el-descriptions__label) {
  font-weight: bold;
  width: 120px;
}

:deep(.el-tabs__content) {
  padding: 20px 0;
}
</style> 