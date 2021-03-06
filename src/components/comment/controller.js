import { req } from '@/util/request';
import util from '@/util/util.js';

export default {
  name: 'Comment',
  data: function () {
    return {
      article: {
        id: util.g().article.id,
        numberId: util.g().article.numberId
      },
      form: {
        numberId: util.g().article.numberId,
        mdContent: ''
      },
      commentConfig: {
        isShowUser: false,
        isAnonymous: false,
        isLogin: false,
        boolCommentLogin: false,
        placeholder: '',
        tips: '',
        currentUser: {}
      },
      params: {
        numberId: util.g().article.numberId,
        pageSize: 10,
        pageNumber: 1
      },
      reply: {
        parentIndex: 0,
        level: 1,
        user: {},
        commentId: '',
        commentNumberId: 0,
        ref: ''
      },
      commentsList: [],
      loading: true,
      hasMore: false,
      needLogin: true,
      total: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 初始化函数
     */
    async init() {
      await this.loadConfig();
      this.loadList();
    },

    /**
     * 加载配置
     */
    async loadConfig() {
      let res = await req.get(`/api/front/comment/config`);
      this.commentConfig = res.data.data;
    },

    /**
     * 显示登陆弹窗
     */
    showLogin() {
      window.jscmssdk.dialog.auth.show(1, async result => {
        if (result.type === 1) {
          console.log('load config');
          await this.loadConfig();
        }
      });
    },

    /**
     * 数据清洗
     */
    dataHandle(item) {
      let userId = this.commentConfig.currentUser._id;
      item.liked = false;
      item.ftime = util.beautifyDate(item.createTime);
      if (userId) {
        if (item.likeUserIds.includes(userId)) {
          item.liked = true;
        }
      }
    },

    /**
     * 加载数据
     */
    loadList() {

      /**
       * 数据清洗
       */
      const handle = list => {
        list.forEach(item => {
          this.dataHandle(item);
          if (item.children && item.children.list) {
            item.children.list.forEach(subItem => {
              this.dataHandle(subItem);
            });
          }
        });
        return list;
      }

      this.loading = true;
      req.get(`/api/front/comment/list`, this.params)
        .then(res => {
          setTimeout(() => {
            if (res.data.code !== 0) {
              this.$Message({
                type: 'error',
                text: `数据加载失败`
              });
              return;
            }
            console.log('res.data.data.list', res.data.data.list);
            let list = handle(res.data.data.list);
            let length = this.commentsList.length;
            if (length) {
              this.commentsList = this.commentsList.concat(list);
            } else {
              this.commentsList = list;
            }
            this.total = res.data.data.total;
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
    loadMoreChild(comment, callback = function() {}) {
      if (comment.children.total === 999) return;
      comment.children.total = 999;
      req.get(`/api/front/comment/childlist`, {
        commentId: comment._id,
        numberId: this.params.numberId,
        pageNumber: 1,
        pageSize: 999
      }).then(res => {
        setTimeout(() => {
          let list = res.data.data.list;
          list.forEach(item => this.dataHandle(item));
          comment.children.list = list;
          comment.children.total = res.data.data.total;
          this.$nextTick(callback);
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
      req.post(`/api/front/comment/create`, params).then(res => {
        if (res.data.code === 0) {
          let comment = res.data.data;
          comment.userAuthor = {
            id: this.commentConfig.currentUser._id,
            nickname: this.commentConfig.currentUser.nickname,
            avatar: this.commentConfig.currentUser.avatar
          };
          comment.children = {
            list: [],
            total: 0
          };
          this.dataHandle(comment);
          if (this.reply.level === 1) {
            this.commentsList.unshift(comment);
            this.total++;
            this.toTop(this.$refs.commentList);
            this.reset();
          } else if (this.reply.level === 2 || this.reply.level === 3) {
            let comment = this.commentsList[this.reply.parentIndex];
            this.loadMoreChild(comment, () => {
              let target = this.$refs[this.reply.ref];
              if (target && target.length) target = target[0];
              let el = {};
              let tempArr = [];
              if (this.reply.level === 2) {
                tempArr = target.querySelectorAll('.comment-list-li');
              } else if (this.reply.level === 3) {
                tempArr = target.parentNode.parentNode.querySelectorAll('.comment-list-li');
              }
              el = tempArr[tempArr.length - 1];
              this.$nextTick(() => this.toTop(el));
              this.reset();
            });
          }
        }
        this.$Message({
          type: res.data.code === 0 ? 'success' : 'error',
          text: res.data.msg
        });
      });
    },

    /**
     * 重置
     */
    reset() {
      this.replyClear();
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
      this.reply.commentNumberId = item.numberId;
      this.reply.ref = ref;
    },

    /**
     * 操作滚动条
     */
    toTop(el) {
      if (!el) return;
      if (el.length) el = el[0];
      let top = el.getBoundingClientRect().top + util.getScrollTop();
      window.scrollTo(0, top);
    },

    /**
     * 点赞钩子
     */
    like(comment) {
      let params = {
        commentId: comment._id
      };
      if (comment.liked === true) { // 取消点赞
        req.get(`/api/front/comment/unlike`, params)
          .then(res => {
            if (res.data.code === 0) {
              comment.liked = false;
              comment.likeUserIds = res.data.data.likeUserIds;
            }
          });
      } else { // 进行点赞
        req.get(`/api/front/comment/like`, params)
          .then(res => {
            if (res.data.code === 0) {
              comment.liked = true;
              comment.likeUserIds = res.data.data.likeUserIds;
            }
          });
      }
    },

    /**
     * 清除回复
     */
    replyClear() {
      this.reply.parentIndex = 0;
      this.reply.level = 1;
      this.reply.user = {};
      this.reply.commentId = '';
      this.reply.ref = '';
      this.reply.commentNumberId = 0;
    }
  }
}