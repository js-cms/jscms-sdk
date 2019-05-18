/**
 * 把script标签挂载到html中
 * @param {String} url 脚本地址
 * @param {Function} callback  回调函数
 * @param {String} id 标签id
 */
export default function (url = '', callback = () => {}, id = '') {
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  if (id) script.id = id;
  if (typeof (callback) == 'function') {
    script.onload = script.onreadystatechange = function () {
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
        typeof callback === 'function' ? callback() : void(0);
        script.onload = script.onreadystatechange = null;
      }
    };
  }
  head.appendChild(script);
}
