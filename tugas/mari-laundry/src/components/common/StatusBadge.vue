<script setup>
import { computed } from 'vue'

const props = defineProps({ status: { type: String, required: true } })

// Peta status -> warna (kalau status baru muncul, tinggal tambah di sini)
const COLOR = {
  Lunas: 'success', 'Belum Lunas': 'danger',
  Diterima: 'secondary', Diproses: 'warning', Selesai: 'primary', Diambil: 'success'
}
const color = computed(() => COLOR[props.status] ?? 'secondary')
</script>

<template>
  <span :class="['badge', color]">{{ status }}</span>
</template>

<style scoped>
.badge { padding: 3px 10px; border-radius: 999px; font-size: 12px; color: #fff; }
.success { background: var(--success); }
.danger { background: var(--danger); }
.warning { background: var(--warning); }
.primary { background: var(--primary); }
.secondary { background: var(--secondary); }
</style>
