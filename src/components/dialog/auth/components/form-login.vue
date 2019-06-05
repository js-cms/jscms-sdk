<template>
  <div class="form">
    <div class="form-item">
      <j-input name="username" iClass="fa fa-envelope-o" :p="'请输入' + typeName" v-model="form.email"></j-input>
    </div>
    <div class="form-item">
      <j-input name="password" iClass="fa fa-key" p="请输入密码" type="password" v-model="form.password"></j-input>
    </div>
  </div>
</template>

<script>
import jInput from '@/ui/input';

import _ from 'lodash';

export default {
  props: {
    typeName: {
      type: String,
      default: '邮箱'
    }
  },
  components: {
    jInput
  },
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