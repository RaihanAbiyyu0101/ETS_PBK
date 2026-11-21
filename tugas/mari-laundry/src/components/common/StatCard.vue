<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  icon: { type: String, default: '' }
})
</script>

<template>
  <div class="stat">
    <div v-if="icon" class="icon">{{ icon }}</div>
    <div>
      <div class="label">{{ label }}</div>
      <div class="value">{{ value }}</div>
    </div>
  </div>
</template>

<style scoped>
.stat { display: flex; align-items: center; gap: 14px; background: var(--surface); border-radius: var(--radius);
        padding: 18px; box-shadow: var(--shadow); border: 1px solid #e0f2fe; }
.icon { width: 48px; height: 48px; border-radius: 12px; display: grid; place-items: center; font-size: 24px;
        background: var(--primary-soft); flex-shrink: 0; }
.label { color: var(--secondary); font-size: 12px; }
.value { font-size: 20px; font-weight: 700; color: var(--primary-dark); }
</style>
