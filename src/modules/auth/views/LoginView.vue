<template>
  <div class="container-center">
    <div class="login-container">
      <div class="logo-box">
        <img :src="logo" alt="Logo" />

      </div>  
          <h2>Iniciar Sesion</h2>
      <form class="login-form" @submit.prevent="onLogin">
        <label for="usuario">Usuario</label>
        <input
          id="usuario"
          v-model="email"
          type="text"
          placeholder="Ingresar usuario"
          class="input"
          autocomplete="username"
        />

        <label for="password">Contraseña</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Ingresar contraseña"
          class="input"
          autocomplete="current-password"
        />

        <button type="submit" class="btn-ingresar mt-4">Ingresar</button>
        <div v-if="error" class="text-center mb-2" style="color: red">{{ error }}</div>
      </form>
      <p class="description">Encuentra todas las herramientas que requieres en un solo lugar</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { useRouter } from 'vue-router'
import logo from "@/assets/logo.bmp"

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const onLogin = async () => {
  error.value = ''
  const success = await authStore.login(email.value, password.value)
  if (success) {
    router.push('/workspace') // Cambia la ruta según tu app
  } else {
    error.value = 'Usuario o contraseña incorrectos'
  }
}
</script>

<style scoped>
.logo-box img {
  width: 150px;
  height: 150px;
}

.container-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  min-width: 350px;

  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-box {
  color: #fff;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0.5rem 2.5rem;
  border-radius: 4px;
  margin-bottom: 2rem;
  text-align: center;
}

h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

label {
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
}

.input {
  width: 100%;
  padding: 0.7rem;
  border: none;
  border-radius: 6px;
  background: #ffe5e5;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  outline: none;
}

.btn-ingresar {
  width: 100%;
  padding: 0.8rem 0;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background: #ff7a2f;
  color: #fff;
  font-weight: 600;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-ingresar:hover {
  background: #ff944d;
}

.description {
  margin-top: 2.5rem;
  color: #222;
  font-size: 1rem;
  text-align: center;
  line-height: 1.3;
}
</style>
