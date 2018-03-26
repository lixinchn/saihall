import {API_VOICEMERGE_SaveVoice} from '../../api/voicemerge'
import {module_base_func} from './base'

const voicemerge = {
  state: {
  },
  mutations: {
  },
  actions: {
    VOICEMERGE_SaveVoice: module_base_func(API_VOICEMERGE_SaveVoice),
  }
}

export default voicemerge
