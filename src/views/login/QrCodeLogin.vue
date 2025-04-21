<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/index'

// 接口
import { getQrKey, getQrCode, checkQrCodeState, getLoginStatus } from '@/service/login'


// 二维码登录数据

const qrKey = ref('')
const qrImg = ref('')
const qrState = ref(800)
let timer: number
let timerActive = false
const cookie = ref<string>('')
const nickname = ref<string | undefined>('')
const avatarUrl = ref<string | undefined>('')
const userStore = useUserStore()

type QrCodeState = {
  code: number
  message: string
  cookie: string
  nickname?: string
  avatarUrl?: string
}

const disableGetQrCode = ref(true)

// 二维码登录
const loginQr = () => {
  // 获取二维码频率控制
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
          if (!timerActive){
            timer = setInterval(() => {
              getQrState()
            }, 1500)
            timerActive = true
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
// 获取二维码状态
const getQrState = () => {

  checkQrCodeState(qrKey.value)
    .then((res) => {
      console.log(res)
      qrState.value = (res as unknown as QrCodeState).code
      if (qrState.value === 800) {
        // 二维码过期或者不存在
        console.log('二维码过期或者不存在')
      } else if (qrState.value === 801) {
        // 二维码未扫描
        console.log('二维码等待扫描')
      } else if (qrState.value === 802) {
        // 二维码已扫描，等待确认
        console.log('登录待确认')
        nickname.value = (res as unknown as QrCodeState).nickname
        avatarUrl.value = (res as unknown as QrCodeState).avatarUrl
      } else if (qrState.value === 803) {
        // 登录成功
        if (timerActive){
          clearInterval(timer)
          timerActive = false
        }
        cookie.value = (res as unknown as QrCodeState).cookie
        userStore.setCookie(cookie.value)
        getLoginStatus(cookie.value)
          .then((res) => {
            userStore.setUserInfo(res.data.account, res.data.profile, true)
            console.log('登录成功，跳转至首页')
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 清除数据
const resetQrCodeData = () => {
  qrKey.value = ''
  qrImg.value = ''
  qrState.value = 800
  if (timerActive){
    clearInterval(timer)
    timerActive = false
  }
  cookie.value = ''
  nickname.value = ''
  avatarUrl.value = ''
}
// 组件销毁时清除数据
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  resetQrCodeData()
})
// 组件挂载时获取二维码
import { onMounted } from 'vue'
onMounted(() => {
  loginQr()
})
</script>

<template>
  <div class="login-container">    
    <!-- 二维码登录卡片 -->
    <el-card class="login-card qr-card">
      <template #header>
        <div class="login-title">二维码登录</div>
      </template>
      <div class="qr-content">
        <img v-if="qrImg !== ''" :src="qrImg" class="qr-img" />
        <div class="qr-status">
          <p v-if="qrState === 801">请扫描二维码</p>
          <p v-else-if="qrState === 802">登录待确认</p>
          <p v-else-if="qrState === 803">登录成功</p>
          <p v-else>二维码不存在或者已过期</p>
        </div>
        <el-button type="primary" @click="loginQr" :disabled="disableGetQrCode">重新获取二维码</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>