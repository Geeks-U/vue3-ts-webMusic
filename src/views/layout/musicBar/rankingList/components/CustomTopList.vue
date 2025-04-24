<script setup lang="ts">
type CustomTopListItemType = {
  id: number
  name: string
  coverImgUrl: string
}

defineProps({
  customTopList: {
    type: Array as () => CustomTopListItemType[],
    default: () => []
  }
})
</script>

<template>
  <div class="custom-top-list">
    <div
      v-for="item in customTopList"
      :key="item.id"
      class="list-item"
    >
      <!-- 封面图 -->
      <div class="cover">
        <img :src="item.coverImgUrl" alt="cover" />
      </div>
      <!-- 榜单名 -->
      <div class="title">{{ item.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.custom-top-list {
  display: flex;
  flex-wrap: wrap; /* 超出自动换行 */
  gap: 16px;
  padding: 12px;
}


.list-item {
  width: 8%;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;
}
.list-item:hover {
  transform: translateY(-4px);
}

.cover img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
}

.title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
