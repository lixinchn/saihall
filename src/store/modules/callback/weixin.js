import {callback_wrapper} from '../base'


export const callback_func = {
  WEIXIN_GetUserInfo: callback_wrapper((callback_args, response) => {
    alert('callback func')
    callback_args.commit('SET_USER_INFO', response.data)
    callback_args.resolve(response)
  })
}
