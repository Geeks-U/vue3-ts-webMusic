import request from '@/utils/request'

// 获取歌曲详情
export const GetSongDetails = (ids:number[]=[5349307028]) => {
  return request.get('/song/detail', {
    params: {
      ids: ids.join(','),
      timerstamp: Date.now()
    }
  })
}