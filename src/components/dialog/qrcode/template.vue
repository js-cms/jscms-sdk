<template>
<div class="vue-qrcode">
  <Modal v-model="opened" className="">
    <div style="padding: 10px; text-align: center;">{{title}}</div>
    <div class="vue-qrcode-warp" :style="warpStyle">
      <div class="item" v-for="(item, index) in images" :key="index">
        <div><img class="vue-qrcode-image" v-show="item.url" :src="item.url" :alt="item.desc"></div>
        <span v-show="item.desc">{{item.desc}}</span>
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