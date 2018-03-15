import {API_WEIXIN_GetJSAPITicket, API_WEIXIN_Translate} from '../../api/weixin'
import {module_base_func} from './base'

const weixin = {
  state: {

  },
  mutations: {

  },
  actions: {
    WEIXIN_GetJSAPITicket: module_base_func(API_WEIXIN_GetJSAPITicket),
    WEIXIN_Translate: module_base_func(API_WEIXIN_Translate),
  }
}

export default weixin
