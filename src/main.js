import Vue from 'vue';
import HeyUI from 'heyui';
import 'heyui/themes/index.css';
import comment from '@/components/comment/index';
import dialogQrcode from '@/components/dialog/qrcode/index';
Vue.use(HeyUI);
Vue.config.productionTip = false;

let jscmssdk = {};
comment.install(jscmssdk);
dialogQrcode.install(jscmssdk);

if (process.env.NODE_ENV === 'development') {
  window.jscmssdk = jscmssdk;
}
export default jscmssdk;