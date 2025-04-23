<script setup lang="ts">
type OfficialTopListItemType = {
  id: number
  name: string
  coverImgUrl: string
  playCount: number
  tracks: Array<{ first: string, second: string }>
}

const props = defineProps({
  officialTopList: {
    type: Array as () => OfficialTopListItemType[],
    default: () => []
  }
})
</script>

<template>
  <div class="toplist-container">
    <div v-for="item in officialTopList" :key="item.id" class="toplist-item">
      <!-- 左侧图像 -->
      <div class="cover-box">
        <img :src="item.coverImgUrl" alt="cover" class="cover-img" />
        <div class="cover-overlay">
          <el-icon><EpHeadset /></el-icon>
          <span class="play-count">{{ (item.playCount / 100000000).toFixed(1) + "亿" }}</span>
        </div>
      </div>
      <!-- 右侧描述 -->
      <div class="info-box">
        <div class="title">{{ item.name }}</div>
        <div class="track" v-for="(track, index) in item.tracks.slice(0, 3)" :key="index">
          {{ index + 1 }}. {{ track.first }} - {{ track.second }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toplist-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}

.toplist-item {
  display: flex;
  width: 23%;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}
.toplist-item:hover {
  transform: translateY(-2px);
}

.cover-box {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}
.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.cover-overlay {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.info-box {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
}
.track {
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
}
</style>
