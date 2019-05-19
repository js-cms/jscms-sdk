export default {
  name: 'Comment',
  data: function () {
    return {
      textarea: {
        placeholder: '你怎么看...',
        tips: '请回复有价值的信息，无意义的评论将很快被删除，账号将被禁止发言。'
      },
      user: {
        avatar: `${__JSCMS_CONSTANT__.CONSTANT.THEME_STATIC}/images/default-avatar.jpg`,
        nickname: '新用户008',
        token: ''
      },
      commentsList: [{
        _id: 'xxxx',
        createTime: '',
        userId: {
          avatar: `${__JSCMS_CONSTANT__.CONSTANT.THEME_STATIC}/images/default-avatar.jpg`,
          nickname: '新用户008'
        },
        likeTotal: 6,
        content: '本身就是流氓软件起家一直在模仿小米出手机。。'
      }],
      total: 10
    };
  },
  methods: {}
}
