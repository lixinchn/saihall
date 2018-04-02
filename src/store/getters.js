const getters = {
  userInfo: state => state.weixin.userInfo,
  voiceprintQuestion: state => state.voiceprint.voiceprintQuestion,
  sendQuestion: state => state.voiceprint.sendQuestion,
}

export default getters
