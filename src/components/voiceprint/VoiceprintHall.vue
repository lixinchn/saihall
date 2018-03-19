<template>
  <div class="container">
    <div class="head">
      <img src="/static/img/voiceprint/voiceprint-hall-succ-btn.png">
      <p>{{name}}，请读出下面短句</p>
    </div>
    <div class="poem-container">
      <div class="poem-wave"></div>
      <p class="poem-text">{{poem}}</p>
    </div>

    <div :class="[{wave: recording}, 'microphone-container']">
      <div class="microphone" @touchstart="onRecordBegin" @touchend="onRecordEnd"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoiceprintHall',
  components: {},
  data () {
    return {
      name: '',
      recording: false,
      poem: '花近高楼伤客心，万方多难此登临',
    }
  },
  created() {
  },
  methods: {
    onRecordBegin() {

    },
    onRecordEnd() {

    },
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
