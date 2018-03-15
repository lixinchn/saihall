import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Voiceprint from '@/components/Voiceprint'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/voiceprint',
      name: 'voiceprint',
      component: Voiceprint,
    },
  ]
})
