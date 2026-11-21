<script setup>
import { computed } from 'vue'
import TransactionTable from '@/components/features/TransactionTable.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { useAuthStore } from '@/stores/auth'

const trx = useTransactionsStore()
const auth = useAuthStore()
const myOrders = computed(() => trx.byPelanggan(auth.currentUser.id))
</script>

<template>
  <h1>Pesanan Saya</h1>
  <p class="page-sub">Pantau status cucian Anda</p>
  <div class="card">
    <TransactionTable :items="myOrders" />
  </div>
</template>
