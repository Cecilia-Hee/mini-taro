/*
 * @Author: Helijun
 * @Date: 2020-07-16 17:46:42
 * @LastEditors: Helijun
 * @LastEditTime: 2020-07-17 17:14:46
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

// 转换歌词字符串为数组
export const parse_lrc = (lrc_content: string) => {
  let now_lrc: Array<{
    lrc_text: string,
    lrc_sec?: number
  }> = []; // 声明一个临时数组
  let lrc_row: Array<string> = lrc_content.split("\n"); // 将原始的歌词通过换行符转为数组
  let scroll = true; // 默认scroll初始值为true
  for (let i in lrc_row) {
    if ((lrc_row[i].indexOf(']') === -1) && lrc_row[i]) {
      now_lrc.push({ lrc_text: lrc_row[i] })
    } else if (lrc_row[i] !== '') {
      let tmp: string[] = lrc_row[i].split("]")
      for (let j in tmp) {
        scroll = false
        let tmp2: string = tmp[j].substr(1, 8)
        let tmp3: any = tmp2.split(":")
        let lrc_sec: any = Number(tmp3[0] * 60 + Number(tmp3[1]))
        if (lrc_sec && (lrc_sec > 0)) {
          let lrc = (tmp[tmp.length - 1]).replace(/(^\s*)|(\s*$)/g, "")
          lrc && now_lrc.push({ lrc_sec: lrc_sec, lrc_text: lrc })
        }
      }
    }
  }
  if (!scroll) {
    now_lrc.sort(function (a: {lrc_sec: number, lrc_text: string}, b: {lrc_sec: number, lrc_text: string}) : number {
      return a.lrc_sec - b.lrc_sec;
    });
  }
  return {
    now_lrc: now_lrc,
    scroll: scroll
  };
}