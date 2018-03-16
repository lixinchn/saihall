<template>
  <div class="voiceprint">
    <div class="top-area">
      <div class="head">
        <img src="/static/img/voiceprint/head.png">
        <p>{{date}}<span style="margin-left: 1em;">搜狐网络大厦</span></p>
      </div>
      <left-talking-bubble :firstLine="VoiceprintData.init.firstLine"
                           :secondLine="VoiceprintData.init.secondLine"
                           :hint="VoiceprintData.init.hint"></left-talking-bubble>
      <right-talking-bubble :answer="answer"></right-talking-bubble>
    </div>
    <div class="tail-area">
      <speak-area></speak-area>
    </div>
  </div>
</template>

<script>
import {translateTimestampGetDatetime} from '../utils/moment'
import data from '../utils/voice_print_data'
import LeftTalkingBubble from './extension/LeftTalkingBubble'
import RightTalkingBubble from './extension/RightTalkingBubble'
import SpeakArea from './extension/SpeakArea'
import {dispatch} from '../utils/dispatch'
import WeiXin from '../utils/weixin'
export default {
  name: 'Voiceprint',
  components: {LeftTalkingBubble, SpeakArea, RightTalkingBubble},
  data () {
    return {
      date: this.$route.query.date || translateTimestampGetDatetime(Date.now()),
      VoiceprintData: data,
      answer: '您好，我叫汪仔，是搜狗的智能机器人。欢迎您莅临我们的展厅，体验搜狗黑科技',
    }
  },
  created() {
    document.title = '搜狗体验厅邀请函'
    this.weixinInit()
    this.getUserInfo()
  },
  methods: {
    weixinInit() {
      WeiXin.init(this, dispatch)
    },
    getUserInfo() {
      let code = this.getCode()
      
      if (code) {
        const data = {code: code}
        let openId = WeiXin.getOpenId()
        if (openId)
          data.openid = openId
        dispatch(this, ['WEIXIN_GetUserInfo', data], (response) => {
          if (!response.code) {
            alert('没有用户信息，准备跳转')
            return
          }

          // 存一下openId
          alert(response.data.openid)
          WeiXin.setOpenId(response.data.openid)
        })
      }
    },
    getCode() {
      let url = new URL(location.href)
      return url.searchParams.get('code')
    },
  },
}
</script>

<style scoped lang="scss">
  .voiceprint {
    width: 100%;
    height: 100%;
    background: url(/static/img/voiceprint/background.png) no-repeat;

    .top-area {
      height: calc(100% - 150px);
      .head {
        width: 100%;
        position: relative;

        img {
          width: 100%;
        }

        p {
          position: absolute;
          bottom: 29%;
          margin: 0 auto;
          left: 0;
          right: 0;
          font-size: .7em;
          color: #fff;
        }
      }
    }

    .tail-area {
      height: 150px;
    }
  }
</style>
