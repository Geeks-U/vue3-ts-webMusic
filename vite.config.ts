import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),

    // 自动导入插件
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      resolvers: [
        // ElMessage函数导入
        ElementPlusResolver({
          importStyle: 'css'
        }),
      ],
    }),

    // 自动注册组件插件
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'css'
        }),
        IconsResolver({
          enabledCollections: ['mdi', 'fa', 'ep'], // 启用更多的图标库
          prefix: '',
        }),
      ],
    }),

    // 配置图标插件
    Icons({
      autoInstall: true,
    }),
  ],
  server: {
    port: 8080,
    host: '192.168.1.6',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
