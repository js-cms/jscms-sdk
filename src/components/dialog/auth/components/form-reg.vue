<template>
  <div class="form">
    <div class="form-item">
      <j-input name="username" iClass="fa fa-envelope-o" p="请输入邮箱" v-model="form.email"></j-input>
    </div>
    <div class="form-item">
      <j-input name="username" type="password" iClass="fa fa-key" p="请输入密码" v-model="form.password"></j-input>
    </div>
    <div class="form-item">
      <j-input name="againPassword" type="password" iClass="fa fa-key" p="请再次输入密码" v-model="form.againPassword"></j-input>
    </div>
    <div class="form-item">
      <div class="form-item-vercode">
        <j-input name="vercode" iClass="fa fa-envelope" p="邮箱验证码" v-model="form.vercode"></j-input>
      </div>
      <div class="btn-vercode">
        <j-button type="white" name="获取验证码" :sty="{'width': '100%'}" :btnSty="{height: '42px'}"></j-button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import jInput from '@/ui/input';
import jButton from '@/ui/button';

export default {
  components: {
    jInput,
    jButton
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        againPassword: '',
        vercode: ''
      }
    };
  },
  watch: {
    form: {
      handler(from) {
        this.$parent.$parent.form = _.cloneDeep(this.form);
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
@import url('../form.less');
</style>