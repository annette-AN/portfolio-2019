import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


console.log('process.env.NODE_ENV',process.env.NODE_ENV)
export default new Router({
  mode: 'hash',
  base: process.env.NODE_ENV === "development" ? "/" : process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./pages/home.vue')
    },
    {
      path: '/board-list',
      name: 'Board list',
      component: () => import('./pages/BoardList.vue')
    },
    {
      path: '/board-view/:id',
      name: 'Board view',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./pages/BoardView.vue')
    },
    {
      path: '/board-write',
      name: 'Board write',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./pages/BoardWrite.vue')
    },
    {
      path: '/board-write/:id',
      name: 'Board write with id',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./pages/BoardWrite.vue')
    }
  ]
})
