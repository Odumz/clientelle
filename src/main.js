import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/main.css'
import axios from 'axios'

// axios.defaults.baseURL = 'https://clientelle.herokuapp.com/api/v1'
axios.defaults.baseURL = 'http://localhost:5000/api/v1'

// Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

// Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   return response
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error)
// })

createApp(App).use(store).use(router).mount('#app')
