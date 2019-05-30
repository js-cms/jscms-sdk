<template>
  <div class="form">
    <div class="form-item">
      <i class="fa fa-user-o"></i>
      <input type="text" v-model="form.email" placeholder="请输入邮箱">
    </div>
    <div class="form-item">
      <i class="fa fa-unlock-alt"></i>
      <input type="password" v-model="form.password" placeholder="请输入密码">
    </div>
    <div class="form-item">
      <i class="fa fa-unlock-alt"></i>
      <input type="password" v-model="form.againPassword" placeholder="再次输入密码">
    </div>
    <div class="form-item">
      <div class="form-item-vercode">
        <i class="fa fa-unlock-alt"></i>
        <input type="text" v-model="form.vercode" placeholder="邮箱验证码">
      </div>
      <div class="btn-vercode">
        <button class="h-btn h-btn-l h-btn-primary h-btn-block">获取验证码</button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
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