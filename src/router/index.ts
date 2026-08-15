import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/modules/auth/routes'

import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { workspaceRoutes } from '@/modules/workspace/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', redirect: { name: 'login' } }, ...authRoutes, ...workspaceRoutes],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth
  const allowedRoles = to.meta.allowedRoles

  if (requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next({ name: 'login' })
    }
    const userRole = authStore.user?.role?.toUpperCase()
    if (Array.isArray(allowedRoles) && !allowedRoles.includes(userRole)) {
      alert('No autorizado')
      return next(from.fullPath)
    }
  }
  next()
})

export default router
