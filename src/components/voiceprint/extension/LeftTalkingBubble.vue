<template>
  <div class="container">
  	<img src="/static/img/voiceprint/avatar.png" class="avatar">
  	<div class="bubble">
  		<p class="first">{{firstLine}}</p>
  		<p class="second">{{secondLine}}</p>
  		<p class="hint" v-if="hint">{{hint}}</p>
      <!-- <div class="arrow"></div> -->
  	</div>
  </div>
</template>

<script>
export default {
  name: 'LeftTalkingBubble',
  props: {
  	firstLine: {type: String, default: ''},
  	secondLine: {type: String, default: ''},
  	hint: {type: String, default: ''},
  },
  data () {
    return {
    }
  },
  created() {
  },
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
	text-align: left;
	overflow: hidden;
  position: relative;
	.avatar {
		width: 3em;
		float: left;
		vertical-align: top;
    border-radius: 50%;
	}
	.bubble {
		width: calc(100% - 5em);
		float: left;
		position: relative;
    min-height: 33px;
    left: 15px;
    border: 5px solid transparent;
    border-image-source: url(/static/img/voiceprint/left-bubble.png);
    border-image-slice: 60 37 28 38 fill; border-image-width: 35px 21px 16px 21px; border-image-outset: 0px 0px 0px 0px; border-image-repeat: repeat repeat;
    display: inline-block;
    padding: 0.1em 0.1em 0.1em 0.9em;

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
