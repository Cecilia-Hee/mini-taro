/*
 * @Author: Helijun
 * @Date: 2020-07-15 18:04:02
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-16 18:30:39
 * @Description: 
 */ 
export type MusicItemType = {
  name: string,
  id: number,
  ar: Array<{
    name: string
  }>,
  al: {
    name: string
  },
  song: {
    id: number
  },
  copyright: number,
  st?: number,
  current?: boolean
}


export type playListDetailInfoType = {
  coverImgUrl: string,
  playCount: number,
  shareCount: number,
  subscribedCount: number,
  commentCount: number,
  name: string,
  description?: string,
  tags: Array<string | undefined>,
  creator: {
    avatarUrl: string,
    nickname: string
  },
  tracks: Array<MusicItemType>
}

export type songType = {
  // 歌单详情
  playListDetailInfo: playListDetailInfoType,
  // 推荐歌单
  recommendPlayList: Array<{}>
}