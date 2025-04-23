<script setup lang="ts">
type ArtistListItemType = {
  id: number
  name: string
  picUrl: string
}

const props = defineProps({
  artistList: {
    type: Array as () => ArtistListItemType[],
    default: () => []
  }
})
</script>

<template>
  <!-- 歌手列表容器 -->
  <div class="artist-list">
    <!-- 歌手 -->
    <div
      class="artist-card"
      v-for="item in artistList"
      :key="item.id"
    >
      <!-- 圆形封面 -->
      <img :src="item.picUrl" alt="artist" class="artist-image" />
      <!-- 名字 -->
      <span class="artist-name">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.artist-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: start;
}

.artist-card {
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.artist-card:hover {
  transform: translateY(-6px);
}

.artist-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.artist-card:hover .artist-image {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.artist-name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: center;
}
</style>
