import { defineStore } from 'pinia'
import { AuthStatus } from '../interfaces/auth-status.enum'
import type { User } from '../interfaces/user.interface'
import { computed, ref } from 'vue'
import { loginAction } from '../actions/login.actions'

export const useAuthStore = defineStore(
  'auth',
  () => {
    //Estados
    const authStatus = ref<AuthStatus>(AuthStatus.Checking)
    const user = ref<User | undefined>()
    const token = ref('')

    //Accciones (funciones que cambiar/actualizan los valores de los estados)
    const login = async (email: string, password: string) => {
      try {
        const loginResp = await loginAction(email, password)
        if (!loginResp.ok) {
          return 'Usuario o contraseña incorrectos'
        }
        if (loginResp.user && loginResp.user.isActive === false) {
          return 'Usuario inactivo. Contacte al administrador.'
        }
        user.value = loginResp.user
        token.value = loginResp.token
        console.log('Token guardado en el store:', token.value)
        authStatus.value = AuthStatus.Authenticated
        return true
      } catch (error) {
        console.error(error)
        return logout()
      }
    }

    const logout = () => {
      authStatus.value = AuthStatus.Unauthenticated
      user.value = undefined
      token.value = ''
      return false
    }

    return {
      user,
      token,
      authStatus,

      //Getters (valores que dependen de procesar los estados)
      isChecking: computed(() => authStatus.value === AuthStatus.Checking),
      isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

      userName: computed(() => user.value?.lastname),

      login,
    }
  },
  {
    persist: true,
  },
)
