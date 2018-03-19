<template>
  <div class="container" :style="autoStyle">
    <img src="userInfo.headimgurl" class="avatar">
    <div class="bubble">
      {{answer}}
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'RightTalkingBubble',
  props: {
    answer: {type: String, default: ''},
    marginTop: {type: Boolean, default: true},
  },
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
    
  },
  computed: {
    autoStyle() {
      let style = {}
      if (this.marginTop)
        style['margin-top'] = '10px'
      return style
    },
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style scoped lang="scss">
@media (max-width: 330px) {
  .avatar {
    width: 3em !important;
  }

  .arrow {
    top: 1.3em !important;
  }

  .bubble {
  }
}
.container {
  padding: 0 1.4em 0 1.3em;
  text-align: right;
  overflow: hidden;
  position: relative;
  .avatar {
    width: 3em;
    float: right;
    vertical-align: top;
  }
  .bubble {
    max-width: calc(100% - 5em);
    float: right;
    position: relative;
    right: 15px;
    border: 5px solid transparent;
    border-image-source: url(/static/img/voiceprint/right-bubble.png);
    border-image-slice: 60 37 28 38 fill; border-image-width: 31px 21px 16px 21px; border-image-outset: 0px 0px 0px 0px; border-image-repeat: repeat repeat;
    display: inline-block;
    padding: 0.5em 0.6em 0.5em 0.1em;
    font-size: 1em;
    color: #fff;
    text-align: left;

    p {
      margin: 0;
      font-size: 1em;
      color: #fff;
      margin-bottom: 0.5em;
    }

    .hint {
      color: #5e7cf5;
    }

    .arrow {
      width: .7em;
      height: .7em;
      border-top: .1em #2159a4 solid;
      border-left: .1em #2159a4 solid;
      position: absolute;
      left: -0.5em;
      top: 1.5em;
      background: #17205b;
      transform: rotate(-45deg);
    }
  }
}
</style>
