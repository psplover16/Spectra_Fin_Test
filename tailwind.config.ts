import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#24302f',
        slate: '#30404c',
        paper: '#f7f4ee',
        mist: '#e8eef0',
        teal: '#2f766d',
        brass: '#b78a36',
        coral: '#c95d4f'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(36, 48, 47, 0.08)'
      }
    }
  },
  plugins: []
} satisfies Config;
