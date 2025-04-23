<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/index'

// 模拟数据
const userStore = useUserStore()
const searchInput = ref('')

</script>

<template>
  <div class="main-container">
    <!-- 左侧导航 -->
    <div class="left-menu">
      <h5>在线音乐</h5>
      <el-menu router default-active="/home" mode="vertical">
        <el-menu-item index="/home/recommend">推荐</el-menu-item>
        <el-menu-item index="/home/musicBar">音乐馆</el-menu-item>
        <el-menu-item index="/home/video">视频</el-menu-item>
        <el-menu-item index="/home/radioStation">电台</el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容 -->
    <div class="right-content">
      <!-- 顶部栏 -->
      <div class="top-bar">
        <el-input 
          v-model="searchInput" 
          placeholder="搜索音乐" 
          class="search-input"
        >
          <template #prefix>
            <el-icon><EpSearch /></el-icon>
          </template>
        </el-input>
        
        <div class="user-info">
          <el-avatar :size="32" :src="userStore.profile.avatarUrl" />
          <span>{{ userStore.profile.nickname }}</span>
        </div>
      </div>

      <!-- 主要内容 -->
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
}

.left-menu {
  width: 240px;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
}

.left-menu h5 {
  padding: 24px 24px 16px;
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.left-menu :deep(.el-menu) {
  border-right: none;
}

.left-menu :deep(.el-menu-item) {
  height: 48px;
  line-height: 48px;
  font-size: 14px;
}

.left-menu :deep(.el-menu-item:hover) {
  background: #f5f5f5;
}

.left-menu :deep(.el-menu-item.is-active) {
  color: #409eff;
  background: #ecf5ff;
}

.right-content {
  flex: 1;
  min-width: 0;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 20px;
  background: #f5f5f5;
  box-shadow: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info span {
  font-size: 14px;
  color: #333;
}

.main-content {
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  min-height: calc(100vh - 120px);
}
</style>