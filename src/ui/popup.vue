<template>
  <div class="component-popup-warpper" v-if="show">
    <div class="popup">
      <slot></slot>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  name: 'j-popup',
  data() {
    return {

    }
  }
};
</script>

<style lang="less" scoped>
.component-popup-warpper {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;

  .popup {
    position: absolute;
    z-index: 1002;
    overflow: hidden;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .mask {
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1001;
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>