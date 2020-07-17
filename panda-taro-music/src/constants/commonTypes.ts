/*
 * @Author: Helijun
 * @Date: 2020-07-15 18:04:02
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-17 11:26:43
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

export type curentSongInfoType = {
  id: number,
  name: string,   // 歌曲名称
  ar: Array<{     // ?
    name: string
  }>,
  al: {
    picUrl: string,   // 播放背景？
    name: string      // ?
  },
  url: string,
  lrcInfo: any,   // 歌词信息
  dt: number,     // 总时长
  st: number,     // 是否喜欢
}

export type songType = {
  // 歌单详情
  playListDetailInfo: playListDetailInfoType,
  // 歌单详情权限
  playListDetailPrivileges: Array<{
    st: number
  }>
  // 推荐歌单
  recommendPlayList: Array<{}>,

  // 当前播放的歌曲详情
  currentSongInfo: curentSongInfoType
}