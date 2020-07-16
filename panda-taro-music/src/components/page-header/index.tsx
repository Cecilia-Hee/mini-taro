import * as React from 'react';
import { View } from '@tarojs/components'
import './index.scss'
// import { AtButton } from 'taro-ui'
export interface PageHeaderProps {
  
}
 
export interface PageHeaderState {
  
}
 
class PageHeader extends React.Component<PageHeaderProps, PageHeaderState> {
  // state = { :  }
  render() { 
    return ( 
      <View className="page-top-wrapper">
        <View className="setting">
          <View className='at-icon at-icon-bullet-list'></View>
        </View>
        <View className="top-tab-wrapper">
          <View className="top-tab-item">我的</View>
          <View className="top-tab-item active">发现</View>
          <View className="top-tab-item">云村</View>
          <View className="top-tab-item">视频</View>
        </View>
        <View className="search">
          <View className='at-icon at-icon-search'></View>
        </View>
      </View>
    );
  }
}
 
export default PageHeader;