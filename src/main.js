import Vue from 'vue';
import HeyUI from 'heyui';
import '@/style/theme.less';
import comment from '@/components/comment/index';
import dialogQrcode from '@/components/dialog/qrcode/index';
import dialogAuth from '@/components/dialog/auth/index';

Vue.use(HeyUI);
Vue.config.productionTip = false;

let jscmssdk = {};
comment.install(jscmssdk);
dialogQrcode.install(jscmssdk);
dialogAuth.install(jscmssdk);

if (process.env.NODE_ENV === 'development') {
  window.jscmssdk = jscmssdk;
}
export default jscmssdk;