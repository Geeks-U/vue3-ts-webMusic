import request from '@/utils/request'

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
      key: key,
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
      key: key,
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

// 手机号登录 获取验证码
export const getPhoneCaptcha = (phone: string) => {
  return request.get('/captcha/sent', {
    params: {
      phone: phone,
      timerstamp: Date.now()
    }
  })
}

// 手机号登录 验证码登录
export const phoneCaptchaLogin = (phone: string, captcha: string) => {
  return request.get('/captcha/verify',
    {
      params: {
        phone: phone,
        captcha: captcha,
        timerstamp: Date.now()
      }
    }
  )
}

// 账号密码登录
export const accountPwdLogin = (account: string, password: string) => {
  return request.post('/login/cellphone',
    {
      phone: account,
      password: password
    },
    {
      params: { timerstamp: Date.now() },
    })
}