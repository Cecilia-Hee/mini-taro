/*
 * @Author: Helijun
 * @Date: 2020-07-15 14:38:53
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-17 18:19:31
 * @Description: 
 */ 
import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../constants/status'

import { baseUrl } from '../config'
import { logError } from '../utils/error'

type OptionType = {
  url: string,
  data?: object | string,
  method?: any,
  header?: object,
  xhrFields: object,
  success: any
}

type CookieType = {
  name: string,
  value: string,
  expires: string,
  path: string
}

const setCookie = (res: {
  cookies: Array<CookieType>,
  header: {
    'Set-Cookie': string
  }
}) => {
  if (res.cookies && res.cookies.length > 0) {
    let cookies = ''
    res.cookies.forEach((cookie, index) => {
      // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
      if (cookie.name && cookie.value) {
        cookies += index === res.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
      } else {
        cookies += `${cookie};`     
      } 
    });
    Taro.setStorageSync('cookies', cookies)
  }
  if (res.header && res.header['Set-Cookie']) {
    Taro.setStorageSync('cookies', res.header['Set-Cookie'])
  }
}

export default {
  baseOptions(params) {
    // console.log(params)
    let {url, data, method = 'GET'} = params;
    const contentType = params.contentType || 'application/json'
    
    const option: OptionType = {
      url: url.indexOf('http') !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        cookie: Taro.getStorageSync('cookies')  // 每次请求都携带cookie头
      },
      xhrFields: { withCredentials: true },
      success(res) {
        setCookie(res)
      }
    };

    return Taro.request(option).then((res) => {
        // console.log("res:", res)
        // setCookie(res)
        // 
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          Taro.clearStorage()
          Taro.navigateTo({
            url: '/pages/login/index'
          })
          return logError('api', '请先登录')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
    }).catch((e) => {
      logError('api', '请求接口出现问题', e)
    })
  },

  get(url, data?: object) {
    let option = {url, data};
    return this.baseOptions(option)
  },

  post(url, data?: object, contentType?: string) {
    let option = {url, data, contentType, method: 'POST'};
    return this.baseOptions(option)
  },

  put(url, data?: object) {
    let option = {url, data, method: 'PUT'}
    return this.baseOptions(option,)
  },

  delete(url, data?: object) {
    let option = {url, data, method: 'DELETE'};
    return this.baseOptions(option,)
  }
}