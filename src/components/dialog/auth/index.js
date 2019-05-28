import Vue from 'vue';
import template from './template';
import util from '@/util/util';

export default {
  install(jscmssdk) {
    if (!jscmssdk.dialog) jscmssdk.dialog = {};
    let el = util.createDiv();
    jscmssdk.dialog.auth = new Vue(
      Object.assign(template, {
        el: `#${el.id}`
      }
    ));
  }
}