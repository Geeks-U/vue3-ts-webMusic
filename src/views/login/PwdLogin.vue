<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { accountPwdLogin } from '@/service/login'

interface LoginForm {
  username: string
  password: string
}

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  username: '',
  password: ''
})

// 防抖处理
let usernameTimer: ReturnType<typeof setTimeout> | null = null
let passwordTimer: ReturnType<typeof setTimeout> | null = null
const timegap = 700

const loginRules = reactive<FormRules<LoginForm>>({
  username: [
    {
      required: true,
      validator: (_, value, callback) => {
        if (usernameTimer) clearTimeout(usernameTimer)
        usernameTimer = setTimeout(() => {
          const regex = /^1[3-9]\d{9}$/
          if (!value) {
            callback(new Error('请输入账号'))
          } else if (!regex.test(value)) {
            callback(new Error('账号格式有误'))
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
      validator: (_, value, callback) => {
        if (passwordTimer) clearTimeout(passwordTimer)
        passwordTimer = setTimeout(() => {
          const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{8,20}$/
          if (!value) {
            callback(new Error('请输入密码'))
          } else if (!regex.test(value)) {
            callback(new Error('密码必须包含字母、数字，长度8-20位'))
          } else {
            callback()
          }
        }, timegap)
      },
      trigger: 'change'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      accountPwdLogin(loginForm.username, loginForm.password)
        .then((res) => {
          console.log('登录结果', res)
          if ((res as any).code === 200) {
            console.log('登录成功，跳转至首页')
          } else {
            console.log('登录失败')
          }
        })
        .catch((err) => {
          console.log('登录失败', err)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = () => {
  loginForm.username = ''
  loginForm.password = ''
  loginFormRef.value?.clearValidate()
}

onMounted(() => {
  resetForm()
})
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="login-title">账号密码登录</div>
      </template>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="auto"
        hide-required-asterisk
        class="login-form"
      >
        <el-form-item label="账号:" prop="username" class="login-form-item-limit">
          <el-input v-model="loginForm.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码:" prop="password" class="login-form-item-limit">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <div class="login-actions">
        <el-button class="login-actions-submitButton" @click="submitForm(loginFormRef)">登录</el-button>
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
  background-color: #899aac;
  color: #fff;
}
</style>
