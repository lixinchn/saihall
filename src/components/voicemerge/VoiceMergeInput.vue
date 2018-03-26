<template>
  <div class="container">
    <p style="color: #fff; font-size: 1.2em; margin: 0 auto;">请输入或粘贴一段文字进行语音合成</p>
    <div style="position: relative;">
      <textarea class="text" placeholder="请至少输入10个字" v-model="text"></textarea>
      <div class="hint" :style="autoStyle">{{count}}/50</div>
    </div>
    <div class="btn" @click="onNext" :style="autoStyleNext">下一步</div>
  </div>
</template>

<script>
import WeiXin from '../../utils/weixin'
export default {
  name: 'VoiceMergeInput',
  components: {},
  data () {
    return {
      text: '',
    }
  },
  created() {
    document.title = '语音合成'
    WeiXin.init(this, dispatch)
    WeiXin.getUserInfo(this, dispatch)
  },
  methods: {
    onNext() {
      if (this.text.length < 10 || this.text.length > 50)
        return
      this.$router.push({path: 'voicemerge', query: Object.assign({}, this.$route.query, {text: this.text})})
    }
  },
  computed: {
    count() {
      return this.text.length
    },
    autoStyle() {
      let style = {}
      if (this.text.length > 50)
        style['color'] = '#ff2e4c'
      return style
    },
    autoStyleNext() {
      let style = {}
      if (this.text.length < 10)
        style.opacity = '0.3'
      return style
    },
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: url(/static/img/voiceprint/background.png) no-repeat;
  padding-top: 2em;
  .text {
    border: 2px solid #2159a4;
    width: 80%;
    min-height: 10em;
    background: #17205b;
    border-radius: 8px;
    margin-top: 2em;
    padding: 1em;
    outline: none;
    color: #5e7cf5;
    font-size: 1.2em;
    &::placeholder {
      color: #5e7cf5;
    }
  }
  .hint {
    position: absolute;
    right: 10%;
    bottom: 1em;
    color: #5e7cf5;
    font-size: 1em;
  }
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
