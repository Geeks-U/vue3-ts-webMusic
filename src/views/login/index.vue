<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/index'

// 类型
import type { FormInstance, FormRules } from 'element-plus'

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
        console.log('登录成功')
        cookie.value = (res as unknown as QrCodeState).cookie
        userStore.setCookie(cookie.value)
        getLoginStatus(cookie.value)
          .then((res) => {
            userStore.setUserInfo(res.data.profile, res.data.account, true)
            console.log(res)
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
// 清除二维码数据
const resetQrCodeData = () => {
  qrKey.value = ''
  qrImg.value = ''
  qrState.value = 800
  if (timerActive){
    clearInterval(timer)
    timerActive = false
  }
}

// 账号密码登录数据
interface loginFormAccountPasswordTypes {
  username: string
  password: string

}
const loginFormAccountPasswordRuleFormRef = ref<FormInstance>()
const loginFormAccountPasswordRuleForm = reactive<loginFormAccountPasswordTypes>({
  username: '',
  password: ''

})
// 防抖
let usernameTimer: ReturnType<typeof setTimeout> | null = null
let passwordTimer: ReturnType<typeof setTimeout> | null = null
// 规则定义
const loginFormAccountPasswordRules = reactive<FormRules<loginFormAccountPasswordTypes>>({
  username: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (usernameTimer) clearTimeout(usernameTimer)
        usernameTimer = setTimeout(() => {
          const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/
          if (!value) {
            callback(new Error('请输入账号'))
          } else if (!regex.test(value)) {
            callback(new Error('账号需包含字母和数字，长度8-20位'))
          } else {
            callback()
          }
        }, timegap)
      },
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (passwordTimer) clearTimeout(passwordTimer)
        passwordTimer = setTimeout(() => {
          const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{9,20}$/
          if (!value) {
            callback(new Error('请输入密码'))
          } else if (!regex.test(value)) {
            callback(new Error('密码需包含字母、数字和符号，长度9-20位'))
          } else {
            callback()
          }
        }, timegap)
      },
      trigger: 'change'
    }
  ]
})

// 账号密码登录
const submitAccountPasswordForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置账号密码登录数据
const resetAccountPasswordData = () => {
  loginFormAccountPasswordRuleForm.username = ''
  loginFormAccountPasswordRuleForm.password = ''
  loginFormAccountPasswordRuleFormRef.value?.clearValidate()
}

// 手机验证码登录数据
interface loginFormPhoneCaptchaTypes {
  phone: string
  captcha: string
}
const loginFormPhoneCaptchaRuleFormRef = ref<FormInstance>()
const loginFormPhoneCaptchaRuleForm = reactive<loginFormPhoneCaptchaTypes>({
  phone: '',
  captcha: ''

})
// 防抖
let phoneTimer: ReturnType<typeof setTimeout> | null = null
let captchaTimer: ReturnType<typeof setTimeout> | null = null
// 规则定义
const loginFormPhoneCaptchaRules = reactive<FormRules<loginFormPhoneCaptchaTypes>>({
  phone: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (phoneTimer) clearTimeout(phoneTimer)
        phoneTimer = setTimeout(() => {
          const regex = /^1[3-9]\d{9}$/
          if (!value) {
            callback(new Error('请输入手机号'))
          } else if (!regex.test(value)) {
            callback(new Error('手机号格式有误'))
          } else {
            callback()
          }
        }, timegap)
      },
      trigger: 'change'
    }
  ],
  captcha: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (captchaTimer) clearTimeout(captchaTimer)
        captchaTimer = setTimeout(() => {
          const regex = /^\d{4,8}$/
          if (!value) {
            callback(new Error('请输入验证码'))
          } else if (!regex.test(value)) {
            callback(new Error('验证码为4-8位数字'))
          } else {
            callback()
          }
        }, timegap)
      },
      trigger: 'change'
    }
  ]
})
// 手机验证码登录
const submitPhoneCaptchaForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置手机验证码登录数据
const resetPhoneCaptchaData = () => {
  loginFormPhoneCaptchaRuleForm.phone = ''
  loginFormPhoneCaptchaRuleForm.captcha = ''
  loginFormPhoneCaptchaRuleFormRef.value?.clearValidate()
}

