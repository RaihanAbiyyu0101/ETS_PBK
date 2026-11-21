<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | danger | success
  type: { type: String, default: 'button' },
  small: { type: Boolean, default: false }
})
</script>

<template>
  <button :type="type" :class="['btn', `btn-${variant}`, { 'btn-sm': small }]">
    <slot />
  </button>
</template>

<style scoped>
.btn { border: none; border-radius: 10px; padding: 10px 18px; cursor: pointer; font: inherit;
       font-weight: 500; color: #fff; transition: transform 0.1s, box-shadow 0.15s, background 0.15s; }
.btn:hover { transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); }
.btn:active { transform: translateY(0); }
.btn-sm { padding: 5px 12px; font-size: 12px; border-radius: 8px; }
.btn-primary { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); }
.btn-secondary { background: var(--secondary); }
.btn-danger { background: var(--danger); }
.btn-success { background: var(--success); }
</style>
