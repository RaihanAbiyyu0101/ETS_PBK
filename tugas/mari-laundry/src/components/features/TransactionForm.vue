<script setup>
import { ref, computed } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import AppInput from '@/components/common/AppInput.vue'
import { rupiah } from '@/utils/format'

const props = defineProps({
  products: { type: Array, required: true },
  customers: { type: Array, required: true }
})
const emit = defineEmits(['submit'])

const customerId = ref('')
const productId = ref('')
const qty = ref(1)
const lines = ref([])

const total = computed(() => lines.value.reduce((s, l) => s + l.harga * l.qty, 0))

function addLine() {
  const p = props.products.find((x) => x.id === Number(productId.value))
  if (!p) return
  lines.value.push({ produkId: p.id, nama: p.nama, harga: p.harga, qty: Number(qty.value) })
  productId.value = ''
  qty.value = 1
}

function removeLine(i) {
  lines.value.splice(i, 1)
}

function onSubmit() {
  const pelanggan = props.customers.find((c) => c.id === Number(customerId.value)) ?? null
  emit('submit', { pelanggan, items: lines.value.map((l) => ({ ...l })) }, reset)
}

function reset() {
  customerId.value = ''
  lines.value = []
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="row" style="margin-bottom: 12px">
      <label class="sel">
        <span>Pelanggan</span>
        <select v-model="customerId">
          <option value="">-- pilih pelanggan --</option>
          <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.nama }}</option>
        </select>
      </label>
      <label class="sel">
        <span>Layanan</span>
        <select v-model="productId">
          <option value="">-- pilih layanan --</option>
          <option v-for="p in products" :key="p.id" :value="p.id">
            {{ p.nama }} ({{ rupiah(p.harga) }}/{{ p.satuan }})
          </option>
        </select>
      </label>
      <AppInput v-model="qty" label="Jumlah" type="number" />
      <AppButton variant="secondary" @click="addLine">+ Tambah</AppButton>
    </div>

    <table v-if="lines.length">
      <tbody>
        <tr v-for="(l, i) in lines" :key="i">
          <td>{{ l.nama }}</td>
          <td>{{ l.qty }} x {{ rupiah(l.harga) }}</td>
          <td>{{ rupiah(l.harga * l.qty) }}</td>
          <td><AppButton small variant="danger" @click="removeLine(i)">x</AppButton></td>
        </tr>
      </tbody>
    </table>

    <div class="row" style="margin-top: 12px; justify-content: space-between">
      <strong>Total: {{ rupiah(total) }}</strong>
      <AppButton type="submit">Simpan Transaksi</AppButton>
    </div>
  </form>
</template>

<style scoped>
.sel { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 160px; }
span { font-size: 12px; color: var(--secondary); }
select { padding: 9px 10px; border: 1px solid var(--border); border-radius: 8px; font: inherit; }
</style>
