<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'

// 组件
import ArtistsList from './components/ArtistsList.vue'

// 接口
import { GetArtistsList } from '@/service/musicBar/artistCategory'

const typeList = [
  { index: -1, label: '全部' },
  { index: 1, label: '男歌手' },
  { index: 2, label: '女歌手' },
  { index: 3, label: '乐队' }
]
const areaList = [
  { index: -1, label: '全部' },
  { index: 7, label: '华语' },
  { index: 96, label: '欧美' },
  { index: 8, label: '日本' },
  { index: 16, label: '韩国' },
  { index: 0, label: '其他' }
]
const initialList = [
  { index: -1, label: '热门' },
  { index: 'a', label: 'A' },
  { index: 'b', label: 'B' },
  { index: 'c', label: 'C' },
  { index: 'd', label: 'D' },
  { index: 'e', label: 'E' },
  { index: 'f', label: 'F' },
  { index: 'g', label: 'G' },
  { index: 'h', label: 'H' },
  { index: 'i', label: 'I' },
  { index: 'j', label: 'J' },
  { index: 'k', label: 'K' },
  { index: 'l', label: 'L' },
  { index: 'm', label: 'M' },
  { index: 'n', label: 'N' },
  { index: 'o', label: 'O' },
  { index: 'p', label: 'P' },
  { index: 'q', label: 'Q' },
  { index: 'r', label: 'R' },
  { index: 's', label: 'S' },
  { index: 't', label: 'T' },
  { index: 'u', label: 'U' },
  { index: 'v', label: 'V' },
  { index: 'w', label: 'W' },
  { index: 'x', label: 'X' },
  { index: 'y', label: 'Y' },
  { index: 'z', label: 'Z' },
  { index: 0, label: '#' }
]
type queryParamsType = {
  type: number
  area: number
  initial: string | number
  offset: number
  limit: number
}
const queryParams = ref<queryParamsType>({
  type: typeList[0].index,
  area: areaList[0].index,
  initial: initialList[0].index,
  offset: 0,
  limit: 30
})
// 标记后台是否还有更多数据
const moreArtistData = ref(true)
// 监听 查询参数 变化，立即触发
watch(
  () => [
    queryParams.value.type,
    queryParams.value.area,
    queryParams.value.initial
  ] as [number, number, string | number],
  (newValues: [number, number, string | number]) => {
    getArtistsList({
      type: newValues[0],
      area: newValues[1],
      initial: newValues[2],
      offset: 0,
      limit: 30
    }, false)
  }
)


type ArtistListItemType = {
  id: number
  name: string
  picUrl: string
}
const artistList = ref<ArtistListItemType[]>([])
const getArtistsList = async (query:queryParamsType, isAccum:boolean) => {
  GetArtistsList(query)
    .then((res:any) => {
      moreArtistData.value = res.more
      if (!isAccum){
        artistList.value = res.artists.map((item: ArtistListItemType) => {
          return {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl
          }
        })
      } else {
        artistList.value = [...artistList.value, ...res.artists.map((item: ArtistListItemType) => {
          return {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl
          }
        })]
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 加载更多数据
const getMoreArtistData = () => {
  queryParams.value.offset += queryParams.value.limit
  getArtistsList(queryParams.value, true)
}
// 进入页面加载一次数据
const init = () => {
  getArtistsList(queryParams.value, false)
}

onBeforeMount(() => {
  init()
})
</script>

<template>
  <div>
    <div>
      <div>
        <el-radio-group v-model="queryParams.type">
          <el-radio v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.index" />
        </el-radio-group>
      </div>
      <div>
      <el-radio-group v-model="queryParams.area">
        <el-radio v-for="(item,index) in areaList" :key="index" :label="item.label" :value="item.index" />
      </el-radio-group>
      </div>
      <div>
        <el-radio-group v-model="queryParams.initial">
          <el-radio v-for="(item,index) in initialList" :key="index" :label="item.label" :value="item.index" />
        </el-radio-group>
      </div>
    </div>
    <div>
      <ArtistsList :artist-list="artistList"></ArtistsList>
    </div>
    <div>
      <span v-if="moreArtistData" @click="getMoreArtistData">加载更多...</span>
      <span v-else>加载完成.</span>
    </div>
  </div>
</template>
<style scoped>

</style>