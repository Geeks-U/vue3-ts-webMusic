import request from '@/utils/request'

// 获取 歌单标签
export const GetPlaylistTagList = () => {
  return request.get('/playlist/highquality/tags',
    {
      params: {
        timerstamp: Date.now()
      }
    }
  )
}

// 获取歌单列表
// http://127.0.0.1:3000/top/playlist/highquality?limit=35&before=0&cat=%E5%85%A8%E9%83%A8&t=1745400265681
// http://127.0.0.1:3000/top/playlist/highquality?before=1503639064232&limit=3
export const GetPlaylistList = (query) => {
  return request.get('/top/playlist/highquality', {
    params: {
      ...query,
      timerstamp: Date.now()
    }
  })
}