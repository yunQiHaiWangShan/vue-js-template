<template>
  <div class="header-layout-example">
    <el-card class="feature-demo">
      <template #header>
        <div class="card-header">
          <span>顶部导航布局演示</span>
        </div>
      </template>
      
      <!-- 功能演示区 -->
      <div class="demo-section">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="feature-title">
                  <el-icon><Expand /></el-icon>
                  <span>全屏切换</span>
                </div>
              </template>
              <el-button type="primary" @click="toggleFullscreen">
                {{ isFullscreen ? '退出全屏' : '进入全屏' }}
              </el-button>
            </el-card>
          </el-col>
          
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="feature-title">
                  <el-icon><Moon /></el-icon>
                  <span>主题切换</span>
                </div>
              </template>
              <el-switch
                v-model="isDark"
                active-text="暗黑模式"
                inactive-text="明亮模式"
                @change="toggleTheme"
              />
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt-4">
          <el-col :span="24">
            <el-card shadow="hover">
              <template #header>
                <div class="feature-title">
                  <el-icon><Menu /></el-icon>
                  <span>导航菜单</span>
                </div>
              </template>
              <el-menu mode="horizontal" :ellipsis="false">
                <el-menu-item index="1">首页</el-menu-item>
                <el-sub-menu index="2">
                  <template #title>工作台</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3">消息中心</el-menu-item>
              </el-menu>
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
      <el-timeline>
        <el-timeline-item
          v-for="(feature, index) in features"
          :key="index"
          :type="feature.type"
        >
          <h4>{{ feature.title }}</h4>
          <p>{{ feature.content }}</p>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Expand, Moon, Menu } from '@element-plus/icons-vue'

const isFullscreen = ref(false)
const isDark = ref(false)

const features = [
  {
    title: '适用场景',
    content: '适合信息展示为主，层级较浅的应用，如企业官网、产品介绍等',
    type: 'primary'
  },
  {
    title: '空间利用',
    content: '充分利用屏幕宽度，适合展示横向内容，如数据统计、图表等',
    type: 'success'
  },
  {
    title: '响应式设计',
    content: '在移动端自动折叠为抽屉式菜单，保持良好的适配性',
    type: 'warning'
  },
  {
    title: '交互体验',
    content: '导航项一目了然，操作直观，用户学习成本低',
    type: 'danger'
  }
]

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const toggleTheme = (value) => {
  // 这里可以集成实际的主题切换逻辑
  document.documentElement.classList.toggle('dark', value)
}
</script>

<style scoped>
.header-layout-example {
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

.demo-section {
  min-height: 300px;
}

:deep(.el-timeline-item__content h4) {
  font-weight: bold;
  margin-bottom: 4px;
}

:deep(.el-card__header) {
  font-weight: bold;
}
</style> 