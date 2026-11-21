<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppInput from '@/components/common/AppInput.vue'
import AppButton from '@/components/common/AppButton.vue'
import { APP_NAME, APP_TAGLINE, OWNER_NAME, HOME_BY_ROLE } from '@/constants'

const auth = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

function onLogin() {
  const res = auth.login(username.value, password.value)
  if (!res.ok) {
    error.value = res.message
    return
  }
  router.push(HOME_BY_ROLE[res.user.role])
}
</script>

<template>
  <div class="wrap">
    <section class="hero">
      <div class="bubble b1"></div>
      <div class="bubble b2"></div>
      <div class="bubble b3"></div>
      <div class="hero-text">
        <div class="big">🫧</div>
        <h1>{{ APP_NAME }}</h1>
        <p>{{ APP_TAGLINE }}</p>
        <small>Dikelola oleh {{ OWNER_NAME }}</small>
      </div>
    </section>

    <section class="panel">
      <form class="box" @submit.prevent="onLogin">
        <h2>Selamat datang 👋</h2>
        <p class="page-sub">Masuk untuk melanjutkan ke sistem</p>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <AppInput v-model="username" label="Username" placeholder="Masukkan username" />
        <AppInput v-model="password" label="Kata Sandi" type="password" placeholder="Masukkan kata sandi" />
        <AppButton type="submit">Masuk</AppButton>
      </form>
    </section>
  </div>
</template>

<style scoped>
.wrap { min-height: 100vh; display: grid; grid-template-columns: 1.1fr 1fr; }
.hero { position: relative; overflow: hidden; display: grid; place-items: center; color: #fff;
        background: linear-gradient(135deg, #0891b2, #083344); padding: 40px; }
.hero-text { position: relative; z-index: 1; text-align: center; }
.big { font-size: 64px; }
.hero h1 { font-size: 40px; margin: 8px 0; }
.hero p { font-size: 17px; color: #cffafe; margin-bottom: 18px; }
.hero small { background: rgba(255, 255, 255, 0.15); padding: 6px 14px; border-radius: 999px; }
.bubble { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.08); }
.b1 { width: 260px; height: 260px; top: -60px; left: -60px; }
.b2 { width: 180px; height: 180px; bottom: 40px; right: -40px; }
.b3 { width: 90px; height: 90px; bottom: 120px; left: 60px; }
.panel { display: grid; place-items: center; padding: 30px; }
.box { width: 100%; max-width: 360px; display: flex; flex-direction: column; gap: 16px; }
h2 { font-size: 24px; margin: 0; }
.page-sub { margin: 0; }

@media (max-width: 760px) {
  .wrap { grid-template-columns: 1fr; }
  .hero { padding: 28px; }
}
</style>
