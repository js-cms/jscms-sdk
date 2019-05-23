import config from './config/config';
import asyncRequire from './util/asyncRequire';
import cssLoader from './loader/css';
import jsLoader from './loader/js';
import vueLoader from './loader/vue';
import styleLoader from './loader/style';
import store from './util/store';

import vueComponentDialogQrcode from './components/dialog/qrcode/controller';
import vueComponentComment from './components/comment/controller';

class JscmsSdk {
  constructor(options = {}) {
    this.loadedCallbacks = [];
    this.loader = {
      css: cssLoader,
      js: jsLoader,
      vue: vueLoader,
      style: styleLoader
    }
  }

  _mountApi() {
    this.comment = {};
    this.comment.render = (options = {}) => {
      let { selector } = options;
      let parentEl = document.querySelector(selector);
      parentEl.innerHTML = '';
      let container = this._createDiv('', parentEl);
      return this._initVue({
        component: vueComponentComment,
        selector: `#${container.id}`,
        id: this._id()
      });
    }
    this.dialog = {};
    let tempDiv = this._createDiv();
    this.dialog.qrcode = this._initVue({
      component: vueComponentDialogQrcode,
      selector: `#${tempDiv.id}`,
      id: tempDiv.id
    });
  }

  _createDiv(id = '', parent = document.body) {
    let div = document.createElement('div');
    div.id = id || this._id();
    parent.appendChild(div);
    return div;
  }

  _id() {
    return `id_${Math.random().toString(36).substr(2)}`;
  }

  _initVue(options) {
    const { component, selector, id } = options;
    let styleId = 'vueStyle_' + id;
    styleLoader(component.style, styleId);
    let vueApp = new Vue(
      Object.assign({
        el: selector
      }, component)
    );
    window.less.refresh();
    return vueApp;
  }

  init(callback) {
    if (typeof callback === 'function') this.loadedCallbacks.push(callback);
    asyncRequire(config.asyncDependence, () => {
      this._mountApi();
      this.loadedCallbacks.forEach(cb => cb.call(this));
    });
  }

  loaded(callback) {
    if (typeof callback === 'function') this.loadedCallbacks.push(callback);
  }

  store(key, value) {
    return store(key, value);
  }
}

export default JscmsSdk;
