
import axiosInstance from './axiosInstance';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/variables.css';
/* main.css */
const app = createApp(App)

app.use(router)
app.config.globalProperties.$axios = axiosInstance;

app.use(store);
app.mount('#app')
