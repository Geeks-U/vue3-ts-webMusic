<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeMount } from 'vue'

// 组件导入
import Banner from './components/Banner.vue'
import SonglistList from './components/SonglistList.vue'
import SongList from './components/SongList.vue'
import MvList from './components/MvList.vue'

// 接口导入
import { getBanner, getSonglist, getNewSongList, getMVList } from '@/service/recommend'


type BannerItemType = {
  imageUrl: string
  url: string
  id?: string
}
const bannerList = ref<BannerItemType[]>([])
const getBannerList = async () => {
  getBanner()
    .then((res:any) => {
      bannerList.value = res.banners
        .filter((item: BannerItemType) => item.url!== null)
        .map((item: BannerItemType) => ({
          imageUrl: item.imageUrl,
          url: item.url as string // 由于前面已经过滤掉了 null，这里可以断言为 string 类型
        }))
    })
    .catch((err) => {
      console.log(err)
    })
}

type SonglistItemType = {
  id: number
  name: string
  picUrl: string
  playCount: number
}
const songlistList = ref<SonglistItemType[]>([])
const getSonglistList = async () => {
  getSonglist(8)
    .then((res:any) => {
      songlistList.value = res.result.map((item: SonglistItemType) => ({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl,
        playCount: item.playCount
      }))
    })
    .catch((err) => {
      console.log(err)
    })
}

type SongItemType = {
  id: number
  name: string
  picUrl: string
  artist: string
}

const songList = ref<SongItemType[]>([])
const getSongList = async () => {
  getNewSongList(10)
    .then((res:any) => {
      songList.value = res.result.map((item: any) => ({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl,
        artist: item.song.artists[0].name
      }))
    })
    .catch((err) => {
      console.log(err)
    })
}

type MVItemType = {
  id: number
  name: string
  picUrl: string
  artist: string
  playCount: number
}
const mvList = ref<MVItemType[]>([])
const getMvList = async () => {
  getMVList(10)
    .then((res:any) => {
      mvList.value = res.result.map((item: any) => ({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl,
        artist: item.artists[0].name,
        playCount: item.playCount
      }))
    })
    .catch((err) => {
      console.log(err)
    })
}

const init = () => {
  getBannerList()
  getSonglistList()
  getSongList()
  getMvList()
}

// 页面加载前获取数据
onBeforeMount(() => {
  init()
})

</script>
<template>
  <div>
    <!-- 轮播图 -->
    <div>
      <h1>近期活动</h1>
      <Banner :img-list="bannerList"></Banner>
    </div>
    <!-- 推荐歌单 -->
    <div>
      <h1>推荐歌单</h1>
      <SonglistList :songlist-list="songlistList"></SonglistList>
    </div>
    <!-- 推荐音乐 -->
    <div>
      <h1>专属音乐</h1>
      <SongList :songlist="songList"></SongList>
    </div>
    <!-- 推荐MV -->
    <div>
      <h1>推荐MV</h1>
      <MvList :mv-list="mvList"></MvList>
    </div>
  </div>
</template>

<style scoped>

</style>
