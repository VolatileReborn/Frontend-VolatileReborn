import {createApp} from "vue";
import App from './App.vue';
import router from "./router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
console.log(window.localStorage.getItem("nickname"))
console.log(window.localStorage.getItem("role"))