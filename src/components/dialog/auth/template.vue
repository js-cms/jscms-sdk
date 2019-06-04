<template>
  <div class="auth">
    <j-popup :show="pupup.show">
      <div class="auth-container">
        <div class="header">
          <div class="tab-bar">
            <ul>
              <li>
                <a href="javascript:void(0);" :class="{'active': type===1}" @click="type=1">登陆</a>
              </li>
              <li>
                <a href="javascript:void(0);" :class="{'active': type===2}" @click="type=2">申请账号</a>
              </li>
            </ul>
            <span class="active-line" :class="{'login-active': type===1, 'register-active': type===2}"></span>
          </div>
          <span class="auth-close" @click="()=>{pupup.show=false;}">
            <icon-svg-close></icon-svg-close>
          </span>
        </div>
        <div class="body">
          <form-login v-if="type===1"></form-login>
          <form-reg v-if="type===2"></form-reg>
          <div class="other-operation">
            <span class="reg-warp">
              <label for="keep" class="keep-label">
                <span :class="{'is-rember': isRember}">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNOS44NjIuMDRsMS4xOTggMS42LTcuNDI3IDUuNTYxLTMuMDctNC4zNSAxLjYzNS0xLjE1MyAxLjg4MyAyLjY3eiIvPjwvc3ZnPg=="
                    alt="rember"
                  >
                </span>
                <input type="checkbox" id="keep" v-model="isRember">
                保持登录
              </label>
            </span>
            <span class="forget-pass-warp">
              <a href="javascript:void(0);">忘记密码了？</a>
            </span>
          </div>
          <div class="btn-warp">
            <j-button :name="type===1 ? '立即登陆' : '确认注册'" :sty="{'width': '100%'}" @click="submit"></j-button>
          </div>
          <div class="other-login" v-if="type===1">
            <div class="tips">第三方账号登录：</div>
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
import controller from "./controller.js";
export default controller;
</script>

<style lang="less" scoped>
@import url("./style.less");
</style>