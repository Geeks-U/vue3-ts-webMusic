import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,             // 指定端口
    host: '192.168.1.4',  // 设置为你的本机局域网 IP 地址
  }
})
