<template>
  <div class="container">
    <div v-for="(item, index) in list" :key="index" class="list">
      <p>openId: {{item.openid}}</p>
      <p>name: {{item.nickname}}</p>
      <p class="btn" @click="onDelete(item.openid)">删除</p>
    </div>
  </div>
</template>

<script>
import {dispatch} from '../../utils/dispatch'
import WeiXin from '../../utils/weixin'
export default {
  name: 'VoiceprintSetting',
  components: {},
  data () {
    return {
      list: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      dispatch(this, ['VOICEPRINT_GetVoiceList', {openId: WeiXin.getOpenId()}], (response) => {
        this.list = response.user_list
      })
    },

    onDelete(openId) {
      dispatch(this, ['VOICEPRINT_DeleteVoice', {openId: openId}], (response) => {
        alert('删除成功')
        this.getList()
      })
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;

  .list {
    border: 1px solid black;
    margin-top: 10px;

    .btn {
      color: #1d82fe;
      cursor: pointer;
    }
  }
}
</style>
