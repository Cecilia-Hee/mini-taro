/*
 * @Author: Helijun
 * @Date: 2020-07-15 17:16:50
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-17 18:06:07
 * @Description: 
 */ 
import Taro from '@tarojs/taro'
import createAction from '../service/redux'
import api from '../service/request'
import { parse_lrc } from '../utils/common';

import {
  GET_RECOMMEND_LIST,
  GET_PALYLIST_DETAIL,
  GET_SONG_INFO,
  GET_SONG_LYRIC,
  GET_SONG_URL,
  LIKE_MUSIC
} from '../constants/api'
import {
  GETRECOMMENDPLAYLIST,
  GETPLAYLISTDETAIL,
  GETSONGINFO,
  CHANGEPLAYMODE,
  UPDATELIKEMUSICLIST
} from '../constants/song'


// export const getRecommendPlayList = () => {
//   return dispatch => {
//     api.get('/personalized').then((res) => {
//       const recommendPlayList = res.data.result;
//       dispatch({
//         type: GETRECOMMENDPLAYLIST,
//         payload: {
//           recommendPlayList
//         }
//       })
//     })
//   }
// }

// 获取每日推荐歌单
export const getRecommendPlayList = payload => createAction({
  url: GET_RECOMMEND_LIST,
  type: GETRECOMMENDPLAYLIST,
  payload
})

// 获取歌单详情
export const getPlayListDetail = payload => createAction({
  url: GET_PALYLIST_DETAIL,
  type: GETPLAYLISTDETAIL,
  payload
})

// 获取当前播放歌曲的详细信息
export const getSongInfo = payload => {
  const {id} = payload
  return dispatch => {
    api.get(GET_SONG_INFO, {
      ids: id
    }).then((res) => {
      let songInfo = res.songs[0];
      api.get(GET_SONG_URL, {
        id
      }).then((res) => {
        songInfo.url = res.data[0].url;
        api.get(GET_SONG_LYRIC, {
          id
        }).then((res) => {
          const lrc = parse_lrc(res.lrc && res.lrc.lyric ? res.lrc.lyric : '');
          res.lrclist = lrc.now_lrc;
          res.srcoll = lrc.scroll ? 1 : 0
          songInfo.lrcInfo = res;        
        }).catch((e) => {
          console.log('获取歌词失败', e)
          Taro.showToast({
            title: '获取歌词失败'
          })
        }).finally(() => {
          dispatch({
            type: GETSONGINFO,
            payload: {
              currentSongInfo: songInfo
            }
          })
        })
      }).catch((e) => {
        console.log('获取歌曲URL失败', e)
        Taro.showToast({
          title: '获取歌曲URL失败'
        })
        dispatch({
          type: GETSONGINFO,
          payload: {
            currentSongInfo: songInfo
          }
        })
      })
      // api.get('')
    })
  }
  
  // return {
  //   // url: GET_SONG_INFO,
  //   type: GETSONGINFO,
  //   payload
  // }
  
}

// 改变歌曲的播放模式
export const changePlayMode = payload => {
  return {
    type: CHANGEPLAYMODE,
    payload
  }
}

// 标记喜欢&收藏某首歌
export const likeMusic = payload => {
  const {like, id} = payload;
  return dispatch => {
    api.get(LIKE_MUSIC, {
      id,
      like
    }).then((res) => {
      if(res.code === 200) {
        dispatch({
          type: UPDATELIKEMUSICLIST,
          payload: {
            like,
            id
          }
        })
      }
    })
  }
}