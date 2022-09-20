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
/**
 * 获取详情页文章
 * @param {*} articleId 文章的id
 * @returns
 */
export const getArticlesDetailAPI = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}
/**
 * 获取品论列表
 * @param {*} data 请求参数type类型a或c和scource文章id或评论id
 * @returns
 */
export const getCommentListAPI = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}
/**
 * 评论点赞接口
 * @param {*} data 评论的id
 * @returns
 */
export const pinlunLikeAPI = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取消评论点赞
 * @param {*} target 评论id
 * @returns
 */
export const deletpinlunLikeAPI = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
/**
 * 发送评论接口
 * @param {*} target 评论文章则为文章id，回复评论则为评论id
 * @param {*} content 评论内容
 * @param {*} artId 文章id
 * @returns
 */
export const postArticleCommentAPI = (target, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}
/**
 * 关注用户接口
 * @param {*} targrt 作者的id
 * @returns
 */
export const followUsersAPI = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取消关注
 * @param {*} autId 作者id
 * @returns
 */
export const delefollowUsersAPI = (autId) => {
  return request({
    url: `/v1_0/user/followings/${autId}`,
    method: 'DELETE'
  })
}
/**
 * 收藏接口
 * @param {*} target 目标文章id
 * @returns
 */
export const userFavoritesAPI = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取消收藏
 * @param {*} autId 取消收藏的文章id
 * @returns
 */
export const deleuserFavoritesAPI = (artId) => {
  return request({
    url: `/v1_0/article/collections/${artId}`,
    method: 'DELETE'
  })
}
/**
 * 对文章点赞
 * @param {*} target 点赞的文章id
 * @returns
 */
export const articleLikesAPI = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取消文章点赞
 * @param {*} autId 取消收藏的文章id
 * @returns
 */
export const delearticleLikesAPI = (artId) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}
