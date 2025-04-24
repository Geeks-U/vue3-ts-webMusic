<script setup lang="ts">
// 定义单个图片项的类型
type imgType = {
  imageUrl: string
  url: string
  id?: string
};

// 定义 props
defineProps({
  // 定义 imgList 属性，类型为 imgType 数组
  imgList: {
    type: Array as () => imgType[],
    default: () => []
  }
})

</script>

<template>
  <div class="img-container">
    <div v-for="(item, index) in imgList.slice(0, 3)" :key="index" class="img-item">
      <a :href="item.url" target="_blank">
        <img :src="item.imageUrl" class="carousel-img" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.img-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 20px auto;
}

.img-item {
  width: 32%;
}

.carousel-img {
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.carousel-img:hover {
  transform: scale(1.03);
}
</style>
