import Vue from 'vue'
import Vuex from 'vuex'
import voiceprint from './modules/voiceprint'
import weixin from './modules/weixin'
import voicemerge from './modules/voicemerge'
import lipsynthesis from './modules/lipsynthesis'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    voiceprint,
    weixin,
    voicemerge,
    lipsynthesis,
  },
  getters,
})

export default store
