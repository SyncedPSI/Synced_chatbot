Component({
	data: {
		message: '',
		enableSendMessage: false
	},
	methods: {
		sendMessage: function () {
			console.log(this);
			console.log(this.data.message);
		},

		handleInput: function (e) {
			var that = this
			this.setData({
				message: e.detail.value,
				enableSendMessage: that.checkIfEnableSendMessage()
			})
		},

		checkIfEnableSendMessage: function() {
			return !!(this.data.message.length > 0)
		}
	},
});