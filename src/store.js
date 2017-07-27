import Vue from 'vue'
import Vuex from 'vuex'

/*告诉 vue “使用” vuex*/
Vue.use(Vuex)

/*创建一个对象来保存应用启动时的初始状态，刷新页面，会重新初始化state*/
const state = {
   loginState:localStorage.getItem("loginState")||false
}


/*创建Getters，相当于是 store 的计算属性，可以获取到 state 中派生出一些状态*/
const getters = {
  getLoginState:state => { return state.loginState },
}

/*
创建一个mutations对象，在其他组件中不能直接调用 mutation中的一个函数或属性;
更改 Vuex 的 store 中的状态的唯一方法是调用 store.commit提交 mutation,例如：store.commit('setAuth', true);
*/
const mutations = {
  // TODO: 放置我们的状态变更函数
  setLoginState (state, loginState) {
  	 console.log("store=======",loginState)
  	 localStorage.setItem("loginState",loginState)
     state.loginState = loginState;
  },
 
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  getters,
  mutations,
})
