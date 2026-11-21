<script setup>
import StatusBadge from '@/components/common/StatusBadge.vue'
import { STATUS_PESANAN } from '@/constants'
import { rupiah } from '@/utils/format'

defineProps({
  items: { type: Array, required: true },
  canEdit: { type: Boolean, default: false }
})
defineEmits(['toggle-payment', 'change-status'])
</script>

<template>
  <div v-if="!items.length" class="empty">Belum ada transaksi.</div>
  <table v-else>
    <thead>
      <tr>
        <th>Kode</th><th>Tanggal</th><th>Pelanggan</th><th>Layanan</th>
        <th>Total</th><th>Pembayaran</th><th>Status Pesanan</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="t in items" :key="t.id">
        <td>{{ t.kode }}</td>
        <td>{{ t.tanggal }}</td>
        <td>{{ t.namaPelanggan }}</td>
        <td>{{ t.items.map((i) => `${i.nama} x${i.qty}`).join(', ') }}</td>
        <td>{{ rupiah(t.total) }}</td>
        <td>
          <StatusBadge :status="t.statusPembayaran" />
          <button v-if="canEdit" class="link" @click="$emit('toggle-payment', t)">ubah</button>
        </td>
        <td>
          <StatusBadge v-if="!canEdit" :status="t.statusPesanan" />
          <select v-else :value="t.statusPesanan" @change="$emit('change-status', t, $event.target.value)">
            <option v-for="s in STATUS_PESANAN" :key="s" :value="s">{{ s }}</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.link { background: none; border: none; color: var(--primary); cursor: pointer; margin-left: 6px; font-size: 12px; }
select { padding: 5px; border: 1px solid var(--border); border-radius: 6px; font: inherit; }
</style>
