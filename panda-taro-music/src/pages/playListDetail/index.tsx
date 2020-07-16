import * as React from 'react';
import { connect } from 'react-redux'
import { Component } from 'react';
import { getCurrentInstance } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'

import { add, minus, asyncAdd } from '../../actions/counter'
import {songType} from '../../constants/commonTypes'

import './index.scss'
import { getPlayListDetail } from '../../actions/song';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  song: songType
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
  getPlayListDetail: (params: object) => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Playlistdetail {
  props: IProps;
}

@connect(({ song }) => ({
  song
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  },
  getPlayListDetail(payload) {
    dispatch(getPlayListDetail(payload))
  }
}))
class Playlistdetail extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    const {id} = getCurrentInstance().router.params
    this.props.getPlayListDetail({id})
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='playlist-detail'>
        <View className="playlist-info">
          <View className="playlist-top-wrapper">
            <View className="left-wrapper">
              <Image src={''} className="left-img"/>
            </View>
            <View className="right-wrapper">
              <View className="right-name">歌单名称</View>
              <View className="right-bl">来自于啥</View>
              <View className="right-desc">描述</View>
            </View>
          </View>
          <View className="bottom-wrapper">
            <View className="bottom-item">
              <View className="at-icon at-icon-message"></View>
              <View>2334</View>
            </View>
            <View className="bottom-item">
              <View className="at-icon at-icon-share"></View>
              <View>1789</View>
            </View>
            <View className="bottom-item">
              <View className="at-icon at-icon-download-cloud"></View>
              <View>下载</View>
            </View>
            <View className="bottom-item">
              <View className="at-icon at-icon-check-circle"></View>
              <View>多选</View>
            </View>
          </View>
        </View>
        
        <View className="playlist-wrapper">
          <View className="playlist-title">歌曲列表</View>
          <View className="playlist-list">
            <View className="playlist-item">
              <Text className="item-index">1</Text>
              <View className="item-music">
                <Text className="item-music-name">歌曲名称</Text>
                <Text className="item-music-album">演唱者姓名-专辑名称</Text>
              </View>
              <Text className="at-icon at-icon-chevron-right item-more"></Text>
            </View>
            <View className="playlist-item">
              <Text className="item-index">1</Text>
              <View className="item-music">
                <Text className="item-music-name">歌曲名称</Text>
                <Text className="item-music-album">演唱者姓名-专辑名称</Text>
              </View>
              <Text className="at-icon at-icon-chevron-right item-more"></Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Playlistdetail

