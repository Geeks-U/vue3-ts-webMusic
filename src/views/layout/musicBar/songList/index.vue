<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'

// 组件
import SonglistList from './components/SonglistList.vue'

// 接口
import { GetPlaylistTagList, GetPlaylistList } from '@/service/musicBar/songList'

// 标签类型
type TagitemType = {
  id: number
  name: string
}

// 标签获取 已选中标签
const tagList = ref<TagitemType[]>([{ id: -1, name: '全部' }])
const selectedTag = ref<string>('')

// 标签选择监听
watch(() => selectedTag.value, (newValue: string) => {
  getPlaylistList({ limit: 30, before: 0, cat: newValue }, false)
})

const getPlaylistTagList = () => {
  GetPlaylistTagList()
    .then((res: any) => {
      tagList.value = [...tagList.value, ...res.tags.map((item: TagitemType) => ({
        name: item.name
      }))]
      selectedTag.value = tagList.value[0].name
    })
    .catch((err) => {
      console.log(err)
    })
}

// 歌单列表查询参数
type QueryParamsType = {
  limit: number
  before: number
  cat: string
}

const queryParams = ref<QueryParamsType>({
  limit: 30,
  before: 0,
  cat: '全部'
})

const morePlaylistData = ref(true)
const lasttime = ref(null)

type SonglistItemType = {
  id: number
  name: string
  coverImgUrl: string
  playCount: number
  creator: { userId: number, nickname: string }
}

const songlistList = ref<SonglistItemType[]>([])

const getPlaylistList = (query: QueryParamsType, accum: boolean) => {
  GetPlaylistList(query)
    .then((res: any) => {
      morePlaylistData.value = res.more
      lasttime.value = res.lasttime
      if (!accum) {
        songlistList.value = res.playlists.map((item: SonglistItemType) => ({
          id: item.id,
          name: item.name,
          coverImgUrl: item.coverImgUrl,
          playCount: item.playCount,
          creator: { userId: item.creator.userId, nickname: item.creator.nickname }
        }))
      } else {
        songlistList.value = [
          ...songlistList.value,
          ...res.playlists.map((item: SonglistItemType) => ({
            id: item.id,
            name: item.name,
            coverImgUrl: item.coverImgUrl,
            playCount: item.playCount,
            creator: { userId: item.creator.userId, nickname: item.creator.nickname }
          }))
        ]
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const init = () => {
  getPlaylistTagList()
}

onBeforeMount(() => {
  init()
})

const getMoreSonglistList = () => {
  getPlaylistList({ ...queryParams.value, before: lasttime.value as unknown as number }, true)
}
</script>

<template>
  <div>
    <!-- 标签选择区域 -->
    <div class="tag-selector">
      <div class="tag-buttons">
        <button
          v-for="(item, index) in tagList"
          :key="index"
          :class="['tag-button', { active: item.name === selectedTag }]"
          @click="selectedTag = item.name"
        >
          {{ item.name }}
        </button>
      </div>
    </div>

    <!-- 歌单列表 -->
    <div>
      <SonglistList :songlist-list="songlistList" />
    </div>

    <!-- 加载更多 -->
    <div>
      <span v-if="morePlaylistData" @click="getMoreSonglistList">加载更多数据...</span>
      <span v-else>数据加载完毕</span>
    </div>
  </div>
</template>


<style scoped>
.tag-selector {
  margin: 24px 0;
}

.tag-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-button {
  border-radius: 6px;
  background-color: #e0e0e0;
  color: #424447;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 130px;
  width: 9%; /* 固定按钮宽度 */
  text-align: center; /* 文本居中 */
}

.tag-button:hover {
  background-color: #d0d0d0;
  color: #2d8cf0;
  transform: translateY(-2px);
}

.tag-button.active {
  background-color: #2d8cf0;
  color: #fff;
  box-shadow: 0 4px 8px rgba(45, 140, 240, 0.4);
  transform: scale(1.05);
}

</style>    