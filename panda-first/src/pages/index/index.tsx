import React, { Component } from 'react'
import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'

import pic1 from '../../assets/default/1.jpg'
import pic2 from '../../assets/default/2.jpg'

import * as reddish from '@tarojs/redux'

console.log(reddish)

const primaryBannerList = [
  {typeTitle: '测试1', pic: pic1, targetId: 1, targetLink: 'https://www.baidu.com'},
  {typeTitle: '测试1', pic: pic2, targetId: 2, targetLink: 'https://www.baidu.com'},
]

type pageProps = {
  recommendPlayList: Array<{
    id: number,
    name: string,
    picUrl: string,
    playCount: number
  }>
}

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

export default class Index extends Component<pageProps, PageState> {
  constructor(props: pageProps) {
    super(props);
    this.state = {
      current: 0,
      showLoading: true,
      bannerList: [],
      searchValue: ""
    }
  }

  componentWillMount() {
    this.getBanner();
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getBanner() {
    this.setState({
      bannerList: primaryBannerList
    })
  }

  render() {
    const { showLoading, bannerList, searchValue } = this.state;
    return (
      <View className='index-page'>
        <Swiper className="swiper-list"
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
            {
              bannerList.map((item) => {
                return (
                  <SwiperItem key={item.targetId} className="swiper-list-item">
                    <Image className="swiper-list-item-img" 
                      src={item.pic} mode={"aspectFill"}/>
                  </SwiperItem>
                )
              })
            }
        </Swiper>

        <View className="box-wrapper">
          <Text className="title">人气歌单推荐</Text>
        </View>
      </View>
    )
  }
}
