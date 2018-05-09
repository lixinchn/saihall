import {API_LIPSYNTHESIS_SaveMouth} from '../../api/lipsynthesis'
import {module_base_func} from './base'

const voicemerge = {
  state: {
  },
  mutations: {
  },
  actions: {
    LIPSYNTHESIS_SaveMouth: module_base_func(API_LIPSYNTHESIS_SaveMouth),
  }
}

export default voicemerge
