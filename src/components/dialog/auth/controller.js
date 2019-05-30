import util from '@/util/util.js';
import formLogin from './components/form-login';
import formReg from './components/form-reg';

import iconSvgWeibo from '@/components/svg/IconWeibo';
import iconSvgGithub from '@/components/svg/IconGithub';
import iconSvgWechat from '@/components/svg/IconWechat';

export default {
  components: {
    formLogin,
    formReg,
    iconSvgWeibo,
    iconSvgGithub,
    iconSvgWechat
  },
  data() {
    return {
      isShow: false,
      type: 1, //1、登陆框 2、注册框、3、密码找回框
      title: '登陆',
      subtitle: util.g().CONSTANT.SUBTITLE,
      form: {
        email: '',
        password: ''
      }
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    type(val) {
      console.log(val);
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
     * 登陆
     */
    login() {
      console.log(this.form);
    },
    /**
     * 注册
     */
    register() {

    },
    /**
     * 显示弹窗
     */
    show() {
      this.isShow = true;
    },
    /**
     * 关闭弹窗
     */
    close() {

    }
  }
}