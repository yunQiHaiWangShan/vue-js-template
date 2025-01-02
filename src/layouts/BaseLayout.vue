<template>
  <div class="base-layout">
    <transition name="fade-slide" mode="out-in">
      <component :is="currentLayoutComponent">
        <template #default>
          <slot></slot>
        </template>
      </component>
    </transition>
  </div>
</template>

<script setup>
import SidebarLayout from './SidebarLayout.vue'
import HeaderLayout from './HeaderLayout.vue'

const layoutStore = useLayoutStore()
const currentLayoutComponent = computed(() => {
  switch (layoutStore.currentLayout) {
    case 'header':
      return HeaderLayout
    case 'sidebar':
    default:
      return SidebarLayout
  }
})
</script>

<style scoped>
.base-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* 布局切换动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style> 