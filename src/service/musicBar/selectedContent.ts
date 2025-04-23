import request from '@/utils/request'

// 获取 推荐歌单
export const GetPrivateContentList = (limit:number=4, offset: number=0) => {
  return request.get('/personalized/privatecontent/list',
    {
      params: {
        limit: limit,
        offset: offset,
        timerstamp: Date.now()
      }
    }
  )
}

// 获取 推荐电台
export const GetDjProgram = () => {
  return request.get('/personalized/djprogram',
    {
      params: {
        timerstamp: Date.now()
      }
    }
  )
}

// 获取 推荐mv
export const GetMVList = (limit:number=8) => {
  return request.get('/personalized/mv', {
    params: {
      limit: limit,
      timerstamp: Date.now()
    },
  })
}