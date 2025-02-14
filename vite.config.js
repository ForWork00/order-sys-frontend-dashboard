import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  server: {
    port: 5186, 
    host: true, // ✅ 允許外部訪問
    strictPort: true,
    cors: true,// ✅ 允許跨域請求
    hmr: {
      clientPort: 443, // ✅ 確保 ngrok 的 WebSocket 連線正確
    },
    allowedHosts: ['.ngrok-free.app'], // ✅ 允許 ngrok 產生的域名
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});