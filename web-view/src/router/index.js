import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/index'
import Reginster from '@/pages/register/index'
import Layout from '@/pages/layout/index'
import Home from '@/pages/home/index'
import AddPost from '@/pages/post/index'
import PostRead from '@/pages/post/PostRead'
import PostsManage from '@/pages/post/PostsManage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Reginster',
      component: Reginster
    },
    {
      path: '/home',
      name: 'Home',
      component: Layout,
      redirect: '/home/index',
      children: [
        {
          path: 'index',
          component: Home,
          meta: {
            auth: false
          }
        },
        {
          path: 'PostsManage',
          component: PostsManage,
          meta: {
            auth: true
          }
        },
        {
          path: 'update/post/:id',
          component: AddPost,
          meta: {
            auth: true
          }
        },
        {
          path: 'add/post',
          component: AddPost,
          meta: {
            auth: true
          }
        },
        {
          path: 'read/post/:id',
          component: PostRead,
          meta: {
            auth: false
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/home/index'
    }
  ]
})
