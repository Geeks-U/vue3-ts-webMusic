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
    // 解析vue文件
    vue(),

    // 实现组件的自动导入(在使用到的地方自动导入)
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'css'
        }),
        IconsResolver({
          prefix: 'Icon'
        }),
      ],
    }),

    // 实现组件的自动注册(按需加载)
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'css'
        }),
        IconsResolver({
          enabledCollections: ['ep'],
          prefix: 'Icon',
        }),
      ],
    }),

    // icon组件生成
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
