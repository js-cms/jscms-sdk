import req from '../../util/request';
import style from '../../loader/style';

export default {
  name: 'Comment',
  data: function () {
    return {
      theme: {
        fontColor: '#262626',
        mainColor: '#4285f4',
        mainDeepColor: '#326ac5'
      },
      article: {
        id: window.__JSCMS_CONSTANT__.article.id,
        numberId: window.__JSCMS_CONSTANT__.article.numberId
      },
      form: {
        numberId: window.__JSCMS_CONSTANT__.article.numberId,
        mdContent: ''
      },
      config: {
        currentUser: {}
      },
      params: {
        numberId: window.__JSCMS_CONSTANT__.article.numberId,
        pageSize: 10,
        pageNumber: 1
      },
      commentsList: [],
      loading: true,
      hasMore: false,
      needLogin: true,
      total: 0
    };
  },
  created() {
    style(`
      .h-loading .h-loading-circular>svg .circle {
        stroke: ${this.theme.mainColor} !important;
      }
    `);
  },
  mounted() {
    req.get(`http://127.0.0.1:7011/api/front/comment/config`).then(res => {
      console.log('res.data', res.data);
      this.config = res.data;
      this.loadList();
    });
  },
  methods: {
    /**
     * 加载数据
     */
    loadList() {
      this.loading = true;
      req.get(`http://127.0.0.1:7011/api/front/comment/list`, this.params)
        .then(res => {
          setTimeout(() => {
            let length = this.commentsList.length;
            if (length) {
              this.commentsList = this.commentsList.concat(res.data.list);
            } else {
              this.commentsList = res.data.list;
            }
            this.total = res.data.total;
            length = this.commentsList.length;
            let total = this.total;
            if (length >= total) {
              this.hasMore = false;
            } else {
              this.hasMore = true;
            }
            this.loading = false;
          }, 500);
        });
    },

    /**
     * 加载更多数据
     */
    loadMore() {
      this.params.pageNumber++;
      this.loadList();
    },

    check() {
      let mdContent = this.form.mdContent.replace(/[\r\n]/g, '').replace(/\s+/g, '');
      if (!mdContent) {
        this.$Message({
          type: 'error',
          text: `评论内容不能为空`
        });
        return;
      }
      if (this.form.mdContent.length > 1000) {
        this.$Message({
          type: 'error',
          text: `评论内容字符长度不能超过1000`
        });
        return;
      }
      return true;
    },

    /**
     * 提交评论
     */
    submit() {
      if (!this.check()) return;
      req.post(`http://127.0.0.1:7011/api/front/comment/create`, this.form).then(res => {
        if (res.code === 0) {
          let comment = res.data;
          comment.userId = this.config.currentUser;
          this.commentsList.unshift(comment);
          this.form.content = '';
          this.total++;
        }
        this.$Message({
          type: res.code === 0 ? 'success' : 'error',
          text: res.msg
        });
      });
    }
  }
}
