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
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
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