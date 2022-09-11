// 下载 引入
import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
// export default axios

// 克隆axios,按需导出，如果有别的基准地址，克隆一份起一个新的变量名字即可
const request = axios.create({
  timeout: 5000, // 超时
  baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(
  function (config) {
    // 每次发请求都会执行
    // 在发请求之前做什么操作
    // 登录后，所有请求加上Authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store

    if (!isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
