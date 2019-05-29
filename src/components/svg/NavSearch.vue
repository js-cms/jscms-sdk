<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 17"
    id="symbol-search"
    :width="w"
    :height="h"
    :style="{
        'c': _c
    }"
  >
    <path
      d="M16.589 15.6a.618.618 0 1 1-.875.875l-4.426-4.427a6.43 6.43 0 1 1 .875-.875l4.426 4.427zm-9.39-3.273a5.241 5.241 0 1 0 0-10.483 5.241 5.241 0 0 0 0 10.483z"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "SvgNavSearch",
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


