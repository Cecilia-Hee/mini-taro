/*
 * @Author: Helijun
 * @Date: 2020-07-16 17:46:42
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-16 17:51:53
 * @Description: 
 */ 
// 格式化播放次数
export const formatCount = (times) => {
  let formateTime: any = 0;
  const yiyi = 100000000;
  const yiwan = 10000
  times = times ? Number(times) : 0;
  switch (true) {
    case times > yiyi:
      formateTime = `${(times / yiyi).toFixed(1)}亿`
      break;
    case times > yiwan:
      formateTime = `${(times / yiwan).toFixed(1)}万`
    default:
      formateTime = times
      break;
  }


  return formateTime
}