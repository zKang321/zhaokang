/**
 * http配置
 */
import axios from 'axios'
import Qs from 'qs'
import * as hub from './eventHub'

// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
axios.interceptors.request.use(config => {
 // TODO loading
  if (!(config.url === '/ocs/api/message')) {
    hub.eventHub.$emit('loading', 'start')
  }
  if (config.method === 'post' && config.url.indexOf('/uaa/oauth/token') >= 0) {
    config.data = Qs.stringify(config.data)
  }
  if (config.method === 'get') {
    if (config.url.indexOf('?') > 0) {
      config.url += '&time=' + new Date().getTime()
    } else {
      config.url += '?time=' + new Date().getTime()
    }
  }
  let token = sessionStorage.getItem('token')
  if (token) {
    token = JSON.parse(token)
    config.headers['Authorization'] = token.token_type + ' ' + token.access_token
  } else {
    config.headers['Authorization'] = 'Basic d2ViX2FwcDo='
  }
  return config
}, error => {
  hub.eventHub.$emit('loading', 'error')
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  hub.eventHub.$emit('loading', 'finish')
  return data
}, error => {
  hub.eventHub.$emit('loading', error)
  if (error.response.status === 401) {
    window.location.href = '/#/login'
  }
  return Promise.reject(error)
})

export default axios
