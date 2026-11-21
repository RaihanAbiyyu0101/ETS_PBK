<script setup>
import AppButton from '@/components/common/AppButton.vue'
import { rupiah } from '@/utils/format'

defineProps({
  items: { type: Array, required: true },
  canEdit: { type: Boolean, default: false }
})
defineEmits(['edit', 'remove'])
</script>

<template>
  <div v-if="!items.length" class="empty">Belum ada data layanan.</div>
  <table v-else>
    <thead>
      <tr>
        <th>Layanan</th><th>Satuan</th><th>Harga</th><th v-if="canEdit">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in items" :key="p.id">
        <td>{{ p.nama }}</td>
        <td>{{ p.satuan }}</td>
        <td>{{ rupiah(p.harga) }}</td>
        <td v-if="canEdit">
          <div class="row">
            <AppButton small variant="secondary" @click="$emit('edit', p)">Ubah</AppButton>
            <AppButton small variant="danger" @click="$emit('remove', p)">Hapus</AppButton>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
