// import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {Button} from '@tarojs/components'
import * as React from 'react';
import { Component } from 'react';

export default class Auth extends Component {
  agreeAuth () {
    // Taro.showToast('Taro')
    Taro.getUserInfo().then((res) => {
      const { errMsg, userInfo } = res;
      if(errMsg === 'getUserInfo:ok') {
        Taro.showToast({
          title: `你好啊，${userInfo.nickName}`,
          icon: 'none'
        })
      } else {
        Taro.showToast({
          title: '授权失败',
          icon: 'none'
        })
      }
    })
  }

  render() {
    return (
      <Button onClick={this.agreeAuth.bind(this)}>微信登录</Button>
    )
  }
}