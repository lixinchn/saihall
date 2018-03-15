import {get_err_comment} from './error'


/*
 * self: 传 this 就行
 * params: 一个数组。
 *         第1个参数一定是 command，如: BILL_PackageList
 *         第2个参数可选，如果请求需要对应的数据，就传，反之不传
 * callback: function. 请求成功之后要执行的函数
 * always_run_func(optional): function. 请求不论成功失败都要执行的函数
 */
export function dispatch(self, params, callback, always_run_func = null) {
  self.$store.dispatch(...params).then((data = {}) => {
    always_run_func && always_run_func()
    callback(data)
  }).catch(err => {
    alert('发生错误，请稍后再试')
    always_run_func && always_run_func()
  })
}
