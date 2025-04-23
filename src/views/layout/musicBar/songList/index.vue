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
      <el-radio-group v-model="selectedTag">
        <el-radio-button
          v-for="(item, index) in tagList"
          :key="index"
          :label="item.name"
          :value="item.name"
        />
      </el-radio-group>
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
/* 标签选择区域样式优化 */
.tag-selector {
  margin: 24px 0;
  display: flex;
  justify-content: center;
}

/* 让 el-radio-group 内部灵活换行且居中 */
.el-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* 美化按钮本体 */
.el-radio-button {
  border-radius: 20px;
  overflow: hidden;
}

/* 默认状态按钮 */
.el-radio-button__inner {
  padding: 6px 18px;
  border-radius: 20px;
  background-color: #f5f7fa;
  color: #606266;
  font-size: 14px;
  transition: all 0.3s;
}

/* 选中状态按钮 */
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #409EFF;
  color: #fff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.4);
}

/* hover效果 */
.el-radio-button__inner:hover {
  background-color: #e0ecff;
  color: #409EFF;
}
</style>
