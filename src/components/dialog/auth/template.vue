<template>
<div class="auth">
  <Modal v-model="isShow" className="">
    <div class="auth-container">
      <div slot="header" class="title">{{title}}</div>
      <div class="body">
        <div class="form">
          <div class="form-item">
            <input type="text" v-model="form.email" placeholder="请输入邮箱" />
          </div>
          <div class="form-item">
            <input type="text" v-model="form.password" placeholder="请输入密码" />
          </div>
        </div>
        <div class="other-operation">
          <span class="reg-warp">
            还没有账号？<a href="javascript:void(0);">去注册</a>
          </span>
          <span class="forget-pass-warp">
            <a href="javascript:void(0);">忘记密码了</a>
          </span>
        </div>
        <button class="h-btn h-btn-l h-btn-primary h-btn-block btn-login">登陆</button>
        <div class="line"></div>
        <div class="other-login">
          社交账号登陆
        </div>
      </div>
    </div>
  </Modal>
</div>
</template>

<script>
import controller from "./controller.js";
export default controller;
</script>

<style lang="less" scoped>
@import url("./style.less");
</style>