import store from '../../store'


export const create_params = {
  timeout: 25000,                  // 请求超时时间
  withCredentials: false,
}

export const request_params = {
  config: config => {
    if (config.method.toLowerCase() === 'post') {
      // config.headers['Content-Type'] = 'application/json; charset=UTF-8';
      // config.withCredentials = true;
    }
    // Do something before request is sent
    // if (store.getters.token) {
    //   config.headers['X-Token'] = store.getters.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // }
    return config
  },
  error: error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
}

export const response_params = {
  response: response => {
    // if (response.data.code === 0) {
    //   return Promise.reject('内部错误')
    // }
    return response
  },

  error: error => {
    console.log('err' + error) // for debug
    alert(2)
    alert(JSON.stringify(error))
    alert('发生错误，请稍后再试')
    return Promise.reject(error)
  }
}
