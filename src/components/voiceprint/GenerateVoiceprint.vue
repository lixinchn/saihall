<template>
  <div class="container">
    <h1>请输入邀请函的日期</h1>
    <p>请务必保证手机已经联网</p>
    <input type="date" v-on:keyup.13="onGen" v-model="vDate">
    <button @click="onGen" style="display: block; margin: 10px auto;">生成邀请函</button>
    <h1 v-show="show">可以点击右上角来进行分享了</h1>
  </div>
</template>

<script>
import {dispatch} from '../../utils/dispatch'
import WeiXin from '../../utils/weixin'
export default {
  name: 'GenerateVoiceprint',
  components: {},
  data () {
    return {
      vDate: '',
      show: false,
    }
  },
  created() {
  },
  methods: {
    onGen() {
      WeiXin.init(this, dispatch, `http://navi.mse.sogou.com/#/voiceprint?date=${this.vDate}`)
      setTimeout(() => {
        this.show = true
      }, 500)
    }
  },
  computed: {
  },

}
</script>

<style scoped lang="scss">
</style>
