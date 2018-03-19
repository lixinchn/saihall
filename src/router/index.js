import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Voiceprint from '@/components/voiceprint/Voiceprint'
import VoiceprintHall  from '@/components/voiceprint/VoiceprintHall'
import VoiceprintHallSucc from '@/components/voiceprint/extension/VoiceprintHallSucc'
import VoiceprintHallName from '@/components/voiceprint/extension/VoiceprintHallName'

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
    {
      path: '/voiceprinthall',
      name: 'voiceprinthall',
      component: VoiceprintHall,
    },
    {
      path: '/voiceprinthallsucc',
      name: 'voiceprinthallsucc',
      component: VoiceprintHallSucc,
    },
    {
      path: '/voiceprinthallname',
      name: 'voiceprinthallname',
      component: VoiceprintHallName,
    },
  ]
})
