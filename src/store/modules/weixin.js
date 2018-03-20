import {API_WEIXIN_GetJSAPITicket, API_WEIXIN_Translate, API_WEIXIN_GetUserInfo} from '../../api/weixin'
import {module_base_func} from './base'
import {callback_func} from './callback/weixin'

const weixin = {
  state: {
    userInfo: {},
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      alert(JSON.stringify(userInfo))
      state.userInfo = userInfo
    },
  },
  actions: {
    WEIXIN_GetJSAPITicket: module_base_func(API_WEIXIN_GetJSAPITicket),
    WEIXIN_Translate: module_base_func(API_WEIXIN_Translate),
    WEIXIN_GetUserInfo: module_base_func(API_WEIXIN_GetUserInfo, callback_func.WEIXIN_GetUserInfo),
  }
}

export default weixin
