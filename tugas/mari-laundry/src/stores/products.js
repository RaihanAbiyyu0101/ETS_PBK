import { defineStore } from 'pinia'
import seedProducts from '@/seed/products.json'
import { KEYS } from '@/constants'
import { loadOrSeed, save } from '@/utils/storage'

function validate(data) {
  if (!data.nama?.trim()) return 'Nama layanan wajib diisi'
  if (!data.satuan?.trim()) return 'Satuan wajib diisi'
  if (!(Number(data.harga) > 0)) return 'Harga harus lebih dari 0'
  return null
}

const clean = (id, d) => ({ id, nama: d.nama.trim(), satuan: d.satuan.trim(), harga: Number(d.harga) })

export const useProductsStore = defineStore('products', {
  state: () => ({ items: loadOrSeed(KEYS.products, seedProducts) }),
  getters: {
    total: (s) => s.items.length
  },
  actions: {
    persist() {
      save(KEYS.products, this.items)
    },
    add(data) {
      const error = validate(data)
      if (error) return { ok: false, message: error }
      const id = Math.max(0, ...this.items.map((i) => i.id)) + 1
      this.items.push(clean(id, data))
      this.persist()
      return { ok: true }
    },
    update(id, data) {
      const error = validate(data)
      if (error) return { ok: false, message: error }
      const idx = this.items.findIndex((i) => i.id === id)
      if (idx === -1) return { ok: false, message: 'Data tidak ditemukan' }
      this.items[idx] = clean(id, data)
      this.persist()
      return { ok: true }
    },
    remove(id) {
      this.items = this.items.filter((i) => i.id !== id)
      this.persist()
    }
  }
})
