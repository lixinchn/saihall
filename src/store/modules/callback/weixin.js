import {callback_wrapper} from '../base'


export const callback_func = {
  WEIXIN_GetUserInfo: callback_wrapper((callback_args, response) => {
    callback_args.commit('SET_USER_INFO', response.userinfo)
    callback_args.resolve(response)
  })
}
