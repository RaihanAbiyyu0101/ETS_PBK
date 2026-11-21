import { defineStore } from 'pinia'
import seedTransactions from '@/seed/transactions.json'
import { KEYS } from '@/constants'
import { loadOrSeed, save } from '@/utils/storage'
import { hariIni } from '@/utils/format'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({ items: loadOrSeed(KEYS.transactions, seedTransactions) }),
  getters: {
    sortedDesc: (s) => [...s.items].sort((a, b) => b.id - a.id),
    totalPendapatan: (s) =>
      s.items.filter((t) => t.statusPembayaran === 'Lunas').reduce((sum, t) => sum + t.total, 0),
    jumlahBelumLunas: (s) => s.items.filter((t) => t.statusPembayaran === 'Belum Lunas').length,
    byPelanggan: (s) => (userId) =>
      s.items.filter((t) => t.pelangganId === userId).sort((a, b) => b.id - a.id)
  },
  actions: {
    persist() {
      save(KEYS.transactions, this.items)
    },
    add({ pelanggan, kasirId, items }) {
      if (!pelanggan) return { ok: false, message: 'Pelanggan wajib dipilih' }
      if (!items.length) return { ok: false, message: 'Minimal satu layanan harus ditambahkan' }
      if (items.some((i) => !Number.isInteger(i.qty) || i.qty < 1)) {
        return { ok: false, message: 'Jumlah harus bilangan bulat minimal 1' }
      }
      const id = Math.max(0, ...this.items.map((t) => t.id)) + 1
      this.items.push({
        id,
        kode: `TRX-${String(id).padStart(3, '0')}`,
        tanggal: hariIni(),
        pelangganId: pelanggan.id,
        namaPelanggan: pelanggan.nama,
        kasirId,
        items,
        total: items.reduce((sum, i) => sum + i.harga * i.qty, 0),
        statusPembayaran: 'Belum Lunas',
        statusPesanan: 'Diterima'
      })
      this.persist()
      return { ok: true }
    },
    setPembayaran(id, status) {
      const t = this.items.find((x) => x.id === id)
      if (t) { t.statusPembayaran = status; this.persist() }
    },
    setPesanan(id, status) {
      const t = this.items.find((x) => x.id === id)
      if (t) { t.statusPesanan = status; this.persist() }
    }
  }
})
