import Vue from 'vue'
import App from './App.vue'
import HeyUI from 'heyui';
import comment from '@/components/comment/index';
Vue.use(HeyUI);
Vue.config.productionTip = false;

async function main() {
  new Vue({
    render: h => h(App),
  }).$mount('#app');
}

if (process.env.NODE_ENV === 'development') {
  main();
}

let jscmssdk = {};
comment.install(jscmssdk);

export default jscmssdk;