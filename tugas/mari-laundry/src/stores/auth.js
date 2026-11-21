import { defineStore } from 'pinia'
import seedUsers from '@/seed/users.json'
import { KEYS } from '@/constants'
import { loadOrSeed, save } from '@/utils/storage'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: loadOrSeed(KEYS.users, seedUsers),
    currentUser: JSON.parse(localStorage.getItem(KEYS.session) || 'null')
  }),
  getters: {
    isLoggedIn: (s) => !!s.currentUser,
    role: (s) => s.currentUser?.role ?? null,
    pelangganList: (s) => s.users.filter((u) => u.role === 'pelanggan')
  },
  actions: {
    login(username, password) {
      if (!username.trim() || !password) {
        return { ok: false, message: 'Username dan kata sandi wajib diisi' }
      }
      const user = this.users.find((u) => u.username === username.trim() && u.password === password)
      if (!user) return { ok: false, message: 'Username atau kata sandi salah' }
      const { password: _pw, ...safeUser } = user // jangan simpan password di sesi
      this.currentUser = safeUser
      save(KEYS.session, safeUser)
      return { ok: true, user: safeUser }
    },
    logout() {
      this.currentUser = null
      localStorage.removeItem(KEYS.session)
    }
  }
})
