<template>
  <div class="user-info">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户信息</span>
          <el-button v-if="editable" type="primary" link @click="handleEdit">
            编辑
          </el-button>
        </div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="用户名">
          {{ userInfo.username }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          {{ userInfo.email }}
        </el-descriptions-item>
        <el-descriptions-item label="角色">
          {{ userInfo.role }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
/**
 * 用户信息组件
 * @props {Object} userInfo - 用户信息
 * @props {boolean} editable - 是否可编辑
 * @emits {function} edit - 编辑事件
 */
const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit'])

const handleEdit = () => {
  emit('edit', props.userInfo)
}
</script>

<style scoped>
.user-info {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 