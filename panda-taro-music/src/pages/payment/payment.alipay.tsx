import { Button } from '@tarojs/components'
import './payment.scss'
import * as React from 'react';
import { Component } from 'react';
import TaroAlipay from '../../utils/taro.alipay'
import Taro from '@tarojs/taro';

export default class Payment extends Component {
  handlePayment() {
    // 加入现在后端已经返回了tradeNo
    TaroAlipay.tradePay({
      tradeNO: '2017111521001104105336677922',  
    }).then((res) => {
      console.log(res)
    }).catch((e) => {
      Taro.showToast({
        title: JSON.stringify(e),
        icon: 'none'
      })
    })
  }

  render () {
    return (
      <Button onClick={this.handlePayment.bind(this)}>花呗支付</Button>
    )
  }
}
