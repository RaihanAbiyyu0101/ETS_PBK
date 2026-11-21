import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { HOME_BY_ROLE } from '@/constants'

import MainLayout from '@/layouts/MainLayout.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProductsView from '@/views/ProductsView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import CatalogView from '@/views/CatalogView.vue'
import TrackingView from '@/views/TrackingView.vue'

const routes = [
  { path: '/login', name: 'login', component: LoginView, meta: { public: true } },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'dashboard', name: 'dashboard', component: DashboardView, meta: { roles: ['pemilik', 'kasir'] } },
      { path: 'produk', name: 'produk', component: ProductsView, meta: { roles: ['pemilik', 'kasir'] } },
      { path: 'transaksi', name: 'transaksi', component: TransactionsView, meta: { roles: ['pemilik', 'kasir'] } },
      { path: 'katalog', name: 'katalog', component: CatalogView, meta: { roles: ['pelanggan'] } },
      { path: 'pesanan-saya', name: 'pesanan-saya', component: TrackingView, meta: { roles: ['pelanggan'] } }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({ history: createWebHashHistory(), routes })

// Navigation guard: cek login + cek role
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.public) {
    return auth.isLoggedIn ? HOME_BY_ROLE[auth.role] : true
  }
  if (!auth.isLoggedIn) return { name: 'login' }
  const allowed = to.meta.roles
  if (allowed && !allowed.includes(auth.role)) {
    return { path: HOME_BY_ROLE[auth.role], query: { akses: 'ditolak' } }
  }
  return true
})

export default router
