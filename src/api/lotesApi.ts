import axios from 'axios'
import type { AdmLoteModel } from '@/model/AdmLoteModel'
import type { UbigeoModel } from '@/model/UbigeoModel'

const lotesApi = axios.create({
  baseURL: import.meta.env.VITE_CALCULADORA_API_LOCAL_URL,
})

export async function obtenerData() {
  const { data } = await lotesApi.get<AdmLoteModel[]>('/lots')
  return data
}


export async function obtenerDataUbigeo() {
  const { data } = await lotesApi.get<UbigeoModel[]>('/ubigeo')
  return data
}


export { lotesApi }
