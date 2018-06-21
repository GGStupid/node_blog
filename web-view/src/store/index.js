import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: window.localStorage.getItem('UserInfo') ? JSON.parse(window.localStorage.getItem('UserInfo')) : {},
  homePosts: []
}

const mutations = {
  UserInfo: (state, data) => {
    state.user = data
    window.localStorage.setItem('UserInfo', JSON.stringify(data))
  },
  LOGOUT: (state) => {
    state.user = {}
  },
  homePosts (state, data) {
    state.homePosts = data
  }
}
const actions = {
  UserInfo ({ commit }, data) {
    commit('UserInfo', data)
  },
  UserLogout ({ commit }) {
    commit('LOGOUT')
  },
  homePosts ({ commit }, data) {
    commit('homePosts', data)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
