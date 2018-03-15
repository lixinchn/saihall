import axios from 'axios'
import {create_params, request_params, response_params} from './base'

// 创建axios实例
const service = axios.create({
  ...create_params,
  baseURL: location.protocol + '//api-' + location.host, // baseURL: process.env.BASE_API, // api的base_url
})

// request拦截器
service.interceptors.request.use(request_params.config, request_params.error)

// respone拦截器
service.interceptors.response.use(response_params.response, response_params.error)

export default service
