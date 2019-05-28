export default {
  name: 'Qrcode',
  data: function () {
    return {
      baseWidth: 240,
      warpStyle: {
        width: '230px',
      },
      title: '扫一扫',
      images: [],
      opened: false
    }
  },
  mounted() {
    console.log(1);
  },
  methods: {
    show: function (options) {
      this.title = options.title;
      this.images = options.images;
      this.warpStyle.width = (options.images.length * this.baseWidth) + 'px';
      console.log(this.warpStyle);
      this.opened = true;
    }
  }
}
