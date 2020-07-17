/*
 * @Author: Helijun
 * @Date: 2020-07-15 17:58:26
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-17 17:47:21
 * @Description: 
 */ 
import { 
  GETRECOMMENDPLAYLIST,
  GETPLAYLISTDETAIL,
  GETSONGINFO,
  CHANGEPLAYMODE
} from '../constants/song'

import {songType} from '../constants/commonTypes'

const INITIAL_STATE : songType = {
  recommendPlayList: [],
  playListDetailInfo: {
    coverImgUrl: '',
    name: '',
    shareCount: 0, 
    subscribedCount:0, 
    commentCount: 0,
    playCount: 0,
    tags: [],
    creator: {
      avatarUrl: '',
      nickname: ''
    },
    tracks: []
  },
  playListDetailPrivileges: [],
  currentSongInfo: {
    id: 0,
    name: '',   // 歌曲名称
    ar: [],
    al: {
      picUrl: '',   // 播放背景？
      name: ''      // ?
    },
    url: '',
    lrcInfo: '',   // 歌词信息
    dt: 0,     // 总时长
    st: 0, 
  },
  playMode: 'loop',
  currentSongIndex: 0,  // 当前歌曲的index
  canPlayList: [],
}

export default function song(state = INITIAL_STATE, action) {
  // console.log("=============================")
  // console.log(action);
  switch (action.type) {
    // 获取推荐列表
    case GETRECOMMENDPLAYLIST: 
      const {result} = action.payload 
      return {
        ...state,
        recommendPlayList: result
      }
    
    // 获取歌单详情
    case GETPLAYLISTDETAIL:
      const { playlist, privileges } = action.payload;
      let canPlayList = playlist.tracks.filter((item, index) => {
        return privileges[index].st !== -200
      })
      return {
        ...state,
        playListDetailInfo: playlist,
        playListDetailPrivileges: privileges,
        canPlayList
      }

    case GETSONGINFO:
      const { currentSongInfo } = action.payload
      let currentSongIndex = state.canPlayList.findIndex((item) => item.id === currentSongInfo.id)
      state.canPlayList.map((item, index) => {
        item.current = false;
        if(currentSongIndex === index) {
          item.current = true;
        }
        return item;
      })
      return {
        ...state,
        currentSongInfo,
        currentSongIndex,
        canPlayList: state.canPlayList
      }

    case CHANGEPLAYMODE: 
      const {playMode} = action.payload;
      return {
        ...state,
        playMode
      }
    
    default: 
      return state
  }
}