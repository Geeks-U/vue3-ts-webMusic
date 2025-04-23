import request from '@/utils/request'

// 获取 热门歌单
export const GetTopList = () => {
  return request.get('/toplist/detail',
    {
      params: {
        timerstamp: Date.now()
      }
    }
  )
}