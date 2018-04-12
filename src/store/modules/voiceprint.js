import {API_VOICEPRINT_Translate, API_VOICEPRINT_GetPoem, API_VOICEPRINT_ReadVerse, API_VOICEPRINT_ChangeName, API_VOICEPRINT_GetVoiceList,
        API_VOICEPRINT_DeleteVoice} from '../../api/voiceprint'
import {module_base_func} from './base'
import {callback_func} from './callback/voiceprint'

const voiceprint = {
  state: {
    voiceprintQuestion: {},
    sendQuestion: '',
  },
  mutations: {
    SET_NAME: (state, data) => {
      console.log(data)
    },
    SET_QUESTION: (state, data) => {
      state.voiceprintQuestion = data
      if (data.firstLine)
        state.sendQuestion = data.firstLine
    }
  },
  actions: {
    VOICEPRINT_Translate: module_base_func(API_VOICEPRINT_Translate),
    VOICEPRINT_SetName: module_base_func(null, callback_func.VOICEPRINT_SetName),
    VOICEPRINT_SetQuestion: module_base_func(null, callback_func.VOICEPRINT_SetQuestion),
    VOICEPRINT_GetPoem: module_base_func(API_VOICEPRINT_GetPoem),
    VOICEPRINT_ReadVerse: module_base_func(API_VOICEPRINT_ReadVerse),
    VOICEPRINT_ChangeName: module_base_func(API_VOICEPRINT_ChangeName),
    VOICEPRINT_GetVoiceList: module_base_func(API_VOICEPRINT_GetVoiceList),
    VOICEPRINT_DeleteVoice: module_base_func(API_VOICEPRINT_DeleteVoice),
  }
}

export default voiceprint
