<template>
<div class="auth">
  <j-popup :show="pupup.show">
    <div class="auth-container">
      <div class="header">
        <span class="title">{{title}}</span>
        <span class="auth-close" @click="()=>{pupup.show=false;}">
          <icon-svg-close></icon-svg-close>
        </span>
      </div>
      <div class="body">
        <form-login v-if="type===1"></form-login>
        <form-reg v-if="type===2"></form-reg>
        <div class="other-operation">
          <span class="reg-warp" v-if="type===1">
            还没有账号？<a href="javascript:void(0);" @click="type=2">去注册</a>
          </span>
          <span class="reg-warp" v-if="type===2">
            已有账号？<a href="javascript:void(0);" @click="type=1">去登陆</a>
          </span>
          <span class="forget-pass-warp">
            <a href="javascript:void(0);">忘记密码了？</a>
          </span>
        </div>
        <div class="btn-warp">
          <j-button :name="type===1 ? '立即登陆' : '注册'" :sty="{'width': '100%'}" @click="submit"></j-button>
        </div>
        <div class="other-login">
          <div class="tips">
            第三方账号登录：
          </div>
          <div class="svg-icon-layout">
            <div class="svg-icon">
              <icon-svg-github></icon-svg-github>
            </div>
            <div class="svg-icon">
              <icon-svg-wechat></icon-svg-wechat>
            </div>
            <div class="svg-icon">
              <icon-svg-weibo></icon-svg-weibo>
            </div>
          </div>
        </div>
      </div>
    </div>
  </j-popup>
</div>
</template>

<script>
import controller from './controller.js';
export default controller;
</script>

<style lang="less" scoped>
@import url("./style.less");
</style>