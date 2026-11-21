<script setup>
import ProductTable from '@/components/features/ProductTable.vue'
import { useProductsStore } from '@/stores/products'

const store = useProductsStore()
</script>

<template>
  <h1>Katalog Layanan</h1>
  <p class="page-sub">Daftar layanan dan harga kami</p>
  <div class="card">
    <ProductTable :items="store.items" />
  </div>
</template>
