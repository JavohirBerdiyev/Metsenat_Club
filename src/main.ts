import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './style.css';
import 'tailwindcss/tailwind.css';
import 'typeface-rubik';

import DashboardLayout from "./components/DashboardLayout.vue"

const app = createApp(App);
const pinia = createPinia();

app.component("default-layout", DashboardLayout);
app.use(pinia);
app.use(router);
app.mount('#app');
