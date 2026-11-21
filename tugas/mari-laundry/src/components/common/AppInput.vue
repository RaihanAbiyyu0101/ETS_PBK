<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="field">
    <span>{{ label }}</span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<style scoped>
.field { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 150px; }
span { font-size: 12px; font-weight: 500; color: var(--secondary); }
input { padding: 10px 12px; border: 1.5px solid var(--border); border-radius: 10px; font: inherit; background: #fff; transition: border 0.15s, box-shadow 0.15s; }
input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-soft); }
</style>
