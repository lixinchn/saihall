<template>
  <div class="container">
    <div class="head">
      <img :src="onUserInfo.headimgurl">
      <p>{{name}}，请读出下面短句</p>
    </div>
    <div class="poem-container">
      <div :class="[{'wave-hall': recording}, 'poem-wave']"></div>
      <p class="poem-text">{{poem}}</p>
    </div>

    <div class="microphone-container">
      <div class="microphone" @touchstart="onRecordBegin" @touchend="onRecordEnd"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import WeiXin from '../../utils/weixin'
import {dispatch} from '../../utils/dispatch'
export default {
  name: 'VoiceprintHall',
  components: {},
  data () {
    return {
      name: '',
      recording: false,
      poem: '',
      succCount: 0,
    }
  },
  created() {
    this.name = this.$route.query.name
    this.getUserInfo()
    this.getPoem()
    this.downloadMicrophoneWaveImg()
  },
  methods: {
    getPoem() {
      const data = {
        verse: this.poem,
      }
      dispatch(this, ['VOICEPRINT_GetPoem', data], (response) => {
        this.poem = response.verse
      })
    },
    getUserInfo() {
      WeiXin.getUserInfo(this, dispatch)
    },
    downloadMicrophoneWaveImg() {
      for (let i = 1; i <= 138; ++i) {
        let img = document.createElement('img')
        img.src = `/static/img/voiceprint/wave/wave (${i}).png`
        img.style.display = 'none'
        document.body.appendChild(img)
      }
    },
    onRecordBegin(e) {
      wx.startRecord()
      e.preventDefault()
      this.recording = true
    },
    onRecordEnd() {
      this.recording = false
      wx.stopRecord({
        success: (res) => {
          let localId = res.localId
          WeiXin.uploadVoiceHall(localId, this, dispatch, this.poem, WeiXin.getOpenId())
        }
      })
    },
  },
  computed: {
    ...mapGetters({
      onUserInfo: 'userInfo',
    })
  },
  watch: {
    onUserInfo(userInfo) {
      if (!this.name)
        this.name = userInfo.nickname
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  background: url(/static/img/voiceprint/background.png) no-repeat;
  padding: 0 2em;
  position: relative;

  .head {
    padding: 2em 0em;
    text-align: left;

    * {
      display: inline-block;
    }

    img {
      height: 3em;
      width: 3em;
      border-radius: 50%;
      vertical-align: middle;
    }

    p {
      color: #fff;
      font-size: 1em;
      margin: 0 0 0 1em;
    }
  }

  .poem-container {
    width: 100%;
    height: 11em;
    padding-top: 4em;
    background: url(/static/img/voiceprint/voiceprint-poem-border.png) no-repeat;
    background-size: 100% 100%;

    .poem-wave {
      margin: 0 auto;
      width: 70%;
      background: url(/static/img/voiceprint/voiceprint-wave.png) no-repeat;
      background-size: 100% 100%;
      height: 2em;
    }

    .poem-text {
      color: #fff;
      font-size: 1em;
      margin-top: 2em;
    }
  }

  .microphone-container {
    width: 90%;
    margin: 0 auto;
    user-select: none;
    -webkit-touch-callout: none;
    position: absolute;
    bottom: 2em;
    left: 50%;
    transform: translate(-50%, 0);

    .microphone {
      background: url(/static/img/voiceprint/speak.png) no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      width: 5em;
      height: 5em;

      &:active {
        background: url(/static/img/voiceprint/speak-active.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
