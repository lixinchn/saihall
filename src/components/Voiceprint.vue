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
import SpeakArea from './extension/SpeakArea'
export default {
  name: 'Voiceprint',
  components: {LeftTalkingBubble, SpeakArea},
  data () {
    return {
      date: this.$route.query.date || translateTimestampGetDatetime(Date.now()),
      VoiceprintData: data,
    }
  },
  created() {
    document.title = '搜狗体验厅邀请函'
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
