import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginFormView from '@/views/LoginFormView.vue'
import ForumView from '@/views/ForumView.vue'
import PayView from '@/views/PayView.vue'
import ChallengeView from '@/views/ChallengeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login/form',
      name: 'loginForm',
      component: LoginFormView
    },
    {
      path: '/login/forum',
      name: 'loginForum',
      component: ForumView
    },
    {
      path: '/login/pay',
      name: 'loginPay',
      component: PayView
    },
    {
      path: '/login/challenge',
      name: 'loginChallenge',
      component: ChallengeView
    },
    
  ]
})

export default router
