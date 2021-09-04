import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import "virtual:windi.css";

const app = createApp(App)
app.use(store)
app.mount('#app')

