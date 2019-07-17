/**
 * 评论的接口模块
 */
import request from '@/utils/request'

/**
 * 获取文章评论
 * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
 */
export const getArticleComments = ({
  articleId,
  offset,
  limit = 10
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: { // axios 不会添加类型为 null 的数据
      type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
      source: articleId, // 源id，文章id或评论id
      offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
    }
  })
}

/**
  * 获取评论回复
  */