import dateFormat from './dateFormat.js';

/**
 * 毫秒转换友好的显示格式
 * 输出格式：21小时前
 * @param  {Number} date 时间戳
 * @return {Stirng} 返回友好时间格式
 */
export default function beautifyDate(datetime) {
  function p(s) {
    return s < 10 ? '0' + s : s;
  }
  //获取js 时间戳
  let time = new Date().getTime();
  //去掉 js 时间戳后三位，与php 时间戳保持一致
  time = parseInt((time - datetime) / 1000);
  //存储转换值 
  let s = '';
  if (time < 60 * 10) { //十分钟内
    return '刚刚';
  } else if ((time < 60 * 60) && (time >= 60 * 10)) {
    //超过十分钟少于1小时
    s = Math.floor(time / 60);
    return s + "分钟前";
  } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
    //超过1小时少于24小时
    s = Math.floor(time / 60 / 60);
    return s + "小时前";
  } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
    //超过1天少于3天内
    s = Math.floor(time / 60 / 60 / 24);
    return s + "天前";
  } else {
    //超过3天
    return dateFormat(datetime, 'yyyy-MM-dd hh:mm');
  }
}
