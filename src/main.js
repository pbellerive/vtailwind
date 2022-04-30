import { createApp } from 'vue';
import App from './App.vue';
import vsettings from './index.js';

const app = createApp(App);

const settings = {
    // input: {
    //     css: {
    //         bgCss: 'bg-gray-100 border border-black rounded'
    //     }
    // }
};

app.use(vsettings, settings);
app.mount('#app');
