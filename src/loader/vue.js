import ajax from '../util/ajax.js';

/**
 * 解析vue单文件
 * @param {string} url 脚本地址
 * @param {function} callback  回调函数   
 */
export default function (url = '', callback = () => {}) {
  let templateReg = /<template>([\d\D]*)?<\/template>/gmi;
  let scriptReg = /<script>([\d\D]*)?<\/script>/gmi;
  let styleReg = /<style>([\d\D]*)?<\/style>/gmi;
  ajax({
    url: url,
    type: 'GET',
    success: function(res) {
      let template = templateReg.exec(res)[1];
      let script = scriptReg.exec(res)[1];
      let style = styleReg.exec(res)[1];
      let obj = eval('('+script.replace('export default {', 'function () { return {')+'})()');
      let component = Object.assign({
        style: style,
        template: template
      }, obj);
      callback(component);
    }
  });
}