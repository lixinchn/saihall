import {fetch_wrapper} from './base'


export function API_WEIXIN_GetJSAPITicket() {
  return fetch_wrapper('weixin/getTicket')
}