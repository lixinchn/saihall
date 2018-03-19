import {callback_wrapper} from '../base'


export const callback_func = {
  VOICEPRINT_SetName: callback_wrapper((callback_args, response) => {
    callback_args.commit('SET_NAME', callback_args.data)
    callback_args.resolve()
  })
}
