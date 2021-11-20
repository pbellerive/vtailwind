import { createApp } from 'vue';
import App from './App.vue';
import vsettings from './index.js';

const app = createApp(App);

const settings = {
    button: {
        css: {
            baseCss: 'bg-blue-200 border border-black'
        }
    },
    input: {
        css: {
            baseCss: 'border border-black rounded'
        }
    }
};

app.use(vsettings, settings);
app.mount('#app');
