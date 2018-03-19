import {API_VOICEPRINT_Translate} from '../../api/voiceprint'
import {module_base_func} from './base'
import {callback_func} from './callback/voiceprint'

const voiceprint = {
  state: {
    voiceprintQuestion: {},
  },
  mutations: {
    SET_NAME: (state, data) => {
      console.log(data)
    },
    SET_QUESTION: (state, data) => {
      state.voiceprintQuestion = data
    }
  },
  actions: {
    VOICEPRINT_Translate: module_base_func(API_VOICEPRINT_Translate),
    VOICEPRINT_SetName: module_base_func(null, callback_func.VOICEPRINT_SetName),
    VOICEPRINT_SetQuestion: module_base_func(null, callback_func.VOICEPRINT_SetQuestion),
  }
}

export default voiceprint
