import { createApp } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import AppShell from '@/app/AppShell.vue';
import { createPwaRuntime, offlineReadinessKey } from '@/app/pwa';
import router from '@/app/router';
import '@/styles/main.css';

const app = createApp(AppShell);
const pwaRuntime = createPwaRuntime({ registerSW });

app.provide(offlineReadinessKey, pwaRuntime.state);
app.use(router).mount('#app');
