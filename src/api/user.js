/**
 * 封装用户相关接口请求函数
 */

import request from '@/utils/request'

/**
 * 用户登录
 */
export const login = ({ mobile, code }) => {
  // 指向其他逻辑
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 拉黑用户（加入黑名单）
 */
export const addBlacklist = userId => {
  // 指向其他逻辑
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: userId
    }
  })
}

/**
 * 关注用户
 */
export const followUser = userId => {
  // 指向其他逻辑
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注用户
 */
export const unFollowUser = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取当前登录用户的个人信息
 */
export const getCurrentUserInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}

/**
 * 获取当前登录用户的基本信息
 */
export const getCurrentUserProfile = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`
  })
}

/**
 * 更新用户个人信息
 * axios 会把无效数据进行过滤，null、undefined 等数据
 */
export const updateUserProfile = ({
  name,
  photo,
  gender,
  birthday,
  realName,
  idNumber,
  idCardFront,
  idCardBack,
  idCardHandheld,
  intro
}) => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data: {
      name,
      photo,
      gender,
      birthday,
      real_name: realName,
      id_number: idNumber,
      id_card_front: idCardFront,
      id_card_back: idCardBack,
      id_card_handheld: idCardHandheld,
      intro
    }
  })
}

/**
 * 编辑用户照片资料（头像、身份证照片）
 * name 是提交的数据名
 * file 是文件对象
 */
export const updateUserProfileImage = (name, file) => {
  const formData = new FormData()
  formData.append(name, file)
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/photo`,

    // Content-Type multipart/form-data
    // XHR 2.0 新增的那个 FormData 对象
    data: formData

    // Content-Type application/json 数据传递一个普通对象
    // data: {}
  })
}
