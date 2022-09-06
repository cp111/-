// 所有的postcss的插件都是函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxToRem({
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75), // 根节点字体大小
      propList: ['*'] // 所有的属性单位都转成rem
    })
  ]
}
