import {API_VOICEPRINT_Translate} from '../../api/voiceprint'
import {module_base_func} from './base'

const voiceprint = {
  state: {

  },
  mutations: {

  },
  actions: {
    VOICEPRINT_Translate: module_base_func(API_VOICEPRINT_Translate),
  }
}

export default voiceprint
