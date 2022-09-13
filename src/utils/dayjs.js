import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.extend(relativeTime)
// dayjs默认语言是英文
dayjs.locale('zh-cn')

export default dayjs
