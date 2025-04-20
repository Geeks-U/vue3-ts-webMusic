import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // 全局配置
  {
    files: ['**/*.{js,cjs,mjs,ts,vue}'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: { js },
    extends: [js.configs.recommended],
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-unused-vars': 'off',
    },
  },

  // TS配置
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    extends: [tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // VUE配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      'vue/no-unused-vars': 'warn',
    },
  },
])
