import axios from 'axios'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import type { AdmLoteModel } from '@/model/AdmLoteModel'
import type { UbigeoModel } from '@/model/UbigeoModel'

const calculadoraApi = axios.create({
  baseURL: import.meta.env.VITE_CALCULADORA_API_URL,
})

// Interceptor para agregar el token a cada petición
calculadoraApi.interceptors.request.use((config) => {
  // IMPORTANTE: accede al store dentro del interceptor
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
    console.log('Token enviado en request:', authStore.token)
  } else {
    console.log('No hay token en el store')
  }
  return config
})

export async function enviarData(data: AdmLoteModel[]) {
  const response = await calculadoraApi.post('/lots/post-data-lots', data)
  return response
}

export async function enviarDataUbigeo(data: UbigeoModel[]) {
  const response = await calculadoraApi.post('/ubigeo/post-data-ubigeo', data)
  return response
}

export { calculadoraApi }
