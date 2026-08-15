import WorkspaceView from '../views/WorkspaceView.vue'

export const workspaceRoutes = [
  {
    path: '/workspace',
    name: 'Workspace',
    component: WorkspaceView,
    meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'SUPERADMIN'] },
  },
]
