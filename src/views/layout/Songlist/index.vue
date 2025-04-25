<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'

// 组件
import SonglistHeader from './components/SonglistHeader.vue'
import SonglistBody from './components/SonglistBody.vue'

// 接口
import { GetSongDetails } from '@/service/songlistApi'

// 数据
const route = useRoute()
const userId = route.params.id

const userStore = useUserStore()
type SonglistDetailsType = {
  id: number
  name: string
  coverImgUrl: string
  createTime: number
  tags: Array<string>
  description: string
  playCount: number
  shareCount: number
  subscribedCount: number
  commentCount: number
  commentThreadId: number
  trackIds: Array<number>
  userId: number
  nickname: string
  avatarUrl: string
}
const songlistDetails = ref<SonglistDetailsType>()
const getSongDetails = () => {
  GetSongDetails(Number(userId))
    .then((res: any) => {
      const playlist = res.playlist
      songlistDetails.value = {
        id: playlist.id,
        name: playlist.name,
        coverImgUrl: playlist.coverImgUrl,
        createTime: playlist.createTime,
        tags: playlist.tags,
        description: playlist.description,
        playCount: playlist.playCount,
        shareCount: playlist.shareCount,
        subscribedCount: playlist.subscribedCount,
        commentCount: playlist.commentCount,
        commentThreadId: playlist.commentThreadId,
        trackIds: playlist.trackIds.map((item: any) => item.id),
        userId: playlist.creator.userId,
        nickname: playlist.creator.nickname,
        avatarUrl: playlist.creator.avatarUrl
      }
    })
    .catch(console.error)
}

// 初始化
onBeforeMount(() => {
  getSongDetails()
})


// 事件提供
const playAllSong = () => {
  userStore.removeMusic(-1)
  if (songlistDetails.value){
    userStore.addMusic(songlistDetails.value.trackIds)
  }

}

</script>
<template>
  <div>
    <!-- 歌单页面头部 -->
    <div>
      <SonglistHeader :songlist-header-info="songlistDetails" @play-all-song="playAllSong"></SonglistHeader>
    </div>
    <!-- 歌单页面主体 -->
    <div>
      <SonglistBody :songlist-body-info="songlistDetails"></SonglistBody>
    </div>
  </div>
</template>
<style scoped>

</style>
