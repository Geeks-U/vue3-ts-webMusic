import { defineStore } from 'pinia'
import { ref } from 'vue'

type Account = {
  id: number | null
  username: string
}

type Profile = {
  userId: number | null
  nickname: string
  avatarImgId: string
  avatarUrl: string
  backgroundImgId: string
  backgroundUrl: string
  province: number | null
  city: number | null
}

export const useUserStore = defineStore('user', () => {
  const account = ref<Account>({
    id: null,
    username: '',
  })

  const profile = ref<Profile>({
    userId: 0,
    nickname: '',
    avatarImgId: '',
    avatarUrl: '',
    backgroundImgId: '',
    backgroundUrl: '',
    province: null,
    city: null,
  })

  const cookie = ref<string>('')

  const isLogin = ref<boolean>(false)

  // 使用泛型函数来更新对象属性(浅拷贝)
  function safeUpdate<T extends object>(target: T, source: T) {
    const keys = Object.keys(target) as (keyof T)[]
    keys.forEach((key) => {
      target[key] = source[key]
    })
  }
  
  function setUserInfo(accountParam: Account, profileParam: Profile, isLoginParam: boolean) {
    safeUpdate(account.value, accountParam)
    safeUpdate(profile.value, profileParam)
    isLogin.value = isLoginParam
  }

  function setCookie(cookieParam: string) {
    cookie.value = cookieParam
  }

  function removeAll() {
    account.value = {
      id: null,
      username: '',
    }
    profile.value = {
      userId: 0,
      nickname: '',
      avatarImgId: '',
      avatarUrl: '',
      backgroundImgId: '',
      backgroundUrl: '',
      province: null,
      city: null,
    }
    cookie.value = ''
  }

  return {
    account,
    profile,
    cookie,
    isLogin,
    setUserInfo,
    setCookie,
    removeAll,
  }
}, {
  persist: true,
})
