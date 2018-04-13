<template>
  <div class="container">
    <img src="/static/img/voiceprint/voiceprint-hall-succ.png" style="margin: 40px auto 0 auto;">
    <p style="color: #38a4fb; font-size: 2em; margin: 1.5em auto 0 auto;">录入成功</p>
    <p style="color: #fff; font-size: 1em; margin: .8em auto 0 auto;">您可以在展厅中进行听声识人的体验了</p>
    <div class="btn" @click="onRecord">重新录入声纹</div>
  </div>
</template>

<script>
import WeiXin from '../../../utils/weixin'
import {dispatch} from '../../../utils/dispatch'
export default {
  name: 'WeiXinNeed',
  components: {},
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
    onRecord() {
      WeiXin.clearVoiceprintSucc()
      dispatch(this, ['VOICEPRINT_DeleteVoice', {openId: WeiXin.getOpenId()}], (response) => {
        this.$router.push({path: 'voiceprinthallname', query: this.$route.query})
      })
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: url(/static/img/voiceprint/background.png) no-repeat;
  .btn {
    background: url(/static/img/voiceprint/voiceprint-hall-succ-btn.png) no-repeat;
    background-size: 100% 100%;
    width: 10em;
    height: 3.5em;
    line-height: 3.5em;
    text-align: center;
    font-size: 1.2em;
    color: #fff;
    margin: 2em auto;
  }
}
</style>
