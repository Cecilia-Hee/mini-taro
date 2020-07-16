/*
 * @Author: Helijun
 * @Date: 2020-07-15 17:16:50
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-16 16:03:24
 * @Description: 
 */ 
import createAction from '../service/redux'
import {
  GET_RECOMMEND_LIST,
  GET_PALYLIST_DETAIL
} from '../constants/api'
import {
  GETRECOMMENDPLAYLIST,
  GETPLAYLISTDETAIL
} from '../constants/song'

// export const getRecommendPlayList = () => {
//   return dispatch => {
//     api.get('/personalized').then((res) => {
//       const recommendPlayList = res.data.result;
//       dispatch({
//         type: GETRECOMMENDPLAYLIST,
//         payload: {
//           recommendPlayList
//         }
//       })
//     })
//   }
// }

// 获取每日推荐歌单
export const getRecommendPlayList = payload => createAction({
  url: GET_RECOMMEND_LIST,
  type: GETRECOMMENDPLAYLIST,
  payload
})

// 获取歌单详情
export const getPlayListDetail = payload => createAction({
  url: GET_PALYLIST_DETAIL,
  type: GETPLAYLISTDETAIL,
  payload
})