import {fetch_wrapper} from './base'


export function API_VOICEPRINT_Translate(data) {
  return fetch_wrapper('translate', data)
}