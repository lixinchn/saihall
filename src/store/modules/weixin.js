import {API_WEIXIN_GetJSAPITicket} from '../../api/weixin'
import {module_base_func} from './base'

const weixin = {
  state: {

  },
  mutations: {

  },
  actions: {
    WEIXIN_GetJSAPITicket: module_base_func(API_WEIXIN_GetJSAPITicket),
  }
}

export default weixin
