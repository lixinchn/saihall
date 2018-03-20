<template>
  <div class="voiceprint" @touchmove="onTouchMove">
    <div class="top-area" ref="top">
      <div class="head">
        <img src="/static/img/voiceprint/head.png">
        <p>{{date}}<span style="margin-left: 1em;">搜狐网络大厦</span></p>
      </div>
      <div v-for="(data, index) in voiceprintData">
        <left-talking-bubble :firstLine="data.firstLine"
                             :secondLine="data.secondLine"
                             :hint="data.hint"
                             v-if="data.firstLine"
                             ></left-talking-bubble>
        <right-talking-bubble :answer="data.answer" v-if="data.answer"></right-talking-bubble>
      </div>
    </div>
    <div class="tail-area">
      <speak-area></speak-area>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {translateTimestampGetDatetime} from '../../utils/moment'
import LeftTalkingBubble from './extension/LeftTalkingBubble'
import RightTalkingBubble from './extension/RightTalkingBubble'
import SpeakArea from './extension/SpeakArea'
import {dispatch} from '../../utils/dispatch'
import WeiXin from '../../utils/weixin'
export default {
  name: 'Voiceprint',
  components: {LeftTalkingBubble, SpeakArea, RightTalkingBubble},
  data () {
    return {
      date: this.$route.query.date || translateTimestampGetDatetime(Date.now()),
      voiceprintData: [],
      answer: '',
    }
  },
  created() {
    document.title = '搜狗体验厅邀请函'
    this.weixinInit()
    this.getUserInfo()
    this.talk()
  },
  methods: {
    weixinInit() {
      WeiXin.init(this, dispatch)
    },
    getUserInfo() {
      const data = {code: this.getCode()}
      let openId = WeiXin.getOpenId()
      if (openId)
        data.openid = openId
      dispatch(this, ['WEIXIN_GetUserInfo', data], (response) => {
        if (!response.data.code) {
          console.log('没有用户信息，准备跳转')
          // WeiXin.redirectToGetcode()
          return
        }

        // 存一下openId
        WeiXin.setOpenId(response.data.openid)
      })
    },
    getCode() {
      let url = new URL(location.href)
      return url.searchParams.get('code')
    },
    talk() {
      const data = {}
      let openId = WeiXin.getOpenId()
      if (openId)
        data.openId = openId
      dispatch(this, ['WEIXIN_Translate', data], (response) => {
        const data = {
          firstLine: response.wzQuesFir,
          secondLine: response.wzQuesSed,
          hint: response.wzQuesThi,
        }
        dispatch(this, ['VOICEPRINT_SetQuestion', data], (response) => {})
      })
    },
    getQuestion() {
      const data = {}
      let openId = WeiXin.getOpenId()
      if (openId)
        data.openId = openId
      dispatch(this, ['WEIXIN_Translate', data], (response) => {
      })
    },
    onTouchMove(e) {
      if (window.scrollY <= 0)
        e.preventDefault()
      
      if (!this.$refs.top.contains(e.target))
        e.preventDefault()
    },
  },
  computed: {
    ...mapGetters({
      onVoiceprintQuestion: 'voiceprintQuestion',
    })
  },

  watch: {
    onVoiceprintQuestion(voiceprintQuestion) {
      this.voiceprintData.push(voiceprintQuestion)
      setTimeout(() => {
        this.$refs.top.scrollTo(0, this.$refs.top.scrollHeight)
      }, 200)
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
      overflow: scroll;
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
