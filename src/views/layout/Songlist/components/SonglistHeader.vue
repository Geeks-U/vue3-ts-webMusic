<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

type SonglistHeaderInfoType = {
  id: number
  name: string
  coverImgUrl: string
  createTime: number
  tags: Array<string>
  description: string
  playCount: number
  shareCount: number
  subscribedCount: number

  userId: number
  nickname: string
  avatarUrl: string
}

const props = defineProps({
  songlistHeaderInfo:{
    type: Object as () => SonglistHeaderInfoType,
    default: undefined
  }
})
const emit = defineEmits(['playAllSong'])

const maxLength = 50 // 可根据需要调整最大字数
const formattedDescription = computed(() => {
  if (props.songlistHeaderInfo) {
    let description = props.songlistHeaderInfo.description.replace(/\n/g, '')
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '......'
    }
    return description
  }
  return ''
})
</script>

<template>
  <div v-if="songlistHeaderInfo" class="songlist-header">
    <!-- 左侧封面图 -->
    <div class="cover">
      <img :src="songlistHeaderInfo.coverImgUrl" alt="cover">
    </div>

    <!-- 右侧信息 -->
    <div class="info">
      <!-- 歌单名称 -->
      <h2 class="title">{{ songlistHeaderInfo.name }}</h2>

      <!-- 创建者信息 -->
      <div class="creator">
        <img :src="songlistHeaderInfo.avatarUrl" alt="avatar" class="avatar">
        <span class="nickname">{{ songlistHeaderInfo.nickname }}</span>
        <span class="create-time">{{ new Date(songlistHeaderInfo.createTime).toLocaleDateString() }}</span>
      </div>

      <!-- 标签 -->
      <div class="tags">
        <span v-for="tag in songlistHeaderInfo.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <!-- 描述 -->
      <p class="desc" :title="props.songlistHeaderInfo?.description">{{ formattedDescription }}</p>

      <!-- 操作栏 -->
      <div class="actions">
        <button class="play-btn" @click="emit('playAllSong')">▶ 播放全部</button>

        <!-- 收藏 -->
        <span class="action hover-action">
          <el-icon class="icon-like">
            <MdiHeartOutline />
          </el-icon>
          <el-icon class="icon-like">
            <MdiHeart />
          </el-icon>
          {{ (songlistHeaderInfo.subscribedCount / 10000).toFixed(1) + '万' }}
        </span>

        <!-- 分享 -->
        <span class="action hover-action">
          <el-icon class="icon-share">
            <MdiShare />
          </el-icon>
          {{ songlistHeaderInfo.shareCount }}
        </span>

        <!-- 播放量 -->
        <span class="action hover-action">
          <el-icon class="icon-playcount">
            <MdiHeadphones />
          </el-icon>
          {{ (songlistHeaderInfo.playCount / 10000).toFixed(1) + '万' }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.songlist-header {
  display: flex;
  gap: 24px;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 12px;
  height: 200px;
  box-sizing: border-box;
}

/* 左侧封面区域 */
.cover {
  width: auto;
  height: 100%;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

.cover img {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 右侧信息区域 */
.info {
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
}

/* 创建者信息行 */
.creator {
  display: flex;
  gap: 7px;
  align-items: center;
  margin: 3px 0;
  font-size: 14px;
  color: #666;
}

.creator .avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

/* 标签 */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 3px 0;
}

.tag {
  background-color: #ececec;
  color: #555;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
}

/* 描述 */
.desc {
  font-size: 14px;
  color: #333;
  line-height: 1.1;
  margin: 3px 0;
  white-space: nowrap; /* 文本不换行 */
}

/* 操作栏按钮和统计 */
.actions {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #444;
  margin: 3px 0;
  flex-wrap: wrap;
}

.play-btn {
  background-color: #ec4141;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.play-btn:hover {
  background-color: #d73737;
}

/* hover-action 类和特定图标的效果 */
.hover-action {
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
}

.hover-action:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* 收藏图标效果 */
.icon-like {
  color: #ec4141;
  transition: transform 0.3s ease;
}

.icon-like:hover {
  transform: scale(1.2);
}

/* 分享图标效果 */
.icon-share {
  color: #409eff;
  transition: transform 0.3s ease;
}

.icon-share:hover {
  transform: scale(1.2);
}

/* 播放量图标效果 */
.icon-playcount {
  color: #999;
  transition: transform 0.3s ease;
}

.icon-playcount:hover {
  transform: rotate(10deg);
}
</style>    