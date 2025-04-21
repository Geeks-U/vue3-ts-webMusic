<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/index'

// 类型
import type { FormInstance, FormRules } from 'element-plus'

// 接口
import { getPhoneCaptcha, phoneCaptchaLogin, getLoginStatus } from '@/service/login'


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
const timegap = 700
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
// 验证码获取
const getCaptcha = async (formEl: FormInstance | undefined) => {
  console.log('获取验证码')
  if (!formEl) return
  await formEl.validateField('phone', (valid, message) => {
    if (valid) {
      console.log('手机号合法，可以发送验证码')
      // TODO: 调用后端接口发送验证码
      getPhoneCaptcha(loginFormPhoneCaptchaRuleForm.phone)
        .then((res) => {
          console.log('验证码发送结果：', res)
        })
        .catch((err) => {
          console.error('验证码发送失败：', err)
        })
    } else {
      console.log('手机号不合法', message)
    }
  })
}
// 手机验证码登录
const submitPhoneCaptchaForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      phoneCaptchaLogin(loginFormPhoneCaptchaRuleForm.phone, loginFormPhoneCaptchaRuleForm.captcha)
        .then((res) => {
          if ((res as any).data?.code !== 200) {
            console.error('登录失败：', res)
            return
          }
          console.log('登录成功，跳转首页')
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
// 重置手机验证码登录数据
const resetPhoneCaptchaData = () => {
  loginFormPhoneCaptchaRuleForm.phone = ''
  loginFormPhoneCaptchaRuleForm.captcha = ''
  loginFormPhoneCaptchaRuleFormRef.value?.clearValidate()
}
// 组件挂载后重置数据
import { onMounted } from 'vue'
onMounted(() => {
  resetPhoneCaptchaData()
})
</script>

<template>
  <div class="login-container">
    <!-- 手机验证码登录卡片 -->
    <el-card class="login-card">
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
          <el-button class="captcha-btn" @click="getCaptcha(loginFormPhoneCaptchaRuleFormRef)">发送验证码</el-button>
        </el-form-item>
      </el-form>
      <div class="login-actions">
        <el-button type="primary" @click="submitPhoneCaptchaForm(loginFormPhoneCaptchaRuleFormRef)">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>