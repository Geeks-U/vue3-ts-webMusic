<script setup lang="ts">
type SongItemType = {
  id: number
  name: string
  picUrl: string
  artist: string
}
const props = defineProps({
  songlist: {
    type: Array as () => SongItemType[],
    default: () => []
  }
})

</script>

<template>
  <div class="song-list-container">
    <div v-for="item in songlist" :key="item.id" class="song-item">
      <img :src="item.picUrl" class="song-img" />
      <div class="song-info">
        <span class="song-name">{{ item.name }}</span>
        <span class="song-artist">{{ item.artist }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.song-list-container {
  display: flex;
  flex-wrap: wrap; /* 如果不加这个，元素太多会溢出一行 */
  gap: 16px;
}

.song-item {
  display: flex;
  align-items: center;
  width: 250px; /* 固定宽度，方便控制 */
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fafafa;
}

.song-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 12px;
}

.song-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.song-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
}

.song-artist {
  font-size: 14px;
  color: #666;
}
</style>
