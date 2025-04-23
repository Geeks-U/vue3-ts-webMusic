<script setup lang="ts">

</script>

<template>
  <div>
    <div>
      <el-menu router default-active="/home/musicBar" mode="horizontal">
        <el-menu-item index="/home/musicBar/selectedContent">精选</el-menu-item>
        <el-menu-item index="/home/musicBar/rankingList">歌单排行</el-menu-item>
        <el-menu-item index="/home/musicBar/artistCategory">歌手</el-menu-item>
        <el-menu-item index="/home/musicBar/songList">歌单分类</el-menu-item>
        <el-menu-item index="/home/musicBar/digitalAlbum">数字专辑</el-menu-item>
        <el-menu-item index="/home/musicBar/broadcastChannel">有声电台</el-menu-item>
      </el-menu>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>

</style>
