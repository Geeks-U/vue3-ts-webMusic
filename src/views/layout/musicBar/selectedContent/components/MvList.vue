<script setup lang="ts">

type MVItemType = {
  id: number
  name: string
  picUrl: string
  artist: string
  playCount: number
}

defineProps({
  mvList: {
    type: Array as () => MVItemType[],
    default: () => []
  }
})
</script>

<template>
  <div class="mv-container">
    <div v-for="item in mvList" :key="item.id" class="mv-item">
      <div class="mv-image-wrapper">
        <img :src="item.picUrl" class="mv-image" />
        <div class="mv-play-info">
          <el-icon><EpHeadset /></el-icon>
          <span>{{ (item.playCount / 10000).toFixed(1) + "万" }}</span>
        </div>
      </div>
      <div class="mv-info">
        <span class="mv-name">{{ item.name }}</span>
        <span class="mv-artist">{{ item.artist }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mv-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.mv-item {
  width: 360px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
}

.mv-item:hover {
  transform: scale(1.05); /* 鼠标悬停时放大 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 鼠标悬停时添加阴影 */
}

.mv-image-wrapper {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.mv-image {
  width: 100%;
  height: auto;
  display: block;
}

.mv-play-info {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.mv-info {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
}

.mv-name {
  font-weight: 500;
}

.mv-artist {
  color: #666;
}
</style>