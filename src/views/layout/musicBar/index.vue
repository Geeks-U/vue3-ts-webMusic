<script setup lang="ts">

</script>

<template>
  <div class="main-container">
    <div class="menu-container">
      <el-menu router default-active="/home/musicBar" mode="horizontal">
        <el-menu-item index="/home/musicBar/selectedContent">精选</el-menu-item>
        <el-menu-item index="/home/musicBar/rankingList">歌单排行</el-menu-item>
        <el-menu-item index="/home/musicBar/artistCategory">歌手</el-menu-item>
        <el-menu-item index="/home/musicBar/songList">歌单分类</el-menu-item>
        <el-menu-item index="/home/musicBar/digitalAlbum">数字专辑</el-menu-item>
        <el-menu-item index="/home/musicBar/broadcastChannel">有声电台</el-menu-item>
      </el-menu>
    </div>
    <div class="view-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.menu-container {
  background-color: #333;
  color: white;
}

.el-menu {
  border-bottom: none;
}

.el-menu-item {
  transition: background-color 0.3s ease;
}

.el-menu-item:hover {
  background-color: #555;
}

.view-container {
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
}
</style>