<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getPhoneCaptcha, phoneCaptchaLogin } from '@/service/login'

// 数据
const props = defineProps(
  {
    captchaLoginTitle: {
      type: String,
      default: '手机验证码登录'
    },
    captchaLoginSubmitText: {
      type: String,
      default: '登录'
    }
  }
)
interface loginFormPhoneCaptchaTypes {
  phone: string
  captcha: string
}

const loginFormPhoneCaptchaRuleFormRef = ref<FormInstance>()
const loginFormPhoneCaptchaRuleForm = reactive<loginFormPhoneCaptchaTypes>({
  phone: '',
  captcha: ''
})

let phoneTimer: ReturnType<typeof setTimeout> | null = null
let captchaTimer: ReturnType<typeof setTimeout> | null = null
const timegap = 700

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

// 倒计时逻辑
const countdown = ref(0)
const countdownDuration = 60
let countdownInterval: ReturnType<typeof setInterval> | null = null

const startCountdown = () => {
  countdown.value = countdownDuration
  countdownInterval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0 && countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
  }, 1000)
}

const getCaptcha = async (formEl: FormInstance | undefined) => {
  if (!formEl || countdown.value > 0) return
  await formEl.validateField('phone', (valid, message) => {
    if (valid) {
      getPhoneCaptcha(loginFormPhoneCaptchaRuleForm.phone)
        .then((res) => {
          console.log('验证码发送结果：', res)
          startCountdown()
        })
        .catch((err) => {
          ElMessage({
            message: '验证码发送失败.',
            type: 'error',
            plain: true,
          })
        })
    } else {
      console.log('手机号不合法', message)
    }
  })
}

const submitPhoneCaptchaForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      phoneCaptchaLogin(
        loginFormPhoneCaptchaRuleForm.phone,
        loginFormPhoneCaptchaRuleForm.captcha
      )
        .then((res) => {
          if ((res as any).code !== 200) {
            console.error('登录失败：', res)
            return
          }
          ElMessage({
            message: props.captchaLoginTitle + '成功.',
            type: 'success',
            plain: true,
          })
          resetPhoneCaptchaData()
        })
        .catch((err) => {
          console.error('登录失败：', err)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetPhoneCaptchaData = () => {
  loginFormPhoneCaptchaRuleForm.phone = ''
  loginFormPhoneCaptchaRuleForm.captcha = ''
  loginFormPhoneCaptchaRuleFormRef.value?.clearValidate()
}

onMounted(() => {
  resetPhoneCaptchaData()
})
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="login-title">{{ captchaLoginTitle }}</div>
      </template>
      <el-form
        ref="loginFormPhoneCaptchaRuleFormRef"
        :model="loginFormPhoneCaptchaRuleForm"
        :rules="loginFormPhoneCaptchaRules"
        label-width="auto"
        hide-required-asterisk
        class="login-form"
      >
        <el-form-item label="手机号:" prop="phone" class="login-form-item-limit">
          <el-input v-model="loginFormPhoneCaptchaRuleForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="验证码:" prop="captcha" class="login-form-item-limit">
          <el-input
            v-model="loginFormPhoneCaptchaRuleForm.captcha"
            placeholder="请输入验证码"
          >
            <template #append>
              <el-button
                :disabled="countdown > 0"
                @click="getCaptcha(loginFormPhoneCaptchaRuleFormRef)"
              >
                {{ countdown > 0 ? `${countdown}秒后重试` : '发送验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="login-actions">
        <el-button class="login-actions-submitButton" @click="submitPhoneCaptchaForm(loginFormPhoneCaptchaRuleFormRef)">
          {{ captchaLoginSubmitText }}
        </el-button>
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

.login-form {
  margin-top: 20px;
}

.login-form-item-limit {
  max-width: 280px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.login-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.login-actions-submitButton {
  width: 30%;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
}
.login-actions-submitButton:active {
  background-color: #b2beca;
  color: #fff;
}
</style>
