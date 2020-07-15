/*
 * @Author: Helijun
 * @Date: 2020-07-15 18:19:34
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-15 20:55:55
 * @Description: 适当封装 Redux，简化调用
 */ 
import api from './request'

const request = api.baseOptions

export default function createAction(options) {
  const { url, payload, method, requestOptions, cb, type } = options
  return (dispatch) => {
    return request({url, data: payload, method, ...requestOptions}).then((res) => {
      dispatch({
        type,
        payload: cb ? cb(res) : res
      })
      return res;
    })
  }
}