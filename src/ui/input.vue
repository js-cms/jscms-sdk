<template>
  <div class="component-input-warpper cls">
    <div class="input-icon">
      <i :class="iClass"></i>
    </div>
    <div class="input-warp">
      <input
        v-model="value"
        :name="name"
        :type="type"
        autocomplete="new-text"
        :placeholder="p"
        @input="handleInput"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iClass: {
      type: String,
      default: "fa fa-heart-o"
    },
    type: {
      type: String,
      default: "text"
    },
    p: {
      type: String,
      default: "请输入内容"
    },
    name: {
      type: String,
      default: "text"
    }
  },
  name: "j-input",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style lang='less' scoped>
@import url("./common/style.less");
@comHeight: 44px;

.component-input-warpper {
  overflow: hidden;
  border: 1px solid #dce1e6;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  height: @comHeight;

  * {
    box-sizing: border-box;
  }

  &:hover {
    border-color: rgba(36, 97, 246, 0.4);
  }

  .input-icon {
    width: 40px;
    line-height: 40px;
    text-align: center;
    height: 100%;
    float: left;
    font-size: inherit;
    font-weight: 400;
    color: #93a2bb;
    background-color: #f6f9fc;
    border-right: 1px solid #dce1e6;
  }

  .input-warp {
    height: 100%;
    width: calc(~"100% - 40px");
    float: right;

    input {
      display: block;
      height: 100%;
      outline: none;
      border: none;
      width: 100%;
      padding: 12px;
      padding-top: 11px;
      font-size: 14px;
      border-radius: 0px;
      margin: 0px;
      background-color: #ffffff;

      &:focus {
        box-shadow: none;
      }
    }
  }
}
</style>