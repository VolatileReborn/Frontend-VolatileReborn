import {createApp} from "vue";
import App from './App.vue';
import router from "./router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
// import axiosHttp from './api/http'
// import VueAxios from 'vue-axios'
import VueParticles from 'vue-particles'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueGridLayout from 'vue-grid-layout'


const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(Antd);
app.use(VueParticles)
app.use(VueGridLayout)
//  app.config.globalProperties.$http = axiosHttp
// app.use(VueAxios,axiosHttp)
app.mount('#app');

