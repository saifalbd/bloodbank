import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Members from '../views/Membars/Membars.vue'
import { auth } from '../firebase'
import store from '../store'
import { LocalAuth } from '@/plugins/LocalAuth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/members',
    name: 'Member',
    component: Members,
    meta: {
      
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import( /* webpackChunkName: "login" */ '../views/test.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import( /* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !LocalAuth.check()) {
    next({name:'Login'})
  } else {
    
    next()
  }
})

export default router
