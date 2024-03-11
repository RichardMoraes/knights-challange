import { createRouter, createWebHistory } from 'vue-router';
import Form from '../components/Form.vue';

const routes = [
  {
    path: '/knights',
    name: 'listKnights',
    component: () => import('../views/Knights.vue'),
  },
  {
    path: '/knights/create',
    name: 'createKnight',
    component: Form,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
