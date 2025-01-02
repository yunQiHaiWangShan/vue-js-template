<template>
  <div class="user-page">
    <!-- 使用基础按钮组件 -->
    <div class="operation-bar">
      <BaseButton @click="handleAdd">添加用户</BaseButton>
      <BaseButton type="primary" :loading="refreshLoading" @click="refreshList">
        刷新
      </BaseButton>
    </div>

    <!-- 使用业务组件 -->
    <el-row :gutter="20" class="user-list">
      <el-col :span="8" v-for="user in userList" :key="user.id">
        <UserInfo
          :user-info="user"
          :editable="true"
          @edit="handleEdit"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { userApi } from '@/api/modules/user'
import { handleError } from '@/utils/request/error'

const { showError, showSuccess } = useMessage()

// 使用请求组合函数
const { 
  data: userList, 
  loading: refreshLoading, 
  execute: fetchUsers 
} = useRequest(() => userApi.getUserList({ page: 1, pageSize: 10 }), {
  immediate: true,
  onError: handleError
})

// 处理添加用户
const handleAdd = async () => {
  try {
    await userApi.createUser({
      username: '新用户',
      email: 'new@example.com',
      role: '普通用户'
    })
    showSuccess('添加成功')
    await fetchUsers()
  } catch (error) {
    handleError(error)
  }
}

// 处理编辑用户
const handleEdit = async (user) => {
  try {
    await userApi.updateUser(user.id, user)
    showSuccess('编辑成功')
    await fetchUsers()
  } catch (error) {
    handleError(error)
  }
}

// 刷新列表
const refreshList = async () => {
  try {
    await fetchUsers()
    showSuccess('刷新成功')
  } catch (error) {
    handleError(error)
  }
}
</script>

<style scoped>
.user-page {
  padding: 20px;
}

.operation-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.user-list {
  margin-top: 20px;
}
</style> 