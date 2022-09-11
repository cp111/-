import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// VUEX 持久化状态插件：vuex-persistedstate
/* vue2下载 3.2.1版本，引入，在调用： plugins: [createPersistedState({})],
配置项：key默认是vuex；
        storage：默认值是本地存储
        reducer:指定持久化哪些数据，return一个对象，对象就作为存储的value，
        默认传入参数state
*/

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      reducer({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  state: {
    tokenObj: {}
  },
  getters: {
    isLogin(state) {
      return !state.tokenObj.token // false
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  },
  actions: {},
  modules: {}
})
/* 申明一个变量放到vuex的state里面，其他组件要取出来的时候{{$store.state.变量名}}
vuex修改数据  自产自销  大驼峰命名法
mutations:函数，第一个参数是state，第二个参数可以自己传
函数名（state,payload） {}
其他组件触发mutations里面的方法：this.$store.commit('mutations方法名字',10)
这个10是payload，第二个参数

getters  相当于computed计算属性
getters的函数第一个参数是state

mapState ---- 将vuex里面的state映射到vue的computed
使用：引入mapState:函数，返回一个对象。 mapGetters同理
这个函数的参数是：[映射的属性]
computed: {
  ...mapState(['属性'])
}

*/
