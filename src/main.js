import { createApp } from 'vue';
import App from './App.vue';
import vsettings from './index.js';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: []
});

const app = createApp(App);

const settings = {
  input: {
    css: {
      variant: {
        newVariant: {
          bgCss: 'bg-gray-100 border border-black rounded'
        }
      }
    }
  }
};

app.use(vsettings, settings);
app.use(router);

app.mount('#app');
