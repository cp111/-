// 文章接口
import request from '@/utils/request'
/**
 * 获取文章
 * @param {*} id 频道的id
 * @param {*} timestamp 请求新的推荐数据时间戳
 * @returns
 */
export const getArticlesAPI = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
