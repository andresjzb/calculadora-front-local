<template>
  <div class="user-create-register-view">
    <div class="logo-container">
     <div class="logo-box">
        <img :src="logo" alt="Logo" />

      </div>      </div>
    <div class="alert alert-primary text-center fw-bold fs-4" role="alert">
      Actualiza Proyectos y Lotes
    </div>
    <div class="register-form">
       <button class="submit-btn d-flex justify-content-center align-items-center gap-2"
              @click="ActualizarData"
              :disabled="loadingData">
        
        <span v-if="loadingData" class="spinner-border spinner-border-sm text-light" role="status"></span>
        <span>{{ loadingData ? 'Actualizando...' : 'Actualizar datos' }}</span>
      </button>

      <button class="submit-btn" @click="ActualizarUbigeo">Actualizar ubigeo</button>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { obtenerData, obtenerDataUbigeo } from '@/api/lotesApi'
import { enviarData , enviarDataUbigeo} from '@/api/calculadoraApi'
import logo from "@/assets/logo.bmp"
import { ref } from 'vue'
const loadingData = ref(false)

async function ActualizarData(e: Event) {

  e.preventDefault()
  loadingData.value = true
  const data = await obtenerData()
  console.log(data)
  const response = await enviarData(data)
  console.log('RESPUESTA DESPUES DE NORMALIZAR', response)
  loadingData.value = false
}

async function ActualizarUbigeo(e: Event) {
  e.preventDefault()
  const data = await obtenerDataUbigeo()
  console.log(data)
  const response = await enviarDataUbigeo(data)
  console.log('RESPUESTA DESPUES DE SUBIR UBIGEO', response)
}
</script>

<style scoped>

.logo-box img {
  width: 150px;
  height: 150px;
}

.user-create-register-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #fff;
  padding: 32px 16px 0 16px;
}
.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}
.back-btn svg {
  display: block;
}
.logo-container {
  margin-top: 16px;
  margin-bottom: 24px;
}
.logo-box {
   color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 12px 32px;
  border-radius: 4px;
  text-align: center;
}
.title {
  margin-bottom: 32px;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
}
.register-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 350px;
}
.register-form label {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 500;
  color: #222;
}
.register-form input {
  margin-top: 6px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #ffe5e5;
  font-size: 1rem;
  outline: none;
}
.submit-btn {
  margin-top: 16px;
  background: #ff8000;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: #ff9900;
}
</style>
