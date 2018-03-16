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
import WeiXin from '../../utils/weixin'
import {dispatch} from '../../utils/dispatch'
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
        success: function (res) {
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

<style>
@-webkit-keyframes p8{
  0% {background: url('/static/img/voiceprint/microphone/microphone (1).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  2.77% {background: url('/static/img/voiceprint/microphone/microphone (2).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  5.54% {background: url('/static/img/voiceprint/microphone/microphone (3).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  8.31% {background: url('/static/img/voiceprint/microphone/microphone (4).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  11.08% {background: url('/static/img/voiceprint/microphone/microphone (5).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  13.85% {background: url('/static/img/voiceprint/microphone/microphone (6).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  16.62% {background: url('/static/img/voiceprint/microphone/microphone (7).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  19.39% {background: url('/static/img/voiceprint/microphone/microphone (8).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  22.16% {background: url('/static/img/voiceprint/microphone/microphone (9).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  24.93% {background: url('/static/img/voiceprint/microphone/microphone (10).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  27.70% {background: url('/static/img/voiceprint/microphone/microphone (11).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  30.47% {background: url('/static/img/voiceprint/microphone/microphone (12).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  33.24% {background: url('/static/img/voiceprint/microphone/microphone (13).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  36.31% {background: url('/static/img/voiceprint/microphone/microphone (14).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  38.78% {background: url('/static/img/voiceprint/microphone/microphone (15).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  41.55% {background: url('/static/img/voiceprint/microphone/microphone (16).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  44.32% {background: url('/static/img/voiceprint/microphone/microphone (17).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  47.09% {background: url('/static/img/voiceprint/microphone/microphone (18).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  49.86% {background: url('/static/img/voiceprint/microphone/microphone (19).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  52.63% {background: url('/static/img/voiceprint/microphone/microphone (20).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  55.4% {background: url('/static/img/voiceprint/microphone/microphone (21).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  58.17% {background: url('/static/img/voiceprint/microphone/microphone (22).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  60.94% {background: url('/static/img/voiceprint/microphone/microphone (23).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  63.71% {background: url('/static/img/voiceprint/microphone/microphone (24).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  66.48% {background: url('/static/img/voiceprint/microphone/microphone (25).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  69.25% {background: url('/static/img/voiceprint/microphone/microphone (26).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  72.02% {background: url('/static/img/voiceprint/microphone/microphone (27).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  74.97% {background: url('/static/img/voiceprint/microphone/microphone (28).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  77.56% {background: url('/static/img/voiceprint/microphone/microphone (29).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  80.33% {background: url('/static/img/voiceprint/microphone/microphone (30).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  83.10% {background: url('/static/img/voiceprint/microphone/microphone (31).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  85.87% {background: url('/static/img/voiceprint/microphone/microphone (32).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  88.64% {background: url('/static/img/voiceprint/microphone/microphone (33).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  91.41% {background: url('/static/img/voiceprint/microphone/microphone (34).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  94.18% {background: url('/static/img/voiceprint/microphone/microphone (35).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
  100% {background: url('/static/img/voiceprint/microphone/microphone (36).png') no-repeat; background-size: 100% 100%; background-attachment: scroll}
}

.wave {
  -webkit-animation: p8 steps(1, end) 1s infinite;
}
</style>
