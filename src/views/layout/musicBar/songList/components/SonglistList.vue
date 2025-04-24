<script setup lang="ts">

type SonglistItemType = {
  id: number
  name: string
  coverImgUrl: string
  playCount: number
  creator: {userId:number, nickname:string}
}

defineProps({
  songlistList: {
    type: Array as () => SonglistItemType[],
    default: () => []
  }
})
</script>

<template>
  <!-- 歌单列表容器 -->
  <div class="songlist-container">
    <!-- 歌单元素 -->
    <div v-for="item in songlistList" :key="item.id" class="songlist-item">
      <!-- 上侧封面 -->
      <div class="image-container">
        <img :src="item.coverImgUrl" class="image-container-image">
        <div class="image-container-text">
          <el-icon><EpHeadset /></el-icon>
          <span>{{ (item.playCount / 10000).toFixed(1) + "万" }}</span>
        </div>
      </div>
      <!-- 下侧描述 -->
      <div class="songlist-item-info">
        <p class="songlist-name" :title="item.name">{{ item.name }}</p>
        <p class="songlist-creator">{{ item.creator.nickname }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.songlist-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}

.songlist-item {
  width: 11%;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.songlist-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.image-container-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  display: block;
}

.image-container-text {
  position: absolute;
  bottom: 6px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fff;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 2px 6px;
  border-radius: 12px;
}

/* 底部名称显示策略 */
.songlist-item-info {
  padding: 8px;
  color: #333;
  display: flex;
  flex-direction: column;
}

.songlist-name {
  font-size: 14px;
  font-weight: 500;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
  margin-bottom: 2px;
}

.songlist-creator {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>    