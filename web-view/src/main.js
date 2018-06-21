// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from './App'
import service from './service/index'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(Vuex)
Vue.use(service)
Vue.use(mavonEditor)

Vue.use(iView)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let obj = JSON.parse(window.localStorage.getItem('UserInfo'))
  if (to.meta.auth) {
    if (obj) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
