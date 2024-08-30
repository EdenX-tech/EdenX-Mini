import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登录弹框
    loginModal: {
      show: false
    },
    userInfo:null
  },
  getters: {
  },
  mutations: {
    ShowLoginModal(state) {
      state.loginModal.show = true;
    },
    updateUserInfo(state,data){
      state.userInfo = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
