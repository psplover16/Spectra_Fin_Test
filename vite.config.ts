import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

function normalizeBasePath(value: string | undefined): string {
  const rawValue = value?.trim() || '/';

  if (rawValue === '/') {
    return '/';
  }

  const withLeadingSlash = rawValue.startsWith('/') ? rawValue : `/${rawValue}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = normalizeBasePath(env.VITE_APP_BASE_PATH);

  return {
    base: basePath,
    build: {
      chunkSizeWarningLimit: 500,
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-vue': ['vue', 'vue-router']
          }
        }
      }
    },
    plugins: [
      vue(),
      VitePWA({
        filename: 'sw.js',
        registerType: 'prompt',
        manifest: {
          name: '國營資訊職員考試講義',
          short_name: '國營資訊講義',
          description: '國營事業新進職員資訊人員考試用的手機版 PWA 講義入口。',
          start_url: basePath,
          scope: basePath,
          display: 'standalone',
          background_color: '#f3efe8',
          theme_color: '#0f766e',
          icons: [
            {
              src: 'icons/exam-icon.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'any'
            }
          ]
        },
        workbox: {
          navigateFallback: `${basePath}index.html`,
          globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}']
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  };
});
