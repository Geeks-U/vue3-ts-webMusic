<script setup lang="ts">
// 定义单个图片项的类型
type imgType = {
  imageUrl: string
  url: string
  id?: string
};

// 定义 props
const props = defineProps({
  // 定义 imgList 属性，类型为 imgType 数组
  imgList: {
    type: Array as () => imgType[],
    default: () => []
  }
})

</script>
<template>
  <el-carousel :autoplay=true :interval="3000"  class="carousel-wrapper" arrow="never">
    <el-carousel-item v-for="(item, index) in imgList" :key="index">
      <a :href="item.url" target="_blank">
        <img :src="item.imageUrl" class="carousel-img" />
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.carousel-wrapper {
  margin: 20px auto;
  max-width: 800px;
}

.carousel-img {
  width: 100%;
  object-fit: cover; /* 保持比例裁剪填满 */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.carousel-img:hover {
  transform: scale(1.03);
}
</style>
