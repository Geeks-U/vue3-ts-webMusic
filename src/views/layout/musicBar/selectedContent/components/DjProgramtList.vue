<script setup lang="ts">
type DjProgramtListItemType = {
  id: number
  name: string
  picUrl: string
}

defineProps({
  djProgramList: {
    type: Array as () => DjProgramtListItemType[],
    default: () => []
  }
})

</script>
<template>
  <div class="dp-container">
    <div v-for="item in djProgramList" :key="item.id" class="dp-item">
      <div class="dp-image-wrapper">
        <img :src="item.picUrl" class="dp-image" />
      </div>
      <div class="dp-info">
        <span class="dp-name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dp-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.dp-item {
  width: 15%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
}

.dp-item:hover {
  transform: scale(1.05); /* 鼠标悬停时放大 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 鼠标悬停时添加阴影 */
}

.dp-image-wrapper {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.dp-image {
  width: 100%;
  height: auto;
  display: block;
}

.dp-info {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
}

.dp-name {
  font-weight: 500;
}
</style>