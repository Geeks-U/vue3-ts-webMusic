import axios from 'axios'

const baseUrl = sessionStorage.getItem('apiUrl') || 'http://localhost:3000'
// userStore.cookie

// 创建 Axios 实例
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,  // 设置请求超时
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在请求发送之前做些什么，例如添加 token 或者日志

    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做些什么

    return response.data
  },
  error => {
    // 对响应错误做些什么
    if (error.response) {
      // 处理不同的状态码
      switch (error.response.status) {
      case 401:
        console.error('未授权，请重新登录')
        break
      case 500:
        console.error('服务器错误，请稍后再试')
        break
      default:
        console.error('发生了未知错误')
      }
    }
    return Promise.reject(error.response)
  }
)

export default instance
