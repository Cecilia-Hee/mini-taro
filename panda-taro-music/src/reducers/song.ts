/*
 * @Author: Helijun
 * @Date: 2020-07-15 17:58:26
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-17 13:46:03
 * @Description: 
 */ 
import { 
  GETRECOMMENDPLAYLIST,
  GETPLAYLISTDETAIL,
  GETSONGINFO
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
  }
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
      const { playlist } = action.payload;
      return {
        ...state,
        playListDetailInfo: playlist,
        playListDetailPrivileges: action.payload.privileges
      }

    case GETSONGINFO:
      const { songs } = action.payload
      return {
        ...state,
        currentSongInfo: songs[0]
      }
    
    default: 
      return state
  }
}