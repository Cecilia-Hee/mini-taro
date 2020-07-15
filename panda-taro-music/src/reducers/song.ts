/*
 * @Author: Helijun
 * @Date: 2020-07-15 17:58:26
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-15 20:57:15
 * @Description: 
 */ 
import { GETRECOMMENDPLAYLIST } from '../constants/song.ts'

import {songType} from '../constants/commonTypes.ts'

const INITIAL_STATE : songType = {
  recommendPlayList: []
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
    
    default: 
      return state
  }
}