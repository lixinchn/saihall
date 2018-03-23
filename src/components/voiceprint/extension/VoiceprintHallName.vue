<template>
  <div class="container">
    <wei-xin-need v-if="weiXinNeed"></wei-xin-need>
    <div class="head" v-if="!weiXinNeed">
      <img :src="onUserInfo.headimgurl">
      <p>请输入您的名字：</p>
      <input class="name" type="text" v-model="name">
    </div>
    <div class="btn" @click="onNext" v-if="!weiXinNeed">下一步</div>
  </div>
</template>

<script>
import WeiXinNeed from './WeiXinNeed'
import WeiXin from '../../../utils/weixin'
import {dispatch} from '../../../utils/dispatch'
import {mapGetters} from 'vuex'
export default {
  name: 'VoiceprintHallName',
  components: {WeiXinNeed},
  data () {
    return {
      weiXinNeed: !navigator.userAgent.includes('MicroMessenger'),
      // weiXinNeed: false,
      name: '',
    }
  },
  created() {
    document.title = '录入声纹'
  },
  methods: {
    getUserInfo() {
      const data = {code: this.getCode()}
      let openId = WeiXin.getOpenId()
      if (openId)
        data.openid = openId
      dispatch(this, ['WEIXIN_GetUserInfo', data], (response) => {
        console.log(response)
        if (!response.data.code) {
          console.log('没有用户信息，准备跳转')
          WeiXin.redirectToGetcode()
          return
        }

        // 存一下openId
        WeiXin.setOpenId(response.data.openid)
      })
    },

    onNext() {
      dispatch(this, ['VOICEPRINT_SetName', {name: this.name}], (response) => {
        this.$router.push({path: 'voiceprinthall', query: this.$route.query})
      })
    },
  },

  computed: {
    ...mapGetters({
      onUserInfo: 'userInfo',
    })
  },

  watch: {
    onUserInfo(userInfo) {
      alert(JSON.stringify(userInfo))
      this.name = userInfo.nickname
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: url(/static/img/voiceprint/background.png) no-repeat;

  .head {
    padding: 2em 1.5em;
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

    .name {
      color: #23cbfb;
      font-size: 1.2em;
      height: 2em;
      background: #17205b;
      border: 2px solid #2159a4;
      border-radius: 8px;
      margin-top: 1em;
      width: calc(100% - 2em);
      outline: none;
      padding: 0 1em;
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
    margin: 1em auto;
  }
}
</style>
