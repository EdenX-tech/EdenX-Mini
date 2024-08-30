import request from '@/api/index';

// export function getChoiceDepth (params) {
//   return request({
//     url: '/api/v1/postdepth/getchoicedepth/'+params,
//     method: 'get',
//   })
// }
// //获取深度文列表
export function getInviteList (data) {
    return request({
        url: '/api/v1/invitelist?data=' + data,
        method: 'get',
        // data: params
    })
} 
export function login (params) {
  return request({
      url: '/api/v1/login',
      method: 'post',
      data: params
  })
}