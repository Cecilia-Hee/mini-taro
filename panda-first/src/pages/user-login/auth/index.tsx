import Taro from '@tarojs/taro'
import * as React from 'react';
// import { Component } from 'react';
import {Button} from '@tarojs/components'

export default class Auth extends Taro.Component {
  constructor() {
    super()
  }
  handleClick() {
    Taro.showToast({
      title: '跳转到账号密码登录',
      icon: 'none'
    })
  }
  render() {
    return (
      <Button onClick={this.handleClick.bind(this)}>登录</Button>
    )
  }
}