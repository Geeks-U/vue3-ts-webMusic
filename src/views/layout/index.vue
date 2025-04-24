<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useUserStore } from '@/stores/index'

// 组件导入
import MusicPlayer from './components/MusicPlayer.vue'

// 接口
import { GetSongPlayurl, GetSongDetails } from '@/service/layout'

// 数据
const userStore = useUserStore()
const searchInput = ref('')
type MusicItemType = {
  musicId: number
  musicName: string
  musicUrl: string
  musicCoverImg: string
  musicAuthorId: number
  musicAuthorName: string
  collected: boolean
}
// 音乐id
const musicIds = userStore.musicPlaylist
const musicList = ref<MusicItemType[]>([])
const getSongInfo = (ids:number[]) => {
  let tempList:MusicItemType[] = []
  GetSongPlayurl(ids)
    .then((res_one:any) => {
      GetSongDetails(ids)
        .then((res_two:any) => {
          for (let index = 0; index < ids.length; index++) {
            tempList.push({
              musicId: res_one.data[index].id,
              musicUrl: res_one.data[index].url,
              musicName: res_two.songs[index].al.name,
              musicCoverImg: res_two.songs[index].al.picUrl,
              musicAuthorId: res_two.songs[index].ar[0].id,
              musicAuthorName: res_two.songs[index].ar[0].name,
              collected: false
            })
          }
          musicList.value = tempList
        })
        .catch((res) => {
          console.log('GetSongDetails: ', res)
        })
    })
    .catch((res) => {
      console.log('GetSongPlayurl: ', res)
    })
}

onBeforeMount(() => {
  // 获取播放列表数据
  getSongInfo(musicIds)
})

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
      <!-- 底部播放器 数据获取之后再渲染 -->
      <div class="bottom-player" v-if="musicList.length!==0">
        <MusicPlayer :song-list="musicList"></MusicPlayer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
  /* --left-menu-width-percentage: 7%; 定义左侧菜单宽度百分比的 CSS 变量 */
  --left-menu-min-width: 120px; /* 定义左侧菜单最小宽度的 CSS 变量 */
}

.left-menu {
  width: var(--left-menu-min-width); /* 使用 max 函数确保宽度不小于最小宽度 */
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
  background: #ffffff;
  width: 100vw - var(--left-menu-min-width);
  position: relative; /* 为了让主要内容在底部播放器上方 */
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
  /* padding: 13px; */
  background: #fff;
  border-radius: 8px;
  min-height: calc(100vh - 120px); /* 调整高度以适应底部播放器 */
}
</style>    