<script setup lang="ts">
type PrivateContentListItemType = {
  id: number
  name: string
  picUrl: string
}

const props = defineProps({
  privateContentList: {
    type: Array as () => PrivateContentListItemType[],
    default: () => []
  }
})

</script>
<template>
  <div class="pc-container">
    <div v-for="item in privateContentList" :key="item.id" class="pc-item">
      <div class="pc-image-wrapper">
        <img :src="item.picUrl" class="pc-image" />
      </div>
      <div class="pc-info">
        <span class="pc-name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pc-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.pc-item {
  width: 30%;
  display: flex;
  flex-direction: column;
}

.pc-image-wrapper {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.pc-image {
  width: 100%;
  height: auto;
  display: block;
}

.pc-info {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
}

.pc-name {
  font-weight: 500;
}
</style>
