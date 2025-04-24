<!-- components/BottomDrawer.vue -->
<template>
  <div class="drawer-overlay">
    <div class="drawer">
      <button class="close-btn" @click="$emit('close')">关闭</button>
      <slot>
        <p>抽屉播放器内容</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// 接收关闭事件由父组件控制显示
defineEmits(['close'])
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
}
.drawer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  animation: slideUp 0.3s ease-out forwards;
  padding: 20px;
  box-sizing: border-box;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
