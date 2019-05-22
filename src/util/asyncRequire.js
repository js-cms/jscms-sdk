import cssLoader from '../loader/css.js';
import jsLoader from '../loader/js.js';
import vueLoader from '../loader/vue.js';

/**
 * 异步加载类库
 * @param {String} param 
 */
export default function asyncRequire(param, callback = () => {}) {
  let array = typeof param === 'string' ? [param] : param;
  let length = array.length;
  array.forEach(function (item) {
    let variable = item.variable;
    let url = item.url;
    let type = item.type;
    let after = item.after || function () {}
    let loader = (url, callback) => {};
    switch (type) {
      case 'css': loader = cssLoader; break;
      case 'vue': loader = vueLoader; break;
      default: loader = jsLoader;
    }
    loader({
      url,
      variable,
      callback: () => {
        length--;
        if (length <= 0) {
          after();
          callback()
        }
      }
    });
  });
}