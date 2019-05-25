import req from '../../util/request';
import style from '../../loader/style';
import getScrollTop from '../../util/getScrollTop';

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
      reply: {
        parentIndex: 0,
        level: 1,
        user: {},
        commentId: '',
        ref: ''
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
      this.config = res.data;
      this.config.currentUser._id = '5c9648d94a4cf500067b6769';
      this.loadList();
    });
  },
  methods: {

    /**
     * 加载数据
     */
    loadList() {

      /**
       * 数据清洗
       */
      const dataHandle = list => {
        let userId = this.config.currentUser._id;
        if (userId) {
          list.forEach(item => {
            item.liked = false;
            if (item.likeUserIds.includes(userId)) {
              item.liked = true;
            }
            if (item.children && item.children.list) {
              item.children.list.forEach(subItem => {
                subItem.liked = false;
                if (subItem.likeUserIds.includes(userId)) {
                  subItem.liked = true;
                }
              });
            }
          });
        }
        console.log(list);
        return list;
      }

      this.loading = true;
      req.get(`http://127.0.0.1:7011/api/front/comment/list`, this.params)
        .then(res => {
          setTimeout(() => {
            if (res.code !== 0) {
              this.$Message({
                type: 'error',
                text: `数据加载失败`
              });
              return;
            }
            let list = dataHandle(res.data.list);
            let length = this.commentsList.length;
            if (length) {
              this.commentsList = this.commentsList.concat(list);
            } else {
              this.commentsList = list;
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

    /**
     * 加载全部的子评论
     */
    loadMoreChild(comment, parentIndex = 0) {
      if (comment.children.total === 999) return;
      comment.children.total = 999;
      req.get(`http://127.0.0.1:7011/api/front/comment/childlist`, {
        commentId: comment._id,
        numberId: this.params.numberId,
        pageNumber: 1,
        pageSize: 999
      }).then(res => {
        setTimeout(()=>{
          comment.children.list = res.data.list;
          comment.children.total = res.data.total;
        }, 500);
      });
    },

    /**
     * 检查表单
     */
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
      let params = Object.assign(this.form, {
        repliedUserId: this.reply.user.id,
        commentId: this.reply.commentId
      });
      req.post(`http://127.0.0.1:7011/api/front/comment/create`, params).then(res => {
        if (res.code === 0) {
          let comment = res.data;
          comment.userAuthor = {
            id: this.config.currentUser._id,
            nickname: this.config.currentUser.nickname,
            avatar: this.config.currentUser.avatar
          };
          if (this.reply.user.id) {
            comment.userReplied = {
              id: this.reply.user._id,
              nickname: this.reply.user.nickname,
              avatar: this.reply.user.avatar
            }
          }
          comment.children = {
            list: [],
            total: 0
          };
          if (this.reply.level === 1) {
            this.commentsList.unshift(comment);
            this.total++;
            this.toTop(this.$refs.commentList);
          } else if (this.reply.level === 2 || this.reply.level === 3) {
            let target = this.$refs[this.reply.ref];
            if (target.length) target = target[0];
            this.commentsList[this.reply.parentIndex].children.list.push(comment);
            this.$nextTick(()=>{
              this.toTop(target.parentNode.nextSibling);
            });
          }
          this.reset();
        }
        this.$Message({
          type: res.code === 0 ? 'success' : 'error',
          text: res.msg
        });
      });
    },

    /**
     * 重置
     */
    reset() {
      this.reply.parentIndex = 0;
      this.reply.level = 1;
      this.reply.user = {};
      this.reply.commentId = '';
      this.reply.ref = '';
      this.form.mdContent = '';
    },

    /**
     * 回复钩子
     */
    replyHandle(item, level, index, ref) {
      this.toTop(this.$refs.jscmsComment);
      this.reply.parentIndex = index;
      this.reply.level = level;
      this.reply.user = item.userAuthor;
      this.reply.commentId = item._id;
      this.reply.ref = ref;
    },

    toTop(el) {
      if (!el) return;
      if (el.length) el = el[0];
      let top = el.getBoundingClientRect().top + getScrollTop();
      window.scrollTo(0, top);
    },

    /**
     * 清除回复
     */
    replyClear() {
      this.reply.user = {};
    }
  }
}
