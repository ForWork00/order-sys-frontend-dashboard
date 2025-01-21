import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 確保路由導入正確
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(router); // 註冊路由
app.use(ElementPlus); // 註冊 Element Plus
app.mount('#app');