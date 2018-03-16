/*
 * store 使用的默认的 callback 函数
 * 用在 module_base_func 函数中
 */
function callback_base(resolve, reject) {
  return response => {
    resolve(response.data)
  }
}

/*
 * 每一个 store 在监听到对应的 command 后执行的函数
 * api_func: function. 要调用的 api 函数的名字，也可以不传(就不调用任何 api)
 * callback_func: function.
 *                1. 一般情况下使用默认的 callback 即可
 *                2. 但是如果有修改 state 里面状态的需求，就需要传进来一个 callback 函数，覆盖掉默认函数。
 *                   传进来的 callback 函数与 callback_base 长相基本一致，拥有自己的 return 函数即可。
 */
export function module_base_func(api_func, callback_func = callback_base) {
  return ({commit, state}, data) => {
    return new Promise((resolve, reject) => {
      alert(JSON.stringify(data))
      const callback = callback_func(resolve, reject, commit, data)
      api_func ? api_func(data).then(callback).catch(error => {reject(error)}) : callback()
    })
  }
}

/*
 * store 的 callback 封装函数
 * 没什么太大意义，就是为了少些几行代码
 * 但是上面 callback_func 调用的参数顺序不能乱，如果今后有更改，此处调用 callback 也要修改
 */
export function callback_wrapper(callback) {
  return (...args) => {
    return response => {
      callback({resolve: args[0], reject: args[1], commit: args[2], data: args[3]}, response)
    }
  }
}
