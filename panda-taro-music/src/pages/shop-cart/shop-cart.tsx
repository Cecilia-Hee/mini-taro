import { View, Text, Button } from '@tarojs/components'
import './shop-cart.scss'
import * as React from 'react';
import { Component } from 'react';

import Payment from '../payment/payment'

export default class ShopCart extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='shop-cart'>
        <Text>在这个页面调起支付流程</Text>
        <Payment></Payment>
      </View>
    )
  }
}
