import '/public/assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'

var token = store.getters.getToken

// axios
axios.defaults.headers.common['Authorization'] = token ?? ''
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/' : 'https://api.trustshield.my.id/api/'

// if axios response code is 401, then logout
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            store.dispatch('logout')
        }
        return Promise.reject(error)
    }
)

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueAxios, axios)

app.mount('#app')
