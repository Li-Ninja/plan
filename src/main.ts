import { createApp } from 'vue';
import App from './App.vue';
import { prepareApi } from '@/makers/api.maker';
import { prepareNotify } from '@/makers/notify.maker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);

prepareApi(app);
prepareNotify(app);
app.mount('#app');