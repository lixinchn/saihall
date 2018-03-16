import {fetch_wrapper} from './base'


export function API_WEIXIN_GetJSAPITicket() {
  return fetch_wrapper('weixin/getTicket')
}

export function API_WEIXIN_Translate(data) {
  return fetch_wrapper('recog_service', data)
}

export function API_WEIXIN_GetUserInfo(data) {
  return fetch_wrapper('weixin/userLogin', data)
}
