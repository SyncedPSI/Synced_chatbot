Component({
  data: {
    message: '',
    chat: [],
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
