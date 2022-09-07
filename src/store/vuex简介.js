import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.count += payload
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
