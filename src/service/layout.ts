import request from '@/utils/request'

// 获取歌曲url
export const GetSongPlayurl = (ids:number[]=[2687364563, 33894312]) => {
  return request.get('/song/url', {
    params: {
      id: ids.join(','),
      timerstamp: Date.now()
    }
  })
}

// 获取歌曲名称-封面
export const GetSongDetails = (ids:number[]=[2687364563, 33894312]) => {
  return request.get('/song/detail', {
    params: {
      ids: ids.join(','),
      timerstamp: Date.now()
    }
  })
}