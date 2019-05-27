import Vue from 'vue'
import App from './App.vue'
import HeyUI from 'heyui';
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

export default function() {
  main();
}