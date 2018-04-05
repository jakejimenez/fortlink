import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/match',
      name: 'match',
      component: require('@/components/MatchFinder').default
    },
    {
      path: '/stats',
      name: 'stats',
      component: require('@/components/Stats').default
    },
    {
      path: '/profile',
      name: 'profile',
      component: require('@/components/Profile').default
    },
    {
      path: '/status',
      name: 'status',
      component: require('@/components/Status').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
