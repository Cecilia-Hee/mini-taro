/*
 * @Author: Helijun
 * @Date: 2020-07-15 17:58:26
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-15 18:04:34
 * @Description: 
 */ 
import { GETRECOMMENDPLAYLIST } from '../constants/song'

import {songType} from '../constants/commonTypes'

const INITIAL_STATE : songType = {
  recommendPlayList: []
}

export default function song(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GETRECOMMENDPLAYLIST: 
      const {recommendPlayList} = action.payload 
      return {
        ...state,
        recommendPlayList
      }
    
    default: 
      return state
  }
}