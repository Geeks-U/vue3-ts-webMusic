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

  function setUserInfo(accountParam: Account, profileParam: Profile) {
    account.value = accountParam
    profile.value = profileParam
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
    setUserInfo,
    setCookie,
    removeAll,
  }
}, {
  persist: true,
})
