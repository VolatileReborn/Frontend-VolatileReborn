import {createApp} from "vue";
import App from './App.vue';
import router from "./router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
// import axiosHttp from './api/http'
// import VueAxios from 'vue-axios'
import VueParticles from 'vue-particles'
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(VueParticles)
//  app.config.globalProperties.$http = axiosHttp
// app.use(VueAxios,axiosHttp)
app.mount('#app');

