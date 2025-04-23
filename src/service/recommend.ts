import request from '@/utils/request'

// 推荐 获取轮播图
export const getBanner = (type:number=0) => {
  return request.get('/banner', {
    params: {
      type: type,
      timerstamp: Date.now()
    },
  })
}

// 推荐 获取推荐歌单
export const getSonglist = (limit:number=3) => {
  return request.get('/personalized', {
    params: {
      limit: limit,
      timerstamp: Date.now()
    },
  })
}

// 推荐 获取推荐歌曲列表
export const getNewSongList = (limit:number=8) => {
  return request.get('/personalized/newsong', {
    params: {
      limit: limit,
      timerstamp: Date.now()
    },
  })
}

// 推荐 获取推荐MV
export const getMVList = (limit:number=8) => {
  return request.get('/personalized/mv', {
    params: {
      limit: limit,
      timerstamp: Date.now()
    },
  })
}