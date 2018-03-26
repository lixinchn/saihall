<template>
  <div class="container">
    <img src="/static/img/voiceprint/voiceprint-hall-succ.png" style="margin: 40px auto 0 auto;">
    <p style="color: #38a4fb; font-size: 2em; margin: 1em auto 0 auto;">内容发送成功</p>
    <p style="color: #fff; font-size: 1.3em; margin: 1.8em auto 0 auto;">您可以再今日资讯页面查看了</p>
    <p style="color: #fff; font-size: 1.3em; margin: .8em auto 0 auto;">目前发送的内容较多，前面还有{{count}}条</p>
    <div class="btn" @click="onRecord">再发送一条</div>
  </div>
</template>

<script>
export default {
  name: 'VoiceMergeSucc',
  components: {},
  data () {
    return {
      count: 0,
    }
  },
  created() {
    this.count = this.$route.query.count
  },
  methods: {
    onRecord() {
      this.$router.push({path: 'voicemergeinput'})
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
