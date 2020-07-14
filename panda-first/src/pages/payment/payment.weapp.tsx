import { Button } from '@tarojs/components'
import './payment.scss'
import * as React from 'react';
import { Component } from 'react';
import Taro from '@tarojs/taro';

export default class Payment extends Component {
  handlePayment() {
    Taro.requestPayment({
      nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
      package: 'prepay_id=*',
      signType: 'MD5',
      paySign: 'MD5(appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6',
      timeStamp: new Date().getTime().toString()
    }).then((res) => {
      console.log(res)
    }).catch((e) => {
      Taro.showToast({
        title: '授权失败',
        icon: 'none'
      })
    })
  }

  render () {
    return (
      <Button onClick={this.handlePayment.bind(this)}>微信支付</Button>
    )
  }
}
