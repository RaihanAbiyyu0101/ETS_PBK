<script setup>
import { computed } from 'vue'
import StatCard from '@/components/common/StatCard.vue'
import TransactionTable from '@/components/features/TransactionTable.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import { rupiah } from '@/utils/format'
import { APP_NAME } from '@/constants'

const trx = useTransactionsStore()
const products = useProductsStore()
const auth = useAuthStore()
const terbaru = computed(() => trx.sortedDesc.slice(0, 5))
</script>

<template>
  <h1>Halo, {{ auth.currentUser?.nama }} 👋</h1>
  <p class="page-sub">Ringkasan usaha {{ APP_NAME }} hari ini</p>

  <div class="grid">
    <StatCard icon="💰" label="Pendapatan (Lunas)" :value="rupiah(trx.totalPendapatan)" />
    <StatCard icon="🧾" label="Jumlah Transaksi" :value="trx.items.length" />
    <StatCard icon="⏳" label="Belum Lunas" :value="trx.jumlahBelumLunas" />
    <StatCard icon="🧺" label="Jenis Layanan" :value="products.total" />
  </div>

  <div class="card">
    <h2>Transaksi Terbaru</h2>
    <TransactionTable :items="terbaru" />
  </div>
</template>
