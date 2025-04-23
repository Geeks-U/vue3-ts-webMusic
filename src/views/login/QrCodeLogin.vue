<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores/index'
import { getQrKey, getQrCode, checkQrCodeState, getLoginStatus } from '@/service/login'
import router from '@/router'

const qrKey = ref('')
const qrImg = ref('')
const qrState = ref(800)
let timer: number
let timerActive = false

const cookie = ref('')
const nickname = ref<string | undefined>('') 
const avatarUrl = ref<string | undefined>('') 

const userStore = useUserStore()
const disableGetQrCode = ref(true)

type QrCodeState = {
  code: number
  message: string
  cookie: string
  nickname?: string
  avatarUrl?: string
}

// 获取二维码
const loginQr = () => {
  disableGetQrCode.value = true
  setTimeout(() => {
    disableGetQrCode.value = false
  }, 7000)

  getQrKey()
    .then((res) => {
      qrKey.value = res.data.unikey
      getQrCode(qrKey.value)
        .then((res) => {
          qrImg.value = res.data.qrimg
          if (!timerActive) {
            timer = setInterval(getQrState, 1500)
            timerActive = true
          }
        })
        .catch((err) => {
          console.log(err)
          ElMessage({
            message: '获取二维码失败，请稍后再试.',
            type: 'error',
            plain: true,
          })
        })
    })
    .catch((err) => {
      console.log(err)
      ElMessage({
        message: '获取二维码key失败，请稍后再试.',
        type: 'error',
        plain: true,
      })
    })
}

const getQrState = () => {
  checkQrCodeState(qrKey.value)
    .then((res) => {
      const data = res as unknown as QrCodeState
      qrState.value = data.code
      if (qrState.value === 802) {
        nickname.value = data.nickname
        avatarUrl.value = data.avatarUrl
      } else if (qrState.value === 803) {
        if (timerActive) {
          clearInterval(timer)
          timerActive = false
        }
        cookie.value = data.cookie
        userStore.setCookie(cookie.value)
        getLoginStatus(cookie.value)
          .then((res) => {
            userStore.setUserInfo(res.data.account, res.data.profile, true)
            ElMessage({
              message: '登录成功.',
              type: 'success',
              plain: true,
            })
            router.push('/')
          })
          .catch(console.log)
      }
    })
    .catch(console.log)
}

const resetQrCodeData = () => {
  qrKey.value = ''
  qrImg.value = ''
  qrState.value = 800
  cookie.value = ''
  nickname.value = ''
  avatarUrl.value = ''
  if (timerActive) {
    clearInterval(timer)
    timerActive = false
  }
}

onMounted(() => {
  loginQr()
})

onBeforeUnmount(() => {
  resetQrCodeData()
})
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="login-title">二维码登录</div>
      </template>

      <div class="qr-content">
        <!-- 左边二维码 -->
        <div class="qr-img-container">
          <div v-if="qrImg !== ''">
            <img :src="qrImg" class="qr-img" />
          </div>
          <div v-else class="qr-placeholder">
            <span>二维码加载中...</span>
          </div>
        </div>

        <!-- 右边信息模块 -->
        <div class="qr-info">
          <div class="qr-status">
            <p v-if="qrState === 801">请扫描二维码</p>
            <p v-else-if="qrState === 802">登录待确认</p>
            <p v-else-if="qrState === 803">登录成功</p>
            <p v-else>二维码不存在或者已过期</p>
          </div>
          <el-button class="qr-info-getQrCodeButton" @click="loginQr" :disabled="disableGetQrCode">
            重新获取二维码
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 400px;
  min-height: 270px;
  width: 100%;
  height: 100%;
  background: #f0f2f5;
}

.login-card {
  width: 100%;
  height: 100%;
  max-width: 400px;
  background-color: #fff;
}

.login-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.qr-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.qr-img-container {
  width: 154px;
  height: 154px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.qr-img {
  width: 110px;
  height: 110px;
  margin-left: auto;
  margin-right: auto;
  object-fit: contain;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
}

.qr-placeholder {
  width: 110px;
  height: 110px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f5f7fa;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

.qr-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  flex: 1;
}

.qr-status {
  font-size: 14px;
  color: #666;
  margin-left: auto;
  margin-right: auto;
}

.qr-info-getQrCodeButton {
  width: 70%;
  min-width: 130px;
  margin-left: auto;
  margin-right: auto;
}

.qr-info-getQrCodeButton:active {
  background-color: #b2beca;
  color: #fff;
}

/* 响应式支持：手机上切回竖排 */
/* @media (max-width: 600px) {
  .qr-content {
    flex-direction: column;
    align-items: center;
  }

  .qr-info {
    align-items: center;
    text-align: center;
  }
} */
</style>
