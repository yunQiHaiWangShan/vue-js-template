<template>
  <el-button
    :type="type"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :class="{ 'base-button': true, 'is-link': type === 'link' }"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script setup>
/**
 * 基础按钮组件
 * @props {string} type - 按钮类型，可选值：default/primary/success/warning/info/danger/text/link
 * @props {string} size - 按钮大小，可选值：large/default/small
 * @props {boolean} loading - 是否显示加载状态
 * @props {boolean} disabled - 是否禁用
 * @emits {function} click - 点击事件
 */
const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'primary', 'success', 'warning', 'info', 'danger', 'text', 'link', ''].includes(value)
    }
  },
  size: {
    type: String,
    default: 'default'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  emit('click', event)
}
</script>

<style scoped>
.base-button {
  font-weight: 500;
}

.base-button.is-link {
  padding: 2px 4px;
  height: auto;
  font-weight: 400;
  color: var(--el-color-primary);
}

.base-button.is-link:hover {
  color: var(--el-color-primary-light-3);
  background-color: transparent;
}

.base-button.is-link:active {
  color: var(--el-color-primary-dark-2);
}
</style> 