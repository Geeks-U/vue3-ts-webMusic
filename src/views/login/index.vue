<script setup lang="ts">
import { ref } from 'vue'

// 登录方式组件
import PwdLogin from './PwdLogin.vue'
import CaptchaLogin from './CaptchaLogin.vue'
import QrCodeLogin from './QrCodeLogin.vue'

// 数据
enum loginMethodEnum {
  accountPassword = 0,
  captcha = 1,
  qrCode = 2,
}
type loginMethodType = 0 | 1 | 2
const loginMethod = ref<loginMethodType>(0)

// 切换登录方式
const switchLoginMethod = (index: string) => {
  loginMethod.value = Number(index) as loginMethodType
  console.log('当前登录方式：', loginMethod.value)
}
</script>

<template>
  <div class="login-container">
    <!-- 顶部菜单 -->
    <el-menu :default-active="loginMethod.toString()" mode="vertical" class="login-method-menu" @select="switchLoginMethod">
      <el-menu-item index="0"><el-icon><EpUser /></el-icon></el-menu-item>
      <el-menu-item index="1"><el-icon><EpKey /></el-icon></el-menu-item>
      <el-menu-item index="2"><el-icon><EpFullScreen /></el-icon></el-menu-item>
    </el-menu>

    <!-- 显示登录组件区域 -->
    <div class="login-content">
      <PwdLogin v-if="loginMethod === loginMethodEnum.accountPassword" />
      <CaptchaLogin v-if="loginMethod === loginMethodEnum.captcha" />
      <QrCodeLogin v-if="loginMethod === loginMethodEnum.qrCode" />
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.login-method-menu {
  width: 200px;
  background-color: #2c3e50;
  padding: 20px;
  border-radius: 10px;
  flex-shrink: 0;  /* 防止菜单缩小 */
}

.el-menu-item {
  color: #ecf0f1;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.el-menu-item:hover {
  background-color: #3498db;
  color: #fff;
}

.el-menu-item.is-active {
  background-color: #2980b9;
  color: #fff;
}

.login-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  min-height: 0; /* 移除固定高度，允许自适应 */
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .login-method-menu {
    width: 100%;
    height: auto;
    padding: 10px;
  }

  .login-content {
    margin-top: 20px;
  }
}
</style>
