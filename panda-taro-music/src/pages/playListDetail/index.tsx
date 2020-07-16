import * as React from 'react';
import { connect } from 'react-redux'
import { Component } from 'react';
import { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { formatCount } from '../../utils/common'
import { add, minus, asyncAdd } from '../../actions/counter'
import { songType } from '../../constants/commonTypes'
import Taro from '@tarojs/taro'
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
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  },
  getPlayListDetail(payload) {
    dispatch(getPlayListDetail(payload))
  }
}))
class Playlistdetail extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    const { id, name } = getCurrentInstance().router.params
    this.props.getPlayListDetail({ id })
    Taro.setNavigationBarTitle({
      title: name
    });
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  playSong(songId:number, playStatus: number) {
    if(playStatus === 0) {
      Taro.navigateTo({
        url: `/pages/songDetail/index?id=${songId}`
      })
    } else {
      Taro.showToast({
        title: '暂无版权',
        icon: 'none'
      })
    }
    
  }

  render() {
    const { playListDetailInfo, playListDetailPrivileges } = this.props.song
    return (
      <View className='playlist-detail'>
        <View className="playlist-info">
          {/* <!-- 背景 --> */}
          <View className="playlist-info-bg">
            <Image src={playListDetailInfo.coverImgUrl} mode="heightFix" />
          </View>

          {/* 内容 */}
          <View className="playlist-info-main">
            <View className="playlist-top-wrapper">
              <View className="left-wrapper">
                <Image src={playListDetailInfo.coverImgUrl} className="left-img" />
                <View className="left-num">
                  <Text className="at-icon at-icon-sound"></Text>
                  {formatCount(playListDetailInfo.playCount)}
                </View>
              </View>
              <View className="right-wrapper">
                <View className="right-name">{playListDetailInfo.name}</View>
                <View className="right-creator">
                  <Image className="right-creator-img" src={playListDetailInfo.creator.avatarUrl}/>
                  <Text>{playListDetailInfo.creator.nickname}</Text>
                </View>
                <View className="right-desc">{playListDetailInfo.description}</View>
              </View>
            </View>
            <View className="bottom-wrapper">
              <View className="bottom-item">
                <View className="at-icon at-icon-message"></View>
                <View>{playListDetailInfo.commentCount}</View>
              </View>
              <View className="bottom-item">
                <View className="at-icon at-icon-share"></View>
                <View>{playListDetailInfo.shareCount}</View>
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
        </View>

        <View className="playlist-wrapper">
          <View className="playlist-title-wrapper">
            <Text className="playlist-title">歌曲列表</Text>
            <View className="playlist-tosub">收藏{playListDetailInfo.subscribedCount}</View>
          </View>
          <View className="playlist-list">
            {
              playListDetailInfo.tracks.map((track, index) => {
                return (
                  <View className="playlist-item" key={track.id} onClick={this.playSong.bind(this,track.id, playListDetailPrivileges[index].st)}>
                    <Text className="item-index">{index + 1}</Text>
                    <View className="item-music">
                      <Text className="item-music-name">{track.name}</Text>
                      <Text className="item-music-album">{track.ar[0] ? track.ar[0].name : ""} - {track.al.name}</Text>
                    </View>
                    <Text className="at-icon at-icon-chevron-right item-more"></Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}

export default Playlistdetail

