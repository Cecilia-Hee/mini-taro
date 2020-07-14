import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'

console.log(Taro)

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {  
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