// 数据
enum loginMethodEnum {
  accountPassword=0,
  captcha=1,
  qrCode=2
}
type loginMethodType = 0 | 1 | 2
const loginMethod = ref<loginMethodType>(0)
// 防抖间隔
const timegap = 700

// 切换登录方式
const switchLoginMethod = (from:loginMethodType, to: loginMethodType) => {
  if (from === loginMethodEnum.accountPassword){
    resetAccountPasswordData()
  }
  else if (from === loginMethodEnum.captcha){
    resetPhoneCaptchaData()
  }
  else if (from === loginMethodEnum.qrCode){
    resetQrCodeData()
  }
  if (to === loginMethodEnum.qrCode){
    loginQr()
  }
  loginMethod.value = to
}
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <div>
    子组件
    <HelloWorld></HelloWorld>
  </div>
  <div class="login-container">
    <!-- 账号密码登录卡片 -->
    <el-card v-if="loginMethod===loginMethodEnum.accountPassword" class="login-card">
      <template #header>
        <div class="login-title">账号密码登录</div>
      </template>
      <el-form
        ref="loginFormAccountPasswordRuleFormRef"
        :model="loginFormAccountPasswordRuleForm"
        :rules="loginFormAccountPasswordRules"
        label-width="auto"
        hide-required-asterisk
      >
        <el-form-item label="账号:" prop="username">
          <el-input v-model="loginFormAccountPasswordRuleForm.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="loginFormAccountPasswordRuleForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <div class="login-actions">
        <el-button type="primary" @click="submitAccountPasswordForm(loginFormAccountPasswordRuleFormRef)">登录</el-button>
        <el-button @click="switchLoginMethod(0, 1)">手机验证码登录</el-button>
        <el-button @click="switchLoginMethod(0, 2)">二维码登录</el-button>
      </div>
    </el-card>

    <!-- 手机验证码登录卡片 -->
    <el-card v-if="loginMethod===loginMethodEnum.captcha" class="login-card">
      <template #header>
        <div class="login-title">手机验证码登录</div>
      </template>
      <el-form
        ref="loginFormPhoneCaptchaRuleFormRef"
        :model="loginFormPhoneCaptchaRuleForm"
        :rules="loginFormPhoneCaptchaRules"
        label-width="auto"
        hide-required-asterisk
      >
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="loginFormPhoneCaptchaRuleForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="验证码:" prop="captcha" class="captcha-item">
          <el-input v-model="loginFormPhoneCaptchaRuleForm.captcha" placeholder="请输入验证码" />
          <el-button class="captcha-btn">发送验证码</el-button>
        </el-form-item>
      </el-form>
      <div class="login-actions">
        <el-button type="primary" @click="submitPhoneCaptchaForm(loginFormPhoneCaptchaRuleFormRef)">登录</el-button>
        <el-button @click="switchLoginMethod(1, 0)">账号密码登录</el-button>
      </div>
    </el-card>

    <!-- 二维码登录卡片 -->
    <el-card v-if="loginMethod===loginMethodEnum.qrCode" class="login-card qr-card">
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
        <el-button @click="switchLoginMethod(2, 0)">账号密码登录</el-button>
      </div>
      <div v-if="userStore.isLogin" class="user-info">
        <el-avatar :src="avatarUrl" />
        <div class="user-details">
          <div class="nickname">{{ nickname }}</div>
          <div class="account">账号：{{ userStore.account?.id }}</div>
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
  min-height: 90vh;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.qr-card {
  text-align: center;
}

.login-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.login-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.qr-img {
  width: 200px;
  height: 200px;
  margin-bottom: 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

.qr-status {
  font-size: 14px;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  gap: 12px;
}

.user-details {
  text-align: left;
}

.nickname {
  font-weight: bold;
  font-size: 16px;
}

.account {
  color: #999;
  font-size: 13px;
}

.captcha-item {
  display: flex;
  align-items: center;
}
.captcha-item .el-input {
  flex: 1;
}
.captcha-btn {
  margin-left: 12px;
}
</style>