<template>
  <div class="voiceprint">
    <div class="top-area" ref="top">
      <div class="head">
        <img src="/static/img/voiceprint/head.png">
        <p>{{date}}<span style="margin-left: 1em;">搜狐网络大厦</span></p>
      </div>
      <div v-for="(data, index) in voiceprintData">
        <left-talking-bubble :firstLine="data.firstLine"
                             :secondLine="data.secondLine"
                             :hint="data.hint"
                             v-if="data.firstLine || data.secondLine"
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
      WeiXin.getUserInfo(this, dispatch)
    },
    talk() {
      const data = {}
      let openId = WeiXin.getOpenId()
      if (openId)
        data.openId = openId
      dispatch(this, ['WEIXIN_Translate', data], (response) => {
        dispatch(this, ['VOICEPRINT_SetQuestion', {firstLine: response.wzQuesFir}], () => {
          if (response.wzQuesThird) {
            dispatch(this, ['VOICEPRINT_SetQuestion', {secondLine: response.wzQuesSed}], () => {
              dispatch(this, ['VOICEPRINT_SetQuestion', {secondLine: response.wzQuesThird, hint: response.wzQuesThi}], () => {})  
            })  
          } else {
            dispatch(this, ['VOICEPRINT_SetQuestion', {secondLine: response.wzQuesSed, hint: response.wzQuesThi}], () => {})  
          }
        })
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
        let intervalId = setInterval(() => {
          if (this.$refs.top.scrollTop + this.$refs.top.clientHeight === this.$refs.top.scrollHeight)
            clearInterval(intervalId)

          this.$refs.top.scrollBy(0, 1)
        }, 16)
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
