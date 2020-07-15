// import React, { Component } from 'react'
import {Button} from '@tarojs/components'
import TaroAlipay from '../../../utils/taro.alipay'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'

export default class Auth extends Component {
  agreeAuth() {
    // 支付宝小程序需要关联应用后才可以授权成功，即关联到对应的小程序上
    TaroAlipay.getAuthCode({scopes: 'auth_base'}).then(TaroAlipay.getOpenUserInfo).then((userInfo) => {
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
      <Button onClick={this.agreeAuth.bind(this)} open-type="getAuthorize">支付宝登录</Button>
    )
  }
}