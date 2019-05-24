import store from './store.js';

const headers = {
  authorization: store('token')
}

/**
 * 封装jquery.ajax请求数据
 * @param {Object} options 
 */
function request(options) {
  let { type, url, params, callback } = options;
  const $ = window.jQuery;
  $.ajax({
    headers: headers,
    url: url,
    type: type,
    data: params,
    dataType: 'json',
    success: callback
  })
}

export default {
  post(url, params) {
    return {
      then(callback = ()=>{}) {
        request({
          type: 'post',
          url,
          params,
          callback
        });
      }
    }
  },
  get(url, params) {
    return {
      then(callback = ()=>{}) {
        request({
          type: 'get',
          url,
          params,
          callback
        });
      }
    }
  }
}