import fly from 'flyio';
import storejs from 'store';

const proApi = '/';
const devApi = '';

let _baseURL = process.env.NODE_ENV === 'development' ? devApi : proApi;

fly.interceptors.request.use((request) => {
  const token = storejs.get('token');
  // 给所有请求添加自定义header
  request.headers['authorization'] = token
  request.baseURL = baseURL
  return request
});

function Req(vueInstance) {
  //拦截请求
  fly.interceptors.response.use(
    response => {
      //只返回data
      return response.data;
    },
    err => {
      //发生网络错误后会走到这里
      //return Promise.resolve("ssss")
    }
  )
  return fly;
}

export let Request = Req;
export let req = fly;
export let baseURL = _baseURL;
