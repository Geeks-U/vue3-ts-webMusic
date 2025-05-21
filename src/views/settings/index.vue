<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const apiUrl = ref('')

function saveApiUrl() {
  if (apiUrl.value.trim()) {
    sessionStorage.setItem('apiUrl', apiUrl.value.trim())
    router.push('/home')
  } else {
    alert('请输入有效的 API 地址')
  }
}
</script>

<template>
  <div class="container">
    <h2 class="title">请输入后端 API 地址</h2>
    <input
      v-model="apiUrl"
      type="url"
      placeholder="http://localhost:3000"
      class="input"
      @keyup.enter="saveApiUrl"
    />
    <button class="btn" @click="saveApiUrl">保存</button>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 80px auto;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
  font-size: 1.5rem;
}

.input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  margin-bottom: 16px;
}

.input:focus {
  border-color: #409eff;
  box-shadow: 0 0 8px rgba(64, 158, 255, 0.3);
}

.btn {
  width: 100%;
  padding: 12px;
  background-color: #409eff;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #66a9ff;
}

.btn:active {
  background-color: #2c7be5;
}
</style>
