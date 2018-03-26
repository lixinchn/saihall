import {fetch_wrapper} from './base'


export function API_VOICEMERGE_SaveVoice(data) {
  return fetch_wrapper('saveVoice', data)
}
