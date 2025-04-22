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
  captchaSignUp = 3
}
type loginMethodType = 0 | 1 | 2 | 3
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
      <el-menu-item index="3"><el-icon><EpCirclePlusFilled /></el-icon></el-menu-item>
    </el-menu>

    <!-- 显示登录组件区域 -->
    <div class="login-content">
      <PwdLogin v-if="loginMethod === loginMethodEnum.accountPassword" />
      <CaptchaLogin v-if="loginMethod === loginMethodEnum.captcha" />
      <QrCodeLogin v-if="loginMethod === loginMethodEnum.qrCode" />
      <!-- 暂且使用验证码登录组件替代 -->
      <CaptchaLogin v-if="loginMethod === loginMethodEnum.captchaSignUp" captcha-login-title="手机号码注册" captcha-login-submit-text="注册" />
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
}

.login-method-menu {
  width: 80px;
  background: linear-gradient(145deg, #2c3e50, #34495e);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.el-menu-item {
  width: 48px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bdc3c7;
  border-radius: 8px;
  margin: 4px 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.el-menu-item:hover {
  background-color: rgba(52, 152, 219, 0.1);
  transform: translateY(-2px);
}

.el-menu-item.is-active {
  background-color: #3498db;
  color: #fff;
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
}

.el-menu-item .el-icon {
  font-size: 24px;
}

.login-content {
  flex: 1;
  width: 400px;
  height: 270px;
  position: relative;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    min-height: auto;
  }

  .login-method-menu {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    padding: 12px;
    border-radius: 0;
  }

  .el-menu-item {
    width: 40px;
    height: 30px;
    margin: 0 4px;
  }

  .login-content {
    width: 400px;
    height: 270px;
  }
}

@media (max-width: 480px) {
  .el-menu-item {
    width: 36px;
    height: 30px;
  }
  
  .el-menu-item .el-icon {
    font-size: 20px;
  }
  
  .login-content {
    width: 360px;
    height: 270px;
  }
}
</style>
