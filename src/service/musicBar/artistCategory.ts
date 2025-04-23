import request from '@/utils/request'

// 条件搜索歌手
export const GetArtistsList = (queyParams:object) => {
  return request.get('/artist/list', {
    params: queyParams
  })
}