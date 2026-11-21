<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/common/AppButton.vue'
import { APP_NAME, APP_TAGLINE, MENU } from '@/constants'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const menu = computed(() => MENU.filter((m) => m.roles.includes(auth.role)))
const initial = computed(() => auth.currentUser?.nama?.charAt(0) ?? '?')

function logout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="shell">
    <aside>
      <div class="brand">
        <div class="logo">🫧</div>
        <div>
          <div class="name">{{ APP_NAME }}</div>
          <small>{{ APP_TAGLINE }}</small>
        </div>
      </div>

      <nav>
        <RouterLink v-for="m in menu" :key="m.to" :to="m.to">
          <span class="ico">{{ m.icon }}</span>{{ m.label }}
        </RouterLink>
      </nav>

      <div class="user">
        <div class="avatar">{{ initial }}</div>
        <div class="info">
          <strong>{{ auth.currentUser?.nama }}</strong>
          <small>{{ auth.role }}</small>
        </div>
        <AppButton small variant="danger" @click="logout">Keluar</AppButton>
      </div>
    </aside>

    <main>
      <div v-if="route.query.akses === 'ditolak'" class="alert alert-warning">
        Anda tidak memiliki akses ke halaman tersebut.
      </div>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.shell { display: flex; min-height: 100vh; }
aside { width: 250px; background: linear-gradient(180deg, #083344, #0e4f63); color: #fff; padding: 22px 16px;
        display: flex; flex-direction: column; gap: 22px; position: sticky; top: 0; height: 100vh; }
.brand { display: flex; gap: 12px; align-items: center; }
.logo { width: 44px; height: 44px; border-radius: 12px; background: rgba(255, 255, 255, 0.15); display: grid; place-items: center; font-size: 24px; }
.name { font-weight: 700; font-size: 17px; }
.brand small { color: #a5f3fc; font-size: 11px; }
nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
nav a { color: #cffafe; text-decoration: none; padding: 11px 14px; border-radius: 10px; display: flex; gap: 10px; align-items: center; transition: background 0.15s; }
nav a:hover { background: rgba(255, 255, 255, 0.1); }
nav a.router-link-active { background: #fff; color: var(--primary-dark); font-weight: 600; }
.user { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; background: rgba(255, 255, 255, 0.08); padding: 12px; border-radius: 12px; }
.avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--primary); display: grid; place-items: center; font-weight: 700; }
.info { display: flex; flex-direction: column; flex: 1; line-height: 1.2; }
.info small { color: #a5f3fc; text-transform: capitalize; }
main { flex: 1; padding: 30px; min-width: 0; }

@media (max-width: 760px) {
  .shell { flex-direction: column; }
  aside { width: 100%; height: auto; position: static; }
  nav { flex-direction: row; flex-wrap: wrap; }
  main { padding: 16px; }
}
</style>
