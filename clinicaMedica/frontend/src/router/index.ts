import Dashboard from '../views/Dashboard.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Agendamento from '../views/Agendamento.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/agendamento',
      component: Agendamento,
    },
    {
      path: '/dashboard',
      component: Dashboard,
    },
  ],
});

export default router;

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token');

  if (!token && to.path !== '/') {
    next('/');
  } else {
    next();
  }
});
