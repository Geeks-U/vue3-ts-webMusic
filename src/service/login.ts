import request from '@/utils/request'
import type { AxiosResponse } from 'axios'

// 二维码登录 获取key
export const getQrKey = () => {
  return request.get('/login/qr/key', {
    params: {
      timerstamp: Date.now()
    }
  })
}

// 二维码登录 获取二维码
export const getQrCode = (key: string) => {
  return request.get('/login/qr/create', {
    params: {
      key,
      qrimg: true,
      timerstamp: Date.now()
    }
  })
}

// 二维码登录 检测二维码状态
// type QrCodeState = {
//   code: number
//   message: string
//   cookie: string
// }
export const checkQrCodeState = (key: string) => {
  return request.get('/login/qr/check', {
    params: {
      key,
      timerstamp: Date.now()
    }
  })
}

// 带上cookie获取用户登录状态
export const getLoginStatus = (cookie:string) => {
  return request.post('/login/status',
    {
      cookie: cookie
    },
    {
      params: { timerstamp: Date.now() },
    })
}
