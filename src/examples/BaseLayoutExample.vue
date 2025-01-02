<template>
  <div class="base-layout-example">
    <el-card class="feature-demo">
      <template #header>
        <div class="card-header">
          <span>基础布局切换演示</span>
        </div>
      </template>
      
      <!-- 功能演示区 -->
      <div class="demo-section">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card shadow="hover">
              <template #header>
                <div class="feature-title">
                  <el-icon><Switch /></el-icon>
                  <span>布局切换</span>
                </div>
              </template>
              <el-radio-group v-model="layoutStore.currentLayout" class="layout-switcher">
                <el-radio-button label="sidebar">
                  <el-icon><Grid /></el-icon>
                  侧边栏布局
                </el-radio-button>
                <el-radio-button label="header">
                  <el-icon><Menu /></el-icon>
                  顶部导航布局
                </el-radio-button>
              </el-radio-group>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt-4">
          <el-col :span="24">
            <el-card shadow="hover" class="preview-card">
              <div class="layout-preview" :class="layoutStore.currentLayout">
                <div class="preview-sidebar" v-if="layoutStore.currentLayout === 'sidebar'">
                  <div class="mock-menu"></div>
                  <div class="mock-menu"></div>
                  <div class="mock-menu"></div>
                </div>
                <div class="preview-header" v-if="layoutStore.currentLayout === 'header'">
                  <div class="mock-nav"></div>
                </div>
                <div class="preview-content">
                  <div class="mock-header"></div>
                  <div class="mock-paragraph"></div>
                  <div class="mock-paragraph"></div>
                  <div class="mock-paragraph" style="width: 80%"></div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="mt-4">
      <template #header>
        <div class="card-header">
          <span>布局切换说明</span>
        </div>
      </template>
      <el-alert
        title="布局切换注意事项"
        type="info"
        description="布局切换会保持页面状态，并提供平滑的过渡动画。建议在应用初始化时选择合适的布局，避免频繁切换。"
        show-icon
        :closable="false"
        class="mb-4"
      />
      <el-descriptions :column="1" border>
        <el-descriptions-item label="状态保持">
          切换布局时会保持页面的状态和数据
        </el-descriptions-item>
        <el-descriptions-item label="动画过渡">
          提供平滑的过渡效果，避免突兀的视觉变化
        </el-descriptions-item>
        <el-descriptions-item label="响应式">
          在不同设备上自动调整布局表现
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { Switch, Grid, Menu } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
</script>

<style scoped>
.base-layout-example {
  padding: 20px;
}

.feature-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.layout-switcher {
  display: flex;
  gap: 16px;
}

.layout-preview {
  height: 300px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  display: flex;
}

.preview-sidebar {
  width: 200px;
  background: #545c64;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preview-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #545c64;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.preview-content {
  flex: 1;
  padding: 20px;
  background: #fff;
  margin-top: v-bind("layoutStore.currentLayout === 'header' ? '60px' : 0");
}

.mock-menu {
  height: 32px;
  background: rgb(255 255 255 / 20%);
  border-radius: 4px;
}

.mock-nav {
  height: 32px;
  background: rgb(255 255 255 / 20%);
  border-radius: 4px;
  width: 80%;
}

.mock-header {
  height: 24px;
  background: #e4e7ed;
  border-radius: 4px;
  margin-bottom: 20px;
}

.mock-paragraph {
  height: 16px;
  background: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 16px;
  width: 100%;
}

.mt-4 {
  margin-top: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

:deep(.el-radio-button__inner) {
  display: flex;
  align-items: center;
  gap: 4px;
}

:deep(.el-descriptions__label) {
  font-weight: bold;
  width: 120px;
}
</style> 