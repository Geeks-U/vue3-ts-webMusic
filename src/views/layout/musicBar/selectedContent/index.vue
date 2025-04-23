<script setup lang="ts">
import { ref } from 'vue'

// 组件
import PrivateContentList from './components/PrivateContentList.vue'
import DjProgramtList from './components/DjProgramtList.vue'
import MvList from './components/MvList.vue'

// 接口
import { GetPrivateContentList, GetDjProgram, GetMVList } from '@/service/musicBar/selectedContent'

// 节目
type PrivateContentListItemType = {
  id: number
  name: string
  picUrl: string
}
const privateContentList = ref<PrivateContentListItemType[]>([])
const getPrivateContentList = async () => {
  GetPrivateContentList()
    .then((res:any) => {
      privateContentList.value = res.result.map((item: any) => ({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl
      }))
    })
    .catch((err) => {
      console.log('错误', err)
    })
}

// 电台
type DjProgramtListItemType = {
  id: number
  name: string
  picUrl: string
}
const djProgramList = ref<DjProgramtListItemType[]>([])
const getDjProgramtList = async () => {
  GetDjProgram()
    .then((res:any) => {
      djProgramList.value = res.result.map((item: any) => ({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl
      }))
    })
    .catch((err) => {
      console.log('错误', err)
    })
}

// MV
type MvItemType = {
  id: number
  name: string
  picUrl: string
  artist: string
  playCount: number
}
const mvList = ref<MvItemType[]>([])
const getMvList = async () => {
  GetMVList()
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
  getPrivateContentList()
  getDjProgramtList()
  getMvList()
}
init()
</script>
<template>
  <div>
    <!-- 独家 -->
    <div>
      <h1>独家</h1>
      <PrivateContentList :private-content-list="privateContentList"></PrivateContentList>
    </div>
    <!-- 电台 -->
    <div>
      <h1>电台</h1>
      <DjProgramtList :dj-program-list="djProgramList"></DjProgramtList>
    </div>
    <!-- mv -->
    <div>
      <h1>mv</h1>
      <MvList :mv-list="mvList"></MvList>
    </div>
  </div>
</template>
<style scoped>

</style>
