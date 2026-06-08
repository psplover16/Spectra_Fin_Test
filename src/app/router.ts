import { createRouter, createWebHistory } from 'vue-router';
import { examRoutes } from '@/modules/exam/data/examRoutes';
import ExamRouteView from '@/modules/exam/views/ExamRouteView.vue';
import LandingView from '@/modules/exam/views/LandingView.vue';
import NotFoundView from '@/modules/exam/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LandingView,
      meta: { title: '國營資訊職員考試講義' }
    },
    ...examRoutes.map((route) => ({
      path: route.path,
      name: route.slug,
      component: ExamRouteView,
      meta: { title: route.displayName, category: route.category }
    })),
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '找不到頁面' }
    }
  ]
});

export default router;
