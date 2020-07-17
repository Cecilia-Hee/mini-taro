import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'

import { add, minus, asyncAdd } from '../../actions/counter'

import { getSongInfo, changePlayMode, likeMusic } from '../../actions/song'
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
import songMusicBefore from '../../assets/images/aag.png'


// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制  
// 我感觉现在的问题是，大家都想做事情，但是没有太多的事情可以做，然后自己学习，又有些不得劲，虽然是学了
// 但是不知道最终的效果是怎么样的，也就是缺乏练习，所以我想着我们可以找一些开源项目做一做，或者我们自己做一些开源项目
// 提高工作的积极性&成就感

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
  getSongInfo: (params: object) => any
  changePlayMode: (object) => any
  likeMusic: (object) => any
}

type PageOwnProps = {}

type PageState = {
  songPlayModeImg: string;
  star: boolean,
  switchStar: boolean;  // 是否切换过状态
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Songdetail {
  props: IProps;
}

@connect(({ song }) => ({
  song
}), (dispatch) => ({
  getSongInfo (payload : object) {
    dispatch(getSongInfo(payload))
  },
  changePlayMode(payload: object) {
    dispatch(changePlayMode(payload))
  },
  likeMusic(payload: object) {
    dispatch(likeMusic(payload))
  }
}))
class Songdetail extends Component<IProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {
      songPlayModeImg: songPlayModeLoop,
      star: false,
      switchStar: false
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)

    // props有改变时，改变页面上的数据
    
    this.setSongInfo(nextProps.song.currentSongInfo)
  }

  // static getDerivedStateFromProps(nextProps, nextState) {
  //   console.log('getDerivedStateFromProps:', nextProps, nextState)
  //   Songdetail.prototype.setSongInfo(nextProps.song.currentSongInfo)
  //   return null;
  // }

  componentWillUnmount () { }

  componentDidMount() {
    const { id } = getCurrentInstance().router.params
    this.props.getSongInfo({id: id});
    this.computePlayMode();
    
  }

  componentDidShow () { }

  componentDidHide () { }

  setSongInfo(songInfo) {
    const {name, al, url, lrcInfo } = songInfo;
    Taro.setNavigationBarTitle({
      title: name
    })
    // 设置播放器相关
    // backgroundAudioManager.title = name;
    // backgroundAudioManager.coverImgUrl = al.picUrl;
    // backgroundAudioManager.src = url;
  }

  // 得到初始的播放模式
  computePlayMode() {
    const playMode = this.props.song.playMode
    switch (playMode) {
      case 'one':
        this.setState({
          songPlayModeImg: songPlayModeOne
        })
        break;
      case 'shuffle':
        this.setState({
          songPlayModeImg: songPlayModeShuffle
        })
        break;
      default:
        this.setState({
          songPlayModeImg: songPlayModeLoop
        })
        break;
    }
  }

  // 修改歌曲播放模式
  changePlayMode() {
    let { playMode } = this.props.song;
    console.log(playMode)
    if(playMode === 'loop') {
      playMode = 'one',
      this.setState({
        songPlayModeImg: songPlayModeOne
      })
      Taro.showToast({
        title: '单曲循环',
        icon: 'none',
        duration: 2000
      })
    } else if(playMode === 'one') {
      playMode = 'shuffle',
      this.setState({
        songPlayModeImg: songPlayModeShuffle
      })
      Taro.showToast({
        title: '随机播放',
        icon: 'none',
        duration: 2000
      })
    } else if(playMode === 'shuffle') {
      playMode = 'loop',
      this.setState({
        songPlayModeImg: songPlayModeLoop
      })
      Taro.showToast({
        title: '列表循环',
        icon: 'none',
        duration: 2000
      })
    }

    this.props.changePlayMode({playMode})
  }

  // 切换到前一首歌
  getPrevSong() {
    const {currentSongIndex, canPlayList, playMode} = this.props.song
    let preSongIndex = currentSongIndex - 1;
    if(playMode === 'shuffle') {
      // 随机播放
      return;
    }
    if(currentSongIndex == 0) {
      preSongIndex = canPlayList.length - 1;
    }
    this.props.getSongInfo({
      id: canPlayList[preSongIndex].id
    })
  }

  // 切换到下一首歌
  getNextSong() {
    const {currentSongIndex, canPlayList, playMode} = this.props.song
    let nextSongIndex = currentSongIndex + 1;
    if(playMode === 'shuffle') {
      // 
      return;
    }
    if(currentSongIndex === canPlayList.length + 1) {
      nextSongIndex = 0;
    }
    this.props.getSongInfo({
      id: canPlayList[nextSongIndex].id
    })
  }

  // 标记收藏&喜
  likeMusic() {
    const {star} = this.state
    const { id } = this.props.song.currentSongInfo
    this.props.likeMusic({
      id,
      like: !star
    });
    this.setState({
      switchStar: true
    })
  }

  render () {
    const { currentSongInfo } = this.props.song
    const { songPlayModeImg, star } = this.state
    return (
      <View className='song-detail'>
        {/* 背景，这里加了高斯模糊 */}
        <Image className="song-detail-bg" src={currentSongInfo.al.picUrl} />

        {/* 音乐转盘 */}
        <View className="song-music">
          <View className="song-music-main">
            <Image src={songMusicBefore} className="song-music-main-before"/>
            <View className="song-music-main-cover">
              <View className="song-music-main-img">
                <Image src={currentSongInfo.al.picUrl} className="song-music-main-img-cover"/>
              </View>
            </View>
          </View>
          <View className="song-mudic-lgour">
            <View className="song-music-lgour-cover"></View>
          </View>
        </View>

        {/* 底部操作按钮们 */}
        <View className="song-bottom">
          <View className="song-operation">
            <Image src={songPlayModeImg} className="song-operation song-operation-mode"  onClick={this.changePlayMode.bind(this)}/>
            <Image src={songOperationPrev} className="song-operation song-operation-prev" onClick={this.getPrevSong.bind(this)} />
            <Image src={songOperationPlayPause} className="song-operation song-operation-play"/>
            <Image src={songOperationNext} className="song-operation song-operation-next" onClick={this.getNextSong.bind(this)}/>
            <Image src={star ? songOperationLiked : songOperationLike} className="song-operation song-operation-like" onClick={this.likeMusic.bind(this)}/>
          </View>
        </View>
        
      </View>
    )
  }
}

export default Songdetail

