<template>
  <div class="container">
    <img src="/static/img/voiceprint/voiceprint-hall-succ.png" style="margin: 60px auto 0 auto; width: 6em;">
    <p style="color: #fff; font-size: 2em; margin: 1em auto 0 auto;">录入成功</p>
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
    width: 8em;
    height: 2.5em;
    line-height: 2.5em;
    text-align: center;
    font-size: 1em;
    color: #5e7cf5;
    margin: 2em auto;
  }
}
</style>
