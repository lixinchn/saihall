import {fetch_wrapper} from './base'


export function API_VOICEPRINT_Translate(data) {
  return fetch_wrapper('translate', data)
}

export function API_VOICEPRINT_GetPoem(data) {
  return fetch_wrapper('genVerse', data)
}

export function API_VOICEPRINT_ReadVerse(data) {
  return fetch_wrapper('readVerse', data)
}