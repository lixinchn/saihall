import vue from 'vue'
import vuex from 'vuex'
import voiceprint from './modules/voiceprint'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    voiceprint,
  },
  getters,
})

export default store
