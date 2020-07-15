import Taro from '@tarojs/taro'
import * as React from 'react';
import { Component } from 'react';
import {Button} from '@tarojs/components'

export default class Auth extends Component {
  constructor() {
    super()
  }
  handleClick() {
    Taro.navigateTo({
      url: '/pages/login/with-pw/index'
    })
  }
  render() {
    return (
      <Button onClick={this.handleClick.bind(this)}>登录</Button>
    )
  }
}