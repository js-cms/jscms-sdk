export default {
  name: 'Comment',
  data: function () {
    return {
      article: {
        id: window.__JSCMS_CONSTANT__.article.id,
        numberId: window.__JSCMS_CONSTANT__.article.numberId
      },
      textarea: {
        placeholder: '你怎么看...',
        tips: '请回复有价值的信息，无意义的评论将很快被删除，账号将被禁止发言。'
      },
      content: '',
      user: {
        _id: '5c9648d94a4cf500067b6770',
        avatar: `${__JSCMS_CONSTANT__.CONSTANT.THEME_STATIC}/images/default-avatar.jpg`,
        nickname: '匿名用户',
        token: ''
      },
      commentsList: [],
      total: 0
    };
  },
  mounted() {
    this.loadList();
  },
  methods: {
    /**
     * 加载数据
     */
    loadList() {
      const $ = window.jQuery;
      $.get(`http://127.0.0.1:7011/api/front/comment/list?numberId=${this.article.numberId}`, (res) => {
        this.commentsList = res.data.list;
        this.total = res.data.total;
      });
    },
      
    /**
     * 提交评论
     */
    submit() {
      if (!this.content) {
        this.$Message({
          type: 'error',
          text: `评论内容不能为空`
        });
        return;
      }
      $.post(`http://127.0.0.1:7011/api/front/comment/create`, {
        userId: this.user._id,
        articleNumberId: this.article.numberId,
        mdContent: this.content
      }, (res) => {
        if (res.code === 0) {
          let comment = res.data;
          comment.userId = this.user;
          this.commentsList.unshift(comment);
          this.content = '';
        }
        this.$Message({
          type: res.code === 0 ? 'success' : 'error',
          text: res.msg
        });
      });
    }
  }
}
