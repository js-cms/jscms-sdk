<template>
  <svg
    t="1545651540492"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2210"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="w"
    :height="h"
    :style="{
        'c': _c
    }"
  >
    <path
      d="M512 482.133333l196.266667-196.266666c8.533333-8.533333 21.333333-8.533333 29.866666 0 8.533333 8.533333 8.533333 21.333333 0 29.866666L541.866667 512l196.266666 196.266667c8.533333 8.533333 8.533333 21.333333 0 29.866666-8.533333 8.533333-21.333333 8.533333-29.866666 0L512 541.866667l-196.266667 196.266666c-8.533333 8.533333-21.333333 8.533333-29.866666 0-8.533333-8.533333-8.533333-21.333333 0-29.866666l196.266666-196.266667-200.533333-196.266667c-8.533333-8.533333-8.533333-21.333333 0-29.866666 8.533333-8.533333 21.333333-8.533333 29.866667 0l200.533333 196.266666z"
      p-id="2211"
      fill="#646464"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "SvgIconClose",
  popos: ["width", "height", "c"],
  data() {
    return {
      w: "25px",
      h: "25px",
      _c: "#333"
    };
  },
  created() {
    if ( this.width ) this.w = this.width;
    if ( this.height ) this.h = this.height;
    if ( this.c ) this._c = this.c;
  }
};
</script>

<style scoped>
svg {
  fill: currentc;
}
</style>
