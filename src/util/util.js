/**
 * 工具库
 */
let util = {};

/**
 * 毫秒转换友好的显示格式
 * 输出格式：21小时前
 * @param  {Number} date 时间戳
 * @return {Stirng} 返回友好时间格式
 */
util.beautifyDate = function (datetime) {
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
    return util.dateFormat(datetime, 'yyyy-MM-dd hh:mm');
  }
}

/**
 * 添加样式标签
 * @param {String} styleString css代码
 * @param {String} id 标签id
 */
util.addStyle = function (styleString = '', id = '') {
  let style = document.createElement("style");
  style.type = "text/less";
  if (id) style.id = id;
  try {
    style.appendChild(document.createTextNode(styleString));
  } catch (ex) {
    style.styleSheet.cssText = styleString; //针对IE
  }
  let head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}

/**
 * 获取滚动条高度
 */
util.getScrollTop = function () {
  let scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
};

/**
 * 日期处理函数
 * @param {Number} datetime 时间戳
 * @param {String} fmt 日期格式
 */
util.dateFormat = function (datetime, fmt) {
  let date = new Date(datetime);
  //author: meizz 
  let o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 生存随机id
 */
util.id = function() {
  return `id_${Math.random().toString(36).substr(2)}`;
}

/**
 * 创建新的div
 */
util.createDiv = function(id = '', parent = document.body) {
  let div = document.createElement('div');
  div.id = id || util.id();
  parent.appendChild(div);
  return div;
}

/**
 * 返回Global变量中的jscms常量
 */
util.g = function () {
  if (!window.__JSCMS_CONSTANT__) {
    window.__JSCMS_CONSTANT__ = {};
  }
  return window.__JSCMS_CONSTANT__;
}

export default util;