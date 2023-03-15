import { useLocalStorage } from '@/use/useLocalStorage'
import axios from 'axios'
import { message } from 'ant-design-vue';
const instance = axios.create({
  baseURL: '/api',
})
// 请求拦截
instance.interceptors.request.use((config) => {
  const { value: token } = useLocalStorage('token', '')
  if (config.headers && token.value) {
    config.headers['x-token'] = token.value
  }
  return config
})
// 响应拦截
instance.interceptors.response.use(
  (response) => {
    const { data: _data } = response
    const { data, code, msg } = _data
    if (code !== 0) {
      message.warning(msg).then(() => {
        // 关闭弹窗的逻辑
      })
      return Promise.reject(msg)
    }
    return data
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      message.warning('请登录').then(() => {
        // 关闭弹窗的逻辑
      })
    }
  }
)

export default instance
