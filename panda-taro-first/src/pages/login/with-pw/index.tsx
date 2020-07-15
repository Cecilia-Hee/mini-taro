import React, { Component } from 'react'

import { View, Input, Button } from '@tarojs/components'
import './index.scss'
import { md5 } from 'blueimp-md5';

export default class Login extends Component<any, any> {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loading: false
    }
  }

  handleInput = (key, e) => {
    this.setState({[key]: e.target.value})
  }

  handleLogin = () => {
    const payload = {
      username: this.state.username,
      password: this.state.password
    }
  }


  render() {
    const {username, password} = this.state
    return (
      <View className="login-wrapper">
        <View className="title">LOGO</View>
        <div className="item">
          <Input type="text" 
            value={username} 
            placeholder="账号"
            onInput={this.handleInput.bind(this, 'username')}
          />
          <div className="clear"></div>
        </div>
        <div className="item">
          <Input type="text" value={password} placeholder="密码"/>
          <div className="clear"></div>
        </div>
        <Button className="btn" onClick={this.handleLogin.bind(this)}>账号密码登录</Button>
      </View>
    )
  }
}