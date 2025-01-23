import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/users', component: () => import('@/views/Users.vue') },
  { path: '/products', component: () => import('@/views/Products.vue') },
  { path: '/Report-Balance', component: () => import('@/views/Report-Balance.vue')},
  { path: '/Report-Income', component: () => import('@/views/Report-Income.vue')},
  { path: '/Report-CashFlow', component: () => import('@/views/Report-CashFlow.vue')},
  { path: '/Item-Item', component: () => import('@/views/Item-Item.vue')},
  { path: '/Item-Order', component: () => import('@/views/Item-Order.vue')},
  { path: '/Item-Vip', component: () => import('@/views/Item-Vip.vue')},
  { path: '/Login', name: 'login',component: () => import('@/views/login.vue')},
  { path: '/register', name: 'register',component: () => import('@/views/register.vue')},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;