import {
  req,
  baseURL
} from '@/util/request';
import util from '@/util/util.js';
import formLogin from './components/form-login';
import formReg from './components/form-reg';
import jPopup from '@/ui/popup';
import jButton from '@/ui/button';

import iconSvgWeibo from '@/components/svg/IconWeibo';
import iconSvgGithub from '@/components/svg/IconGithub';
import iconSvgWechat from '@/components/svg/IconWechat';
import iconSvgClose from '@/components/svg/IconClose';

import store from 'store';

export default {
  components: {
    jPopup,
    jButton,
    formLogin,
    formReg,
    iconSvgWeibo,
    iconSvgGithub,
    iconSvgWechat,
    iconSvgClose
  },
  data() {
    return {
      isShow: false,
      type: 1, //1、登陆框 2、注册框、3、密码找回框
      title: '登陆',
      typeName: '手机',
      subtitle: util.g().CONSTANT.SUBTITLE,
      pupup: {
        show: false
      },
      isRember: false,
      form: {
        email: '',
        password: ''
      },
      callback: function () {}
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    type() {
      this.init();
    }
  },
  methods: {

    /**
     * 初始
     */
    init() {
      if (this.type === 1) {
        this.title = `登陆 - ${this.subtitle}`;
      } else if (this.type === 2) {
        this.title = `注册 - ${this.subtitle}`;
      }
    },

    /**
     * 提交
     */
    submit() {
      if (this.type === 1) {
        this.login();
      } else if (this.type === 2) {
        this.register();
      }
    },

    /**
     * 登陆
     */
    async login() {
      let res = await req.post('/api/front/user/login', this.form);
      let result = res.data;
      this.$Message({
        type: result.code === 0 ? 'success' : 'error',
        text: result.msg, 
        timeout: 3000
      });
      if (result.code !== 0 ) return;
      let token = result.data.token;
      let userInfo = result.data.userInfo;
      if (userInfo) userInfo.avatar = userInfo.avatar.indexOf('http') === -1 ? baseURL + userInfo.avatar : userInfo.avatar;
      store.set('token', token);
      store.set('uuid', userInfo._id);
      store.set('userInfo', userInfo);
      util.cookie.set('token', token);
      this.callback({
        type: 1,
        data: result.data
      });
      this.close();
    },

    /**
     * 注册
     */
    async register() {
      let checkReg = () => {
        if (!this.form.email) {
          return {
            code: 1,
            msg: '邮箱不能为空'
          }
        } else if (!this.form.password) {
          return {
            code: 1,
            msg: '密码不能为空'
          }
        } else if (!this.form.againPassword) {
          return {
            code: 1,
            msg: '再次输入的密码不能为空'
          }
        } else if (!this.form.vercode) {
          return {
            code: 1,
            msg: '验证码不能为空'
          }
        } else if (this.form.password !== this.form.againPassword) {
          return {
            code: 1,
            msg: '两次输入的密码不相同'
          }
        }
        return { code: 0 };
      }
      let checkRes = checkReg();
      if (checkRes.code === 1) {
        this.$Message({
          type: 'error',
          text: checkRes.msg, 
          timeout: 3000
        });
        return;
      };
      let res = await req.post('/api/front/user/register', this.form);
      let result = res.data;
      this.$Message({
        type: result.code === 0 ? 'success' : 'error',
        text: result.msg, 
        timeout: 3000
      });
      if (result.code === 0) {
        this.type = 1;
      }
    },
    
    /**
     * 显示弹窗
     */
    show(type = 1, callback = function(){}) {
      this.type = type;
      this.callback = callback;
      this.pupup.show = true;
    },

    /**
     * 关闭弹窗
     */
    close() {
      this.reset();
    },

    /**
     * 重置
     */
    reset() {
      this.isShow = false;
      this.type = 1; //1、登陆框 2、注册框、3、密码找回框
      this.title = '登陆';
      this.subtitle = util.g().CONSTANT.SUBTITLE;
      this.pupup = {
        show: false
      };
      this.form = {
        email: '',
        password: ''
      };
      this.callback = function () {};
    }
  }
}