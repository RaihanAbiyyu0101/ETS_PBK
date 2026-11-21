<script setup>
import { ref, computed } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import TransactionForm from '@/components/features/TransactionForm.vue'
import TransactionTable from '@/components/features/TransactionTable.vue'
import { ROLES, STATUS_PEMBAYARAN } from '@/constants'

const trx = useTransactionsStore()
const products = useProductsStore()
const auth = useAuthStore()

const isKasir = computed(() => auth.role === ROLES.KASIR)
const error = ref('')
const success = ref('')

function onSubmit(payload, resetForm) {
  error.value = ''
  success.value = ''
  const res = trx.add({ ...payload, kasirId: auth.currentUser.id })
  if (!res.ok) {
    error.value = res.message
    return
  }
  success.value = 'Transaksi berhasil disimpan'
  resetForm()
}

function togglePayment(t) {
  const [belum, lunas] = STATUS_PEMBAYARAN
  trx.setPembayaran(t.id, t.statusPembayaran === lunas ? belum : lunas)
}
</script>

<template>
  <h1>Transaksi</h1>
  <p class="page-sub">Catat dan pantau pesanan laundry</p>

  <div v-if="isKasir" class="card">
    <h2>Transaksi Baru</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="success" class="alert alert-success">{{ success }}</div>
    <TransactionForm :products="products.items" :customers="auth.pelangganList" @submit="onSubmit" />
  </div>

  <div class="card">
    <TransactionTable
      :items="trx.sortedDesc"
      :can-edit="isKasir"
      @toggle-payment="togglePayment"
      @change-status="(t, s) => trx.setPesanan(t.id, s)"
    />
  </div>
</template>
