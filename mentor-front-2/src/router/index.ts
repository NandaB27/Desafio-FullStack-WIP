/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/home.vue';
import Signup from '@/pages/signup.vue'; // Importe a nova view
import Login from '@/pages/login.vue';
import StartPage from '@/pages/homepage.vue';

const routes = [
  { path: '/', component: StartPage },
  { path: '/home', component: Home },
  { path: '/signup', component: Signup }, // Defina a nova rota
  { path: '/login', component: Login },
  // Outras rotas
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
