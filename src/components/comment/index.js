import Vue from 'vue';
import template from './template';

export default {
  install(jscmssdk) {
    jscmssdk.comment = {
      render(options) {
        new Vue({
          render: h => h(template),
        }).$mount(options.selector);
      }
    };
  }
}