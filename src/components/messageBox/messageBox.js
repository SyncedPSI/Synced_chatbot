import { request } from "utils/util";
Component({
  data: {
    message: '',
    chat: [{
      id: 1,
      fromLocal: true,
      messageType: 1,
      message: '欢迎你加入机器之心人工智能信息服务平台',
    }],
    scrollTop: 0,
    scrollViewPaddingTop: 0,
    recommendWord: ['语音助手可以做什么', '它有哪些应用案例', '同类公司', '尝试发送推荐'],
    enableSendMessage: false,
    isIphoneX: getApp().globalData.isIphoneX
  },
  ready: function() {
    this.enableChangePadding = true;
    wx.createSelectorQuery().in(this).select('#js-scroll-view').boundingClientRect((rect) => {
      this.scrollViewHeight = rect.bottom;
    }).exec()
  },
  methods: {
    fetchData: function (keyword) {
      request('https://tgenieapi-beta.dui.ai/dialog', {
        query: {
          resources: ['914001237'],
          text: keyword,
          type: 'text'
        },
        context: {
          session: 'dadwadasdawdad'
        },
      }, 'POST').then(res => {
        console.log(res.data);
        const { reply } = res.data.result;
        const { chat } = this.data;
        if (reply === undefined) return;

        const { CardType, node_label, Title, Items } = reply;
        if (CardType === 1) {
          chat.push({
            id: node_label,
            fromLocal: true,
            messageType: 1,
            message: Title,
          });
        } else if (CardType === 2) {
          chat.push({
            id: Math.random() * 100000,
            fromLocal: true,
            messageType: 3,
            message: {
              data: Items
            },
          })
        }

        this.setData({
          chat
        }, () => {
          this.pageScrollToBottom();
        });
      })
    },
    sendMessage: function () {
      if (!this.data.enableSendMessage) return;

      const { chat, message } = this.data;
      chat.push({
        id: Math.random() * 100000000,
        fromLocal: false,
        messageType: 1,
        message,
      });

      this.setData({
        chat,
        message: '',
        enableSendMessage: false,
        inputFocus: true,
      }, () => {
        this.pageScrollToBottom();
      });
      this.fetchData(message)
    },
    handleInput: function (event) {
      const newMessage = event.detail.value;
      this.setData({
        message: newMessage,
        enableSendMessage: this.checkIfEnableSendMessage(newMessage)
      });
    },
    checkIfEnableSendMessage: function (newMessage) {
      return !!(newMessage.length > 0);
    },
    sendRecommendWord: function (event) {
      const keyword = event.target.dataset.value;
      this.fetchData(keyword);
    },
    pageScrollToBottom: function() {
      const that = this;
      this.getContentHeight((rect) => {
        const { height, bottom } = rect;

        if (that.enableChangePadding) {
          let newPaddingtop = that.getWillSrollViewPaddingTop(height);
          if (newPaddingtop === -1) {
            that.setData({
              scrollTop: bottom
            });
          } else {
            that.setData({
              scrollViewPaddingTop: newPaddingtop,
              scrollTop: bottom + newPaddingtop
            });
          }

        } else {
          that.setData({
            scrollTop: height - this.scrollViewHeight + 28
          });
        }
      });
    },
    inputFocus: function(event) {
      if (!this.enableChangePadding) return;

      this.keyboardHeight = event.detail.height;
      const that = this;
      that.getContentHeight((rect) => {
        const newPaddingtop = that.getWillSrollViewPaddingTop(rect.height);
        if (newPaddingtop !== -1) {
          this.setData({
            scrollViewPaddingTop: newPaddingtop
          })
        }
      });
    },
    inputBlur: function() {
      this.setData({
        scrollViewPaddingTop: 0
      });
    },
    getContentHeight: function(cb) {
      wx.createSelectorQuery().in(this).select('#js-content').boundingClientRect(cb).exec()
    },
    getWillSrollViewPaddingTop: function(contentHeight) {
      const { scrollViewPaddingTop } = this.data;
      let newValue = -1;
      if ((this.scrollViewHeight - this.keyboardHeight) > contentHeight) {
        newValue = this.keyboardHeight;
      } else if (this.scrollViewHeight > contentHeight) {
        newValue = this.scrollViewHeight - contentHeight;
      } else if (scrollViewPaddingTop > 0) {
        newValue = 0;
        this.enableChangePadding = false;
      }
      return newValue;
    }
  },
});


// example:
// {
//    id: 4,
//    fromLocal: true,
//    messageType: 2,
//    message: {
//      logo_url: '',
//      title: '思必驰',
//      type: '机构',
//      path: '',
//      desc: '思必驰对话工场提供语音识别，语音合成，语义理解，智能对话，声纹识别服务，开放平台。',
//    },
//  }, {
//    id: 5,
//    fromLocal: true,
//    messageType: 3,
//    message: {
//      morePath: '',
//      data: [{
//        id: 11,
//        title: '计算语言顶会ACL 2018最佳论文公布！这些大学与研究员榜上有名',
//        desc: '今日，ACL 2018 公布了 5 篇最佳论文，包括三篇最佳长论文和 2 篇',
//        path: '',
//      }]
//    },
//  }
