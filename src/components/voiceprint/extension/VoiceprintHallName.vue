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
      // weiXinNeed: !navigator.userAgent.includes('MicroMessenger'),
      weiXinNeed: false,
      name: '',
    }
  },
  created() {
    let succ = WeiXin.getVoiceprintSucc()
    // alert(succ)
    if (succ == '1') {
      this.$router.replace({path: 'voiceprinthallsucc'})
      return
    }

    document.title = '录入声纹'

    let debug = this.$route.query.debug == '1' ? true : false
    WeiXin.init(this, dispatch, undefined, debug)
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      let code = this.getCode()
      const data = {code:  code}
      let openId = WeiXin.getOpenId()
      if (openId)
        data.openid = openId
      dispatch(this, ['WEIXIN_GetUserInfo', data], (response) => {
        if (!response.data.code) {
          console.log('没有用户信息，准备跳转')
          WeiXin.redirectToGetcode()
          return
        }

        // 存一下openId
        WeiXin.setOpenId(response.data.openid)
      })
    },
    getCode() {
      // let url = new URL(location.href)
      // try {
      //   let code = url.searchParams.get('code')
      //   return code
      // } catch(e) {
      //   return null
      // }
      let params = this.parse_query_string(location.href.substr(location.href.indexOf('?') + 1))
      return params.code || null
    },

    parse_query_string(query) {
      var vars = query.split("&");
      var query_string = {};
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(pair[1]);
          // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
          query_string[pair[0]] = arr;
          // If third or later entry with this name
        } else {
          query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
      }
      return query_string;
    },

    onNext() {
      dispatch(this, ['VOICEPRINT_ChangeName', {username: this.name, openId: WeiXin.getOpenId()}], (response) => {
        dispatch(this, ['VOICEPRINT_SetName', {name: this.name}], (response) => {
          let query = this.$route.query
          query.name = this.name
          this.$router.push({path: 'voiceprinthall', query: query})
        })
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
