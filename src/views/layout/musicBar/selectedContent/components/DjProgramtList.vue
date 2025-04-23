<script setup lang="ts">
type DjProgramtListItemType = {
  id: number
  name: string
  picUrl: string
}

const props = defineProps({
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
  width: 23%;
  display: flex;
  flex-direction: column;
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
