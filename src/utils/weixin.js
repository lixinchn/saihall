import sha1 from 'sha1'

export default {
  init(self, dispatch) {
    this.getJSAPITicket(self, dispatch).then((ticket) => {
      let noncestr = this.makeNoncestr()
      let timestamp = Date.now().toString()
      let url = location.href.split('#')[0]

      let sig = this.generateSignature({
        noncestr: noncestr,
        jsapi_ticket: ticket,
        timestamp: timestamp,
        url: url,
      })

      this.config(noncestr, timestamp, url, ticket, sig, self, dispatch)
    })
  },

  config(noncestr, timestamp, url, ticket, sig, self, dispatch) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wxe15979ce3adafcd9', // 必填，企业号的唯一标识，此处填写企业号corpid
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: noncestr, // 必填，生成签名的随机串
      signature: sig,// 必填，签名，见附录1
      jsApiList: ['startRecord', 'stopRecord', 'onVoiceRecordEnd', 'uploadVoice', 'downloadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })

    wx.ready(function(){
      console.log('success')
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: (res) => {
          self.recording = false
          var localId = res.localId
          this.uploadVoice(localId, self, dispatch)
        }
      })
    })

    wx.error(function(res){
      console.log('error')
    })
  },

  uploadVoice(localId, self, dispatch) {
    wx.uploadVoice({
      localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
      isShowProgressTips: 1,// 默认为1，显示进度提示
      success: (res) => {
        var serverId = res.serverId // 返回音频的服务器端ID
        this.noticeServerId(serverId, self, dispatch)
      }
    })
  },

  noticeServerId(serverId, self, dispatch) {
    const data = {
      serverId: serverId,
    }
    alert(JSON.stringify(data))
    dispatch(self, ['WEIXIN_Translate', data], (response) => {
      alert(JSON.stringify(response))
    })
  },

  getJSAPITicket(self, dispatch, callback) {
    return new Promise((resolve, reject) => {
      dispatch(self, ['WEIXIN_GetJSAPITicket'], (response) => {
        resolve(response.ticket)
      })
    })
  },

  generateSignature(sigObj) {
    let keys = Object.keys(sigObj).sort()
    let sigArr = []
    keys.forEach(key => {
      sigArr.push(key + '=' + sigObj[key])
    })
    let sigStr = sigArr.join('&')
    return sha1(sigStr)
  },

  makeNoncestr() {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  },

  getOpenId() {
    return localStorage.getItem('openId')
  },

  setOpenId(openId) {
    localStorage.setItem('openId', openId)
  }
}
