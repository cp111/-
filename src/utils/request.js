// 下载 引入
import axios from 'axios'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
// export default axios

// 克隆axios,按需导出，如果有别的基准地址，克隆一份起一个新的变量名字即可
const request = axios.create({
  timeout: 5000, // 超时
  baseURL: 'http://toutiao.itheima.net'
})

export default request
