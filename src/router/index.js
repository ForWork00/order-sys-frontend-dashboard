import { createRouter, createWebHistory } from 'vue-router';





const routes = [
  { path: '/Login', name: 'Login',component: (Login) => import('@/views/Login.vue')},
  { path: '/Register', name: 'Register',component: () => import('@/views/Register.vue'),},
  { path: '/app', name: 'app',meta: { requiresAuth: true },component: () => import('@/app.vue') },
  { path: '/', name: 'home',meta: { requiresAuth: true },component: () => import('@/views/Home.vue') },
  { path: '/users', meta: { requiresAuth: true },component: () => import('@/views/Users.vue') },
  { path: '/products', meta: { requiresAuth: true },component: () => import('@/views/Products.vue') },
  { path: '/Report-Balance', meta: { requiresAuth: true },component: () => import('@/views/Report-Balance.vue')},
  { path: '/Report-Income', meta: { requiresAuth: true },component: () => import('@/views/Report-Income.vue')},
  { path: '/Report-CashFlow', meta: { requiresAuth: true },component: () => import('@/views/Report-CashFlow.vue')},
  { path: '/Item-Item',name: 'Item' ,meta: { requiresAuth: true },component: () => import('@/views/Item-Item.vue')},
  { path: '/Item-Order', meta: { requiresAuth: true },component: () => import('@/views/Item-Order.vue')},
  { path: '/Item-Vip', meta: { requiresAuth: true },component: () => import('@/views/Item-Vip.vue')},
   { path: '/Item-add', name: 'add',meta: { requiresAuth: true },component: () => import('@/views/Item-add.vue')},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
/*全局前置守衛
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token"); // 取得 Token

  if (to.meta.requiresAuth && !token) {
    // ⚠️ 強制重新加載頁面，確保跳轉到 Login.vue
    window.location.href = "/Login"; 
  } else {
    next(); // 正常導航
  }
});*/
export default router;