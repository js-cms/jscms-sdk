<template>
  <div class="component-button-warpper" :style="sty">
    <button :class="type" :style="btnSty" v-on:click="$emit('click')">{{name}}</button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "这是一个按钮"
    },
    sty: {
      type: Object,
      default: () => {}
    },
    btnSty: {
      type: Object,
      default: () => {
        return {
          height: '48px',
          width: '100%'
        }
      }
    },
    type: {
      type: String,
      default: "blue"
    }
  },
  name: "j-button",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.component-button-warpper {
  display: inline-block;

  button {
    height: 48px;
    width: 100%;
    text-align: center;
    line-height: initial;
    cursor: pointer;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    &.blue {
      padding: 14px 30px;
      font-weight: 500;

      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#648cff),
        to(#4172fa)
      );
      background: -o-linear-gradient(top, #648cff 0, #4172fa 100%);
      background: linear-gradient(180deg, #648cff, #4172fa);
      border: 1px solid rgba(51, 100, 237, 0.35);
      border-radius: 3px;
      -webkit-box-shadow: inset 0 -2px 0 0 #3262e6,
        0 3px 4px 0 rgba(44, 71, 146, 0.32);
      box-shadow: inset 0 -2px 0 0 #3262e6, 0 3px 4px 0 rgba(44, 71, 146, 0.32);
      -webkit-transition: all 0.2s;
      -o-transition: all 0.2s;
      transition: all 0.2s;
      display: inline-block;
      font-size: 13px;
      text-align: center;
      color: #fff;

      &:hover {
        -webkit-transform: scale(1) translateY(-2px);
        -ms-transform: scale(1) translateY(-2px);
        transform: scale(1) translateY(-2px);
        -webkit-box-shadow: 0 8px 20px 0 rgba(44, 71, 146, 0.4);
        box-shadow: 0 8px 20px 0 rgba(44, 71, 146, 0.4);
        color: #fff !important;
      }
    }

    &.white {
      transition: all 0.2s;
      -webkit-transition: all 0.2s;
      -moz-transition: all 0.2s;
      -ms-transition: all 0.2s;
      -o-transition: all 0.2s;
      background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(8%, #ffffff),
        color-stop(97%, #f2f2f7)
      );
      background-image: linear-gradient(-180deg, #ffffff 8%, #f2f2f7 97%);
      border: 1px solid #e9eaec;
      -webkit-box-shadow: 0 3px 4px 0 rgba(44, 71, 146, 0.32),
        inset 0 -2px 0 0 #e1e3e8;
      box-shadow: 0 3px 4px 0 rgba(44, 71, 146, 0.32), inset 0 -2px 0 0 #e1e3e8;
      border-radius: 3px;
      font-family: system, -apple-system, BlinkMacSystemFont;
      font-size: 13px;
      color: #3b426b;
      letter-spacing: 0.7px;
      
      font-weight: 700;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &:hover {
        -webkit-box-shadow: 0 8px 20px 0 rgba(44, 71, 146, 0.2);
        box-shadow: 0 8px 20px 0 rgba(44, 71, 146, 0.2);
        border: 1px solid #f3f3f8;
        -webkit-transform: scale(1.02);
        transform: scale(1.01) translateY(-2px);
      }
    }
  }
}
</style>