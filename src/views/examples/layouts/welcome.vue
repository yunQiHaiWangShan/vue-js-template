<template>
  <div class="layout-welcome">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <span>布局系统介绍</span>
        </div>
      </template>
      <el-alert
        title="切换布局演示"
        type="success"
        description="请点击左侧菜单中的不同布局选项，体验不同的布局效果。每个布局都会展示其特有的功能和使用场景。"
        :closable="false"
        class="mb-4"
      />
      
      <el-divider>可用布局</el-divider>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover" class="layout-card">
            <template #header>
              <div class="layout-title">
                <el-icon><Grid /></el-icon>
                侧边栏布局
              </div>
            </template>
            <div class="layout-preview sidebar-preview">
              <div class="preview-sidebar"></div>
              <div class="preview-content">
                <div class="preview-header"></div>
                <div class="preview-main"></div>
              </div>
            </div>
            <div class="layout-features">
              <p>适用场景：</p>
              <ul>
                <li>层级较深的导航结构</li>
                <li>需要展示大量分类信息</li>
                <li>后台管理系统</li>
              </ul>
              <el-link type="primary" :underline="false" @click="goToDemo('sidebar-demo')">
                查看示例 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
              </el-link>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card shadow="hover" class="layout-card">
            <template #header>
              <div class="layout-title">
                <el-icon><Menu /></el-icon>
                顶部导航布局
              </div>
            </template>
            <div class="layout-preview header-preview">
              <div class="preview-header-nav"></div>
              <div class="preview-content">
                <div class="preview-main"></div>
              </div>
            </div>
            <div class="layout-features">
              <p>适用场景：</p>
              <ul>
                <li>导航层级较浅</li>
                <li>注重内容展示的应用</li>
                <li>企业官网等展示型网站</li>
              </ul>
              <el-link type="primary" :underline="false" @click="goToDemo('header-demo')">
                查看示例 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
              </el-link>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { Grid, Menu, ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDemo = (path) => {
  router.push(`/examples/${path}`)
}
</script>

<style scoped>
.layout-welcome {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.mb-4 {
  margin-bottom: 16px;
}

.layout-card {
  height: 100%;
}

.layout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.layout-preview {
  height: 200px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  margin: 16px 0;
  position: relative;
  overflow: hidden;
}

.preview-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  background: #545c64;
}

.preview-header-nav {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 40px;
  background: #545c64;
}

.preview-content {
  position: absolute;
  inset: 0 0 0 60px;
  padding: 12px;
  background: #f5f7fa;
}

.header-preview .preview-content {
  left: 0;
  top: 40px;
}

.preview-header {
  height: 20px;
  background: #e4e7ed;
  border-radius: 4px;
  margin-bottom: 12px;
}

.preview-main {
  height: calc(100% - 32px);
  background: #fff;
  border-radius: 4px;
}

.layout-features {
  margin-top: 16px;
}

.layout-features p {
  font-weight: bold;
  margin-bottom: 8px;
}

.layout-features ul {
  margin: 0 0 16px 20px;
  padding: 0;
  color: #606266;
}

.layout-features li {
  margin-bottom: 4px;
}
</style> 