<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import ProductForm from '@/components/features/ProductForm.vue'
import ProductTable from '@/components/features/ProductTable.vue'
import { ROLES } from '@/constants'

const store = useProductsStore()
const auth = useAuthStore()

const canEdit = computed(() => auth.role === ROLES.PEMILIK) // hanya pemilik boleh CRUD
const editing = ref(null)
const error = ref('')
const success = ref('')

function onSubmit(data) {
  error.value = ''
  success.value = ''
  const res = editing.value ? store.update(editing.value.id, data) : store.add(data)
  if (!res.ok) {
    error.value = res.message
    return
  }
  success.value = editing.value ? 'Layanan berhasil diperbarui' : 'Layanan berhasil ditambahkan'
  editing.value = null
}

function onRemove(p) {
  if (confirm(`Hapus layanan "${p.nama}"?`)) store.remove(p.id)
}
</script>

<template>
  <h1>Data Layanan</h1>
  <p class="page-sub">Kelola daftar layanan dan harga</p>

  <div v-if="canEdit" class="card">
    <h2>{{ editing ? 'Ubah Layanan' : 'Tambah Layanan' }}</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="success" class="alert alert-success">{{ success }}</div>
    <ProductForm :initial="editing" @submit="onSubmit" @cancel="editing = null" />
  </div>

  <div class="card">
    <ProductTable :items="store.items" :can-edit="canEdit" @edit="(p) => (editing = p)" @remove="onRemove" />
  </div>
</template>
