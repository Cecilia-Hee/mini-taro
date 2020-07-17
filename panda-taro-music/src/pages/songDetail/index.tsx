import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'

import { add, minus, asyncAdd } from '../../actions/counter'

import { getSongInfo } from '../../actions/song'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import './index.scss'
import { songType } from 'src/constants/commonTypes';

const backgroundAudioManager = Taro.getBackgroundAudioManager();  // 后面会设置它的播放器相关属性

import songPlayModeLoop from '../../assets/images/song/icn_loop_mode.png'
import songPlayModeOne from '../../assets/images/song/icn_one_mode.png'
import songPlayModeShuffle from '../../assets/images/song/icn_shuffle_mode.png'
import songOperationPrev from '../../assets/images/ajh.png'
import songOperationPlayOn from '../../assets/images/ajd.png'
import songOperationPlayPause from '../../assets/images/ajf.png'
import songOperationNext from '../../assets/images/ajb.png'
import songOperationLike from '../../assets/images/song/play_icn_love.png'
import songOperationLiked from '../../assets/images/song/play_icn_loved.png'


// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制  
// 我觉得现在的生活挺好的，比较平稳，除了工作还没有着落之外，其他的基本上都在轨道上走，
// 我不想有什么风浪，我希望你也是这样想的
// 你们之前的事情，我不想记得，既然她来了北京，必然会约你吃饭啥的，你自己做决定
// 既然现在我是你女朋友，我希望你会尊重我，考虑我的感受，实话说我不喜欢她，不只是因为你们之前的暧昧关系让我非常难受
// 我还觉得她这个人太小气，上次是微博取关，这次是屏蔽朋友圈，30岁的人了，真的不至于，幼不幼稚，
// 我和她是永远不可能成为朋友的，我只想我的生活跟她没有任何交集，离的越远越好
// 当然了，我不喜欢的人，自然也不愿意你过多接触，我希望你能考虑到我的感受
// 当然了，如果，你真的禁不住诱惑了，真的要去赴约啥的，也请你告诉我，不要以为瞒着我我就不会知道了，瞒着我我会更生气
// 你可以有暧昧对象，我也会找一个，不就是跟人暧昧，谁不会一样
// 还有，每次我跟你说这些的时候，你都像个吃瓜群众一样，看着我和她暗自撕逼，不要忘了她这么对我，都是因为你
// 而且你现在是我男朋友，你有必要让我觉得有安全感，不要让这些乱七八糟的事情，打乱我们的生活

// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  },
  song: songType
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
  getSongInfo: (params: object) => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Songdetail {
  props: IProps;
}

@connect(({ song }) => ({
  song
}), (dispatch) => ({
  getSongInfo (payload : object) {
    dispatch(getSongInfo(payload))
  }
}))
class Songdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)

  //   // props有改变时，改变页面上的数据
    
  //   // this.setSongInfo(nextProps.song.currentSongInfo)
  // }

  static getDerivedStateFromProps(nextProps, nextState) {
    console.log('getDerivedStateFromProps:', nextProps, nextState)
    Songdetail.prototype.setSongInfo(nextProps.song.currentSongInfo)
    return null;
  }

  componentWillUnmount () { }

  componentDidMount() {
    const { id } = getCurrentInstance().router.params
    this.props.getSongInfo({ids: id});
    
  }

  componentDidShow () { }

  componentDidHide () { }

  setSongInfo(songInfo) {
    const {name, al, url, lrcInfo } = songInfo;
    Taro.setNavigationBarTitle({
      title: name
    })
    // 设置播放器相关
    backgroundAudioManager.title = name;
    backgroundAudioManager.coverImgUrl = al.picUrl;
    backgroundAudioManager.src = url;
  }

  render () {
    const { currentSongInfo } = this.props.song
    return (
      <View className='song-detail'>
        <Image className="song-detail-bg" src={currentSongInfo.al.picUrl} />

        <View className="song-bottom">
          <View className="song-operation">
            <Image src={songPlayModeLoop} className="song-operation-mode"/>
            <Image src={songOperationPrev} className="song-operation-prev"/>
            <Image src={songOperationPlayPause} className="song-operation-play"/>
            <Image src={songOperationNext} className="song-operation-next"/>
            <Image src={songOperationLike} className="song-operation-like"/>
          </View>
        </View>
        
      </View>
    )
  }
}

export default Songdetail

