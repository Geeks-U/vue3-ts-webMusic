<script setup lang="ts">


type SonglistItemType = {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
};

const props = defineProps({
  songlistList: {
    type: Array as () => SonglistItemType[],
    default: () => []
  }
})
</script>

<template>
  <div class="songlist-container">
    <el-card style="max-width: 480px" v-for="item in songlistList" :key="item.id">
      <div class="image-container">
        <img :src="item.picUrl" class="image-container-image">
        <div class="image-container-text">
          <el-icon><EpHeadset /></el-icon>
          <span>{{ (item.playCount / 10000) + "万" }}</span>
        </div>
      </div>
      <div><span>{{ item.name }}</span></div>
    </el-card>
  </div>
</template>

<style scoped>
.songlist-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 每行显示三个元素 */
  gap: 20px; /* 元素之间的间距 */
}

.image-container {
  position: relative;
}

.image-container-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.image-container-text {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>    