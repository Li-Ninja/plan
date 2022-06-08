import { createApp } from 'vue';
import App from './App.vue';
import { prepareApi } from '@/makers/api.maker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createApp(App).mount('#app');

const app = createApp(App);

prepareApi(app);
app.mount('#app');