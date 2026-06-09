import { createRouter, createWebHistory, type RouteRecordRaw, type RouterHistory } from 'vue-router';
import { routeComponentLoaders } from '@/app/routePreload';
import NotFoundView from '@/modules/exam/views/NotFoundView.vue';

const legacySubjectRedirects = [
  { path: '/computer-principles', redirect: '/a-group' },
  { path: '/networking', redirect: '/a-group' },
  { path: '/information-management', redirect: '/b-group' },
  { path: '/programming', redirect: '/b-group' }
] as const;

const routes: RouteRecordRaw[] = [
    {
      path: '/',
      redirect: '/a-group'
    },
    {
      path: '/a-group',
      name: 'a-group',
      component: routeComponentLoaders.aGroup,
      meta: { title: 'A 組' }
    },
    {
      path: '/a-group/:year(10[7-9]|11[0-4])',
      name: 'a-group-year',
      component: routeComponentLoaders.aGroupYear,
      meta: { title: 'A 組年度解析' }
    },
    {
      path: '/b-group',
      name: 'b-group',
      component: routeComponentLoaders.bGroup,
      meta: { title: 'B 組' }
    },
    {
      path: '/b-group/:year(10[7-9]|11[0-4])',
      name: 'b-group-year',
      component: routeComponentLoaders.bGroupYear,
      meta: { title: 'B 組年度解析' }
    },
    {
      path: '/language',
      name: 'language',
      component: routeComponentLoaders.language,
      meta: { title: '語言' }
    },
    {
      path: '/language/:year(10[7-9]|11[0-2])',
      name: 'language-year',
      component: routeComponentLoaders.languageYear,
      meta: { title: '語言年度解析' }
    },
    {
      path: '/learning',
      name: 'learning',
      component: routeComponentLoaders.learning,
      meta: { title: '學習' }
    },
    ...legacySubjectRedirects,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '找不到頁面' }
    }
  ];

export function createAppRouter(history: RouterHistory = createWebHistory(import.meta.env.BASE_URL)) {
  return createRouter({
    history,
    routes
  });
}

export default createAppRouter();
