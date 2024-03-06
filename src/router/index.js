import Vue from 'vue'
import VueRouter from 'vue-router'
import { jwtDecode } from 'jwt-decode'

import Login from '../components/Login.vue'
import Admin from '../components/Admin.vue'
import Editor from '../components/Editor.vue'
import Viewer from '../components/Viewer.vue'
import Unauthorized from '../components/Unauthorized.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: { role: 'admin' }
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      meta: { role: 'editor' }
    },
    {
      path: '/viewer',
      name: 'Viewer',
      component: Viewer,
      meta: { role: 'viewer' }
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/unauthorized', '/']
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if (loggedIn) {
    const decoded = jwtDecode(loggedIn);
    const role = decoded.role;
    if (to.meta.role && to.meta.role !== role) {
      return next('/unauthorized');
    }
  }
  next();
})

export default router
