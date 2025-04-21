<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/index'

// 类型
import type { FormInstance, FormRules } from 'element-plus'

// 接口
import { accountPwdLogin, getLoginStatus } from '@/service/login'


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
const timegap = 700 // 防抖时间间隔
// 规则定义
const loginFormAccountPasswordRules = reactive<FormRules<loginFormAccountPasswordTypes>>({
  username: [
    {
      required: true,
      validator: (rule, value, callback) => {
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
      validator: (rule, value, callback) => {
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

// 账号密码登录
const submitAccountPasswordForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      accountPwdLogin(loginFormAccountPasswordRuleForm.username, loginFormAccountPasswordRuleForm.password)
        .then((res) => {
          console.log('登录结果', res)
          if (!((res as any).code === 200)) {
            console.log('登录失败')
          }
          console.log('登录成功，跳转至首页')
        })
        .catch((err) => {
          console.log('登录失败', err)
        })
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
// 组件挂载后重置数据
import { onMounted } from 'vue'
onMounted(() => {
  resetAccountPasswordData()
})


</script>

<template>
  <div class="login-container">
    <!-- 账号密码登录卡片 -->
    <el-card class="login-card">
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
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>