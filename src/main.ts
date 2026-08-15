//import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { calculadoraApi } from '@/api/calculadoraApi'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

console.log('PRUEBA ENV:', import.meta.env.VITE_CALCULADORA_API_URL)

//app.use(BootstrapVueNext)

app.use(pinia)
app.use(router)

// Inicializar interceptor de Axios después de Pinia
function setupAxiosInterceptor() {
  calculadoraApi.interceptors.request.use((config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
      console.log('Token enviado en request:', authStore.token)
    } else {
      console.log('No hay token en el store')
    }
    return config
  })
}
setupAxiosInterceptor()

app.mount('#app')
