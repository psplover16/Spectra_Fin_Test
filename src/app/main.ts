import { createApp, ref } from 'vue';
import AppShell from '@/app/AppShell.vue';
import {
  defaultOfflineReadinessState,
  offlineReadinessKey,
  registerExamServiceWorker
} from '@/app/pwa';
import router from '@/app/router';
import '@/styles/main.css';

const app = createApp(AppShell);
const offlineReadiness = ref(defaultOfflineReadinessState);

app.provide(offlineReadinessKey, offlineReadiness);
app.use(router).mount('#app');

void registerExamServiceWorker().then((state) => {
  offlineReadiness.value = state;
});
