<script setup>
import { reactive, watch } from 'vue'
import AppInput from '@/components/common/AppInput.vue'
import AppButton from '@/components/common/AppButton.vue'

const props = defineProps({
  initial: { type: Object, default: null } // jika ada -> mode edit
})
const emit = defineEmits(['submit', 'cancel'])

const form = reactive({ nama: '', satuan: '', harga: '' })

watch(
  () => props.initial,
  (val) => Object.assign(form, val ?? { nama: '', satuan: '', harga: '' }),
  { immediate: true }
)

function onSubmit() {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="row" @submit.prevent="onSubmit">
    <AppInput v-model="form.nama" label="Nama Layanan" placeholder="Contoh: Cuci Setrika" />
    <AppInput v-model="form.satuan" label="Satuan" placeholder="kg / pcs" />
    <AppInput v-model="form.harga" label="Harga (Rp)" type="number" />
    <AppButton type="submit">{{ initial ? 'Simpan Perubahan' : 'Tambah Layanan' }}</AppButton>
    <AppButton v-if="initial" variant="secondary" @click="emit('cancel')">Batal</AppButton>
  </form>
</template>
