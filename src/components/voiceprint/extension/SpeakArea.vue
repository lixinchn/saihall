<template>
  <div class="container">
    <p class="result">{{result}}</p>
    <div :class="[{wave: recording}, 'microphone-container']">
      <div class="microphone" @touchstart="onRecordBegin" @touchend="onRecordEnd"></div>
    </div>
    <p class="notice">我们将获取您的声纹，在体验当天用听声识人体验项</p>
  </div>
</template>

<script>
import WeiXin from '../../../utils/weixin'
import {dispatch} from '../../../utils/dispatch'
export default {
  name: 'SpeakArea',
  components: {},
  data () {
    return {
      result: '',
      recording: false,
    }
  },
  created() {
    this.downloadMicrophoneWaveImg()
  },
  methods: {
    onRecordBegin() {
      this.recording = true
      wx.startRecord()
    },
    onRecordEnd() {
      this.recording = false
      wx.stopRecord({
        success: (res) => {
          let localId = res.localId
          WeiXin.uploadVoice(localId, this, dispatch)
        }
      })
    },
    downloadMicrophoneWaveImg() {
      for (let i = 1; i <= 36; ++i) {
        let img = document.createElement('img')
        img.src = `/static/img/voiceprint/microphone/microphone (${i}).png`
        img.style.display = 'none'
        document.body.appendChild(img)
      }
    },
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  text-align: center;

  .result {
    height: 2em;
    width: 100%;
    margin: 0;
  }

  .microphone-container {
    width: 90%;
    margin: 0 auto;
    user-select: none;
    -webkit-touch-callout: none;
    background-size: 100% 100%;

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

  .notice {
    font-size: 0.8em;
    color: #5e7cf5;
    opacity: 0.7;
    margin: 0.3em 0 0 0;
  }
}
</style>
