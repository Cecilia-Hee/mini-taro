import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text, Swiper, SwiperItem, Image } from '@tarojs/components'

import { add, minus, asyncAdd } from '../../actions/counter'
import api from '../../service/request'

import {
  getRecommendPlayList
} from '../../actions/song'

import './index.scss'

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
  counter: {
    num: number
  };
  recommendPlayList: Array<{
    id: number,
    name: string,
    picUrl: string,
    playCount: number // 播放数量
  }>
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
  getRecommendPlayList: () => any
}

type PageOwnProps = {}

type PageState = {
  current: number;
  showLoading: boolean;
  bannerList: Array <{
    typeTitle: string,
    pic: string,
    targetId: number,
    targetLink: string
  }>;
  searchValue: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({counter, song}) => ({
  counter,
  recommendPlayList: song.recommendPlayList
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
  getRecommendPlayList () {
    dispatch(getRecommendPlayList())
  }
}))

class Index extends Component<IProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      showLoading: true,
      bannerList: [],
      searchValue: ""
    };
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
    this.setState({
      showLoading: false
    });
  }

  componentWillMount() {
    this.getPersonalRecommendList();
    this.getBanner();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 获取banner
  getBanner() {
    api.get('/banner', {
      type: 2
    }).then(({data}) => {
      if(data.banners) {
        this.setState({
          bannerList: data.banners
        })
      }
    })
  }

  getPersonalRecommendList() {
    this.props.getRecommendPlayList();
  }

  render () {
    console.log(this.props)
    const { showLoading, bannerList, searchValue } = this.state;
    const { recommendPlayList, song } = this.props;
    return (
      <View className='index-page'>
        {/* <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View> */}

        <Swiper className="swiper-list"
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
            {
              bannerList.map((item, index) => {
                return (
                  <SwiperItem key={index + item.targetId} className="swiper-list-item">
                    <Image className="swiper-list-item-img" 
                      src={item.pic} mode={"aspectFill"}/>
                  </SwiperItem>
                )
              })
            }
        </Swiper>
        <View className="box-wrapper recommend-list">
          <View className="recommend-list-title">推荐歌单</View>
          <View className="recommend-list-content">
            {
              recommendPlayList.map((item, index) => {
                return (
                  <View key={item.id}>
                    <Image src={item.picUrl}/>
                    <View>标题</View>
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

export default Index

