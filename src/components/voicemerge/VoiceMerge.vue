<template>
  <div class="container">
    <p style="color: #fff; font-size: 1.2em; margin: 0 auto;">请点击选择要合成的声音</p>
    <p v-if="linWarning" style="color: #5e7cf5; font-size: 1.2em; margin: 0; position: relative; top: 1em;">林志玲的声音还不支持英文内容语音合成</p>
    <div class="avatar-container">
      <div class="avatar" v-for="(item, index) in avatar" :key="index" :style="autoStyleLin(index)">
        <img :src="item.avatar" v-show="!item.active" class="head" @click="onChoose(index)">
        <img :src="item.avatarActive" v-show="item.active" class="head-active">
        <p style="color: #5e7cf5; font-size: 1.2em; margin-top: 0;">{{item.name}}</p>
      </div>
    </div>
    <div class="text-container">
      <div class="text">
        {{text}}
      </div>
    </div>
    <div class="btn" @click="onSend" :style="autoStyleSend">发送</div>
  </div>
</template>

<script>
import WeiXin from '../../utils/weixin'
import {dispatch} from '../../utils/dispatch'
export default {
  name: 'VoiceMerge',
  components: {},
  data () {
    return {
      canSend: false,
      linWarning: false,
      chosen: -1,
      text: '',
      avatar: [
        {avatar: '/static/img/voicemerge/wang.png', avatarActive: '/static/img/voicemerge/wang-active.png', name: '王小川', active: false},
        {avatar: '/static/img/voicemerge/lin.png', avatarActive: '/static/img/voicemerge/lin-active.png', name: '林志玲', active: false},
        {avatar: '/static/img/voicemerge/trump.png', avatarActive: '/static/img/voicemerge/trump-active.png', name: '特朗普', active: false},
      ],
    }
  },
  created() {
    this.getText()
    this.linWaningWork()
  },
  methods: {
    onSend() {
      if (this.chosen < 0)
        return
      const data = {
        txt: this.text,
        openId: WeiXin.getOpenId(),
        peopleId: this.chosen + 1,
      }
      dispatch(this, ['VOICEMERGE_SaveVoice', data], (response) => {
        if (response.code) {
          this.$router.push({path: 'voicemergesucc', query: {count: response.count}})
        }
      })
    },
    onChoose(index) {
      if (this.avatar[index].name === '林志玲' && this.linWarning)
        return

      this.avatar.forEach(item => {
        item.active = false
      })
      this.avatar[index].active = true
      this.canSend = true
      this.chosen = index
    },
    getText() {
      this.text = this.$route.query.text || ''
    },
    linWaningWork() {
      this.linWarning = /[a-z]/.test(this.text)
    },
    autoStyleLin(index) {
      let style = {}
      if (this.avatar[index].name === '林志玲' && this.linWarning)
        style.opacity = 0.3
      return style
    }
  },
  computed: {
    autoStyleSend() {
      let style = {}
      if (!this.canSend)
        style.opacity = '0.3'
      return style
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: url(/static/img/voiceprint/background.png) no-repeat;
  padding-top: 2em;
  .avatar-container {
    width: 100%;
    margin-top: 4em;

    .avatar {
      display: inline-block;
      width: 30%;

      .head {
        width: 70%;
        margin-top: 10px;
      }
      .head-active {
        width: calc(70% + 10px);
      }
    }
  }
  .text-container {
    width: 90%;
    min-height: 200px;
    margin: 0 auto;
    background: url(/static/img/voicemerge/border.png) no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 1.2em;
    display: table;
    .text {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }
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
