/*
 * @Author: Helijun
 * @Date: 2020-07-15 17:16:50
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-15 17:21:14
 * @Description: 
 */ 
import api from '../service/request'
import {
  GETRECOMMENDPLAYLIST
} from '../constants/song'

export const getRecommendPlayList = () => {
  return dispatch => {
    api.get('/personalized').then((res) => {
      const recommendPlayList = res.data.result;
      dispatch({
        type: GETRECOMMENDPLAYLIST,
        payload: {
          recommendPlayList
        }
      })
    })
  }
}