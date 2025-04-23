<script setup lang="ts">
import { ref } from 'vue'

// 组件
import OfficialTopList from './components/OfficialTopList.vue'
import CustomTopList from './components/CustomTopList.vue'

// 接口
import { GetTopList } from '@/service/musicBar/songListRank'

// 节目
type OfficialTopListItemType = {
  id: number
  name: string
  coverImgUrl: string
  playCount: number
  tracks: Array<{first:string, second:string}>
}
type CustomTopListItemType = {
  id: number
  name: string
  coverImgUrl: string
}
const officialTopList = ref<OfficialTopListItemType[]>([])
const customTopList = ref<CustomTopListItemType[]>([])
const getTopList = async () => {
  GetTopList()
    .then((res:any) => {
      res.list.forEach((item:any) => {
        if (item.tracks.length !== 0){
          officialTopList.value.push(
            {
              id: item.id,
              name: item.name,
              coverImgUrl: item.coverImgUrl,
              playCount: item.playCount,
              tracks: item.tracks
            }
          )
        } else {
          customTopList.value.push({
            id: item.id,
            name: item.name,
            coverImgUrl: item.coverImgUrl
          })
        }
      })
      console.log(officialTopList)
      console.log(customTopList)
    })
    .catch((err) => {
      console.log('错误', err)
    })
}

const init = () => {
  getTopList()
}
init()

</script>
<template>
  <div>
    <!-- 官方榜单 -->
    <div>
      <h1>官方榜单</h1>
      <OfficialTopList :official-top-list="officialTopList"></OfficialTopList>
    </div>
    <!-- 用户榜单 -->
     <div>
      <h1>用户榜单</h1>
      <CustomTopList :custom-top-list="customTopList"></CustomTopList>
     </div>
  </div>
</template>
<style scoped>

</style>
