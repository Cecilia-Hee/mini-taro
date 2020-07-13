// import React, { Component } from 'react'
import {Button} from '@tarojs/components'
import TaroAlipay from '../../../utils/taro.alipay'
import Taro from '@tarojs/taro'
// import Taro, { Component } from '@tarojs/taro'

// import { Component } from '@tarojs/taro-h5';

export default class Auth extends Taro.Component {
  agreeAuth() {
    TaroAlipay.getAuthCode({scopes: 'auth_user'}).then(TaroAlipay.getAuthUserInfo).then((userInfo) => {
      Taro.showToast({
        title: `支付宝昵称: ${userInfo.nickName}，请使用邮箱登录`,
        icon: 'none'
      })
    }).catch((e) => {
      console.log(e)
      Taro.showToast({
        title: e.errorMessage,
        icon: 'none'
      })
    })
  }

  render() {
    return (
      <Button onClick={this.agreeAuth.bind(this)}>支付宝登录</Button>
    )
  }
}