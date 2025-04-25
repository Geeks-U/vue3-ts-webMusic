import request from '@/utils/request'

// 获取歌单详情 http://127.0.0.1:3000/playlist/detail?id=893126993&s=0&timerstamp={{$timestamp}}5349307028
export const GetSongDetails = (id:number=5349307028, s:number=0) => {
  return request.get('/playlist/detail', {
    params: {
      id: id,
      s: s,
      timerstamp: Date.now()
    }
  })
}


// 获取歌单详情 http://127.0.0.1:3000/comment/playlist?id=705123491&timerstamp={{$timestamp}}
export const GetSonglistCommentList = (id:number=705123491) => {
  return request.get('/comment/playlist', {
    params: {
      id: id,
      timerstamp: Date.now()
    }
  })
}