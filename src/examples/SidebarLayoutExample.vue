<template>
  <div class="sidebar-layout-example">
    <el-card class="feature-demo">
      <template #header>
        <div class="card-header">
          <span>侧边栏布局演示</span>
        </div>
      </template>
      
      <!-- 功能演示区 -->
      <div class="demo-section">
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
                v-model="isCollapse"
                active-text="折叠"
                inactive-text="展开"
              />
            </el-card>
          </el-col>
          
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="feature-title">
                  <el-icon><Position /></el-icon>
                  <span>固定侧边栏</span>
                </div>
              </template>
              <el-switch
                v-model="isFixed"
                active-text="固定"
                inactive-text="滚动"
              />
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt-4">
          <el-col :span="8">
            <el-card 
              class="menu-preview"
              :class="{ 'is-collapse': isCollapse, 'is-fixed': isFixed }"
            >
              <el-menu
                default-active="1"
                :collapse="isCollapse"
                class="demo-menu"
              >
                <el-menu-item index="1">
                  <el-icon><House /></el-icon>
                  <template #title>首页</template>
                </el-menu-item>
                
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon><Document /></el-icon>
                    <span>表单页面</span>
                  </template>
                  <el-menu-item index="2-1">基础表单</el-menu-item>
                  <el-menu-item index="2-2">分步表单</el-menu-item>
                </el-sub-menu>
                
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon><Grid /></el-icon>
                    <span>列表页面</span>
                  </template>
                  <el-menu-item index="3-1">查询列表</el-menu-item>
                  <el-menu-item index="3-2">标准列表</el-menu-item>
                  <el-menu-item index="3-3">卡片列表</el-menu-item>
                </el-sub-menu>
              </el-menu>
            </el-card>
          </el-col>
          
          <el-col :span="16">
            <el-card shadow="hover" class="content-preview">
              <div class="mock-content">
                <div class="mock-header"></div>
                <div class="mock-paragraph"></div>
                <div class="mock-paragraph"></div>
                <div class="mock-paragraph" style="width: 80%"></div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="mt-4">
      <template #header>
        <div class="card-header">
          <span>布局特点</span>
        </div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="层级导航">
          适合具有复杂层级结构的应用，可以清晰展示多级菜单
        </el-descriptions-item>
        <el-descriptions-item label="空间利用">
          垂直空间利用率高，适合展示大量分类内容
        </el-descriptions-item>
        <el-descriptions-item label="交互体验">
          支持菜单折叠展开，固定定位等高级特性
        </el-descriptions-item>
        <el-descriptions-item label="响应式">
          在小屏幕设备上自动调整为抽屉式菜单
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Fold, Position, House, Document, Grid } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const isFixed = ref(true)
</script>

<style scoped>
.sidebar-layout-example {
  padding: 20px;
}

.feature-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mt-4 {
  margin-top: 16px;
}

.menu-preview {
  transition: all 0.3s ease;
  min-height: 400px;
}

.menu-preview.is-collapse :deep(.el-menu) {
  width: 64px;
}

.menu-preview :deep(.el-menu) {
  border-right: none;
  width: 200px;
  transition: width 0.3s ease;
}

.content-preview {
  height: 400px;
}

.mock-content {
  padding: 20px;
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

:deep(.el-descriptions__label) {
  font-weight: bold;
  width: 120px;
}
</style> 