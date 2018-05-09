<template>
  <div class="container">
    <p style="color: #fff; font-size: 1.2em; margin: 0 auto;">请点击选择要合成的声音</p>
    <div class="avatar-container">
      <div class="avatar" v-for="(item, index) in avatar" :key="index">
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
  name: 'LipSynthesis',
  components: {},
  data () {
    return {
      canSend: false,
      chosen: -1,
      text: '',
      avatar: [
        {avatar: '/static/img/lipsynthesis/role1.png', avatarActive: '/static/img/lipsynthesis/role1-active.png', name: '角色1', active: false},
        {avatar: '/static/img/lipsynthesis/role2.png', avatarActive: '/static/img/lipsynthesis/role2-active.png', name: '角色2', active: false},
      ],
    }
  },
  created() {
    this.getText()
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
      dispatch(this, ['LIPSYNTHESIS_SaveMouth', data], (response) => {
        if (response.code) {
          this.$router.push({path: 'lipsynthesissucc', query: {count: response.queueCount}})
        }
      })
    },
    onChoose(index) {
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
