<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

// 组件
import SongList from './SongList.vue'
import CommentList from './CommentList.vue'
import HotCommentsList from './HotCommentsList.vue'

// 接口
import { GetSongDetails } from '@/service/songApi'
import { GetSonglistCommentList } from '@/service/songlistApi'

type SonglistBodyInfoType = {
  id: number

  commentCount: number
  commentThreadId: number
  trackIds: Array<number>
}

const props = defineProps({
  songlistBodyInfo: {
    type: Object as () => SonglistBodyInfoType,
    default: undefined
  }
})

// 默认选择歌曲列表
const selectedItemIndex = ref('songlist')
interface SongItem {
  songId: number
  songName: string
  alId: number
  alName: string
  arId: number
  arName: string
}
const songList = ref<SongItem[]>([])
const getSongDetails = () => {
  GetSongDetails(props.songlistBodyInfo?.trackIds)
    .then((res:any) => {
      songList.value = res.songs.map((item:any) => {
        return {
          songId: item.id,
          songName: item.name,
          alId: item.al.id,
          alName: item.al.name,
          arId: item.ar[0].id,
          arName: item.ar[0].name
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

interface SonglistCommentListItem {
  more: boolean
  moreHot: boolean
  comments: Array<{
    commentId:number,
    content:string,
    userId: number,
    nickname: string,
    userAvatarUrl: string,
    time: number,
    ipLocation: string,
    liked: boolean,
    likedCount: number
  }>
  hotComents: Array<{
    commentId:number,
    content:string,
    userId: number,
    nickname: string,
    userAvatarUrl: string,
    time: number,
    ipLocation: string,
    liked: boolean,
    likedCount: number
  }>
}
const songlistCommentList = ref<SonglistCommentListItem>({
  more: false,
  moreHot: false,
  comments: [],
  hotComents: []
})
const getSonglistCommentList = () => {
  GetSonglistCommentList(props.songlistBodyInfo?.id)
    .then((res:any) => {
      songlistCommentList.value.more = res.more
      songlistCommentList.value.moreHot = res.moreHot
      songlistCommentList.value.hotComents = res.hotComments.map((item: any) => {
        return {
          commentId: item.commentId,
          content: item.content,
          userId: item.user.userId,
          nickname: item.user.nickname,
          userAvatarUrl: item.user.avatarUrl,
          time: item.time,
          ipLocation: item.ipLocation?.location || '',
          liked: item.liked,
          likedCount: item.likedCount
        }
      })
      songlistCommentList.value.comments = res.comments.map((item: any) => {
        return {
          commentId: item.commentId,
          content: item.content,
          userId: item.user.userId,
          nickname: item.user.nickname,
          userAvatarUrl: item.user.avatarUrl,
          time: item.time,
          ipLocation: item.ipLocation?.location || '',
          liked: item.liked,
          likedCount: item.likedCount
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  // 初始化
  getSongDetails()
  getSonglistCommentList()
  // 监听参数变化
  watch(() => props.songlistBodyInfo?.trackIds, () => { getSongDetails() })
})
</script>

<template>
  <div>
    <!-- 导航 -->
    <div>
      <el-menu
        mode="horizontal"
        :default-active="selectedItemIndex"
        @select="(key: string) => selectedItemIndex = key"
      >
        <el-menu-item index="songlist">
          <span>歌曲</span>
          <span v-if="songlistBodyInfo">{{ songlistBodyInfo.trackIds.length }}</span>
        </el-menu-item>
        <el-menu-item index="commentlist">
          <span>评论</span>
          <span v-if="songlistBodyInfo">{{ songlistBodyInfo.commentCount }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div v-if="songlistBodyInfo">
      <!-- 歌单歌曲列表 -->
      <div v-if="selectedItemIndex === 'songlist'">
        <SongList :song-list="songList"></SongList>
      </div>

      <!-- 歌单评论列表 -->
      <div v-if="selectedItemIndex === 'commentlist'">
        <HotCommentsList :songlist-comment-list="songlistCommentList"></HotCommentsList>
        <CommentList :songlist-comment-list="songlistCommentList"></CommentList>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 可以根据需要添加样式 */
</style>
