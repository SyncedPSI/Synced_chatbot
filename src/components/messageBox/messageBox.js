Component({
  data: {
    message: '',
    chat: [{
      id: 1,
      fromLocal: true,
      messageType: 1, //文本
      message: '欢迎你加入机器之心人工智能信息服务平台',
    }, {
      id: 2,
      fromLocal: false,
      messageType: 1,
      message: '语音助手可以做什么？',
    }, {
      id: 3,
      fromLocal: true,
      messageType: 1,
      message: '思必驰成立于2007年，是国内领先的语音交互人工智能高科技公司，是国内唯一专注智能硬件领域的人机交互平台公司，为物联网及相关垂直领域，提供自然语言交互解决方案。',
    }, {
      id: 4,
      fromLocal: true,
      messageType: 2, // 卡片
      message: {
        logo_url: '',
        title: '思必驰',
        type: '机构',
        path: '',
        desc: '思必驰对话工场提供语音识别，语音合成，语义理解，智能对话，声纹识别服务，开放平台。',
      },
    }, {
      id: 5,
      fromLocal: true,
      messageType: 3, // 数组
      message: {
        morePath: '',
        data: [{
          id: 11,
          title: '计算语言顶会ACL 2018最佳论文公布！这些大学与研究员榜上有名',
          desc: '今日，ACL 2018 公布了 5 篇最佳论文，包括三篇最佳长论文和 2 篇',
          path: '',
        }]
      },
    }],
    recommendWord: ['语音助手可以做什么', '它有哪些应用案例', '同类公司', '尝试发送推荐'],
    enableSendMessage: false,
  },
  methods: {
    sendMessage: function () {
      console.log(this.data.message);
    },

    handleInput: function (e) {
      this.setData({
        message: e.detail.value,
        enableSendMessage: this.checkIfEnableSendMessage()
      });
    },

    checkIfEnableSendMessage: function () {
      return !!(this.data.message.length > 0);
    },

    sendRecommendWord: function () {

    },
  },
});
