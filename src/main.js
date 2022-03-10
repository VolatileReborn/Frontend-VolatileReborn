import {createApp} from "vue";
import App from './App.vue';
import router from "./router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import axiosHttp from "@/api/http"

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.$http = axiosHttp;
app.mount('#app');

