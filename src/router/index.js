import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import LoginFormView from '@/views/LoginFormView.vue'
import ForumView from '@/views/ForumView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
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
    
  ]
})

export default router
