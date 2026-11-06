import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Project site: https://zhuyanhe1975-hit.github.io/ai_studio_demo/
const pagesBase = '/ai_studio_demo/';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Public Pages builds run on GitHub Actions. Never inline a Gemini key there.
    // Local builds still read GEMINI_API_KEY; an unset key stays an empty string.
    const geminiApiKey = process.env.GITHUB_ACTIONS ? '' : (env.GEMINI_API_KEY ?? '');
    return {
      // Dev server stays at /. Production build and preview use the project-site path.
      base: mode === 'production' ? pagesBase : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(geminiApiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
