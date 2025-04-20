<script setup lang="ts">
import { useUserStore } from '@/stores/index'
const userStore = useUserStore()
</script>

<template>
  <div>
    登录状态{{ userStore.account.id === null }}
  </div>
</template>

<style scoped>

</style>
