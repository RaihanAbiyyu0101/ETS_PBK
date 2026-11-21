// Semua "teks tetap" dikumpulkan di sini agar komponen bebas hardcode.
export const APP_NAME = 'Mari Laundry'
export const APP_TAGLINE = 'Cuci bersih, hidup lebih ringan'
export const OWNER_NAME = 'Bu Sari'

export const KEYS = {
  users: 'sim_users',
  products: 'sim_products',
  transactions: 'sim_transactions',
  session: 'sim_session'
}

export const ROLES = {
  PEMILIK: 'pemilik',
  KASIR: 'kasir',
  PELANGGAN: 'pelanggan'
}

export const HOME_BY_ROLE = {
  pemilik: '/dashboard',
  kasir: '/dashboard',
  pelanggan: '/katalog'
}

export const MENU = [
  { icon: '📊', label: 'Dashboard', to: '/dashboard', roles: ['pemilik', 'kasir'] },
  { icon: '🧺', label: 'Data Layanan', to: '/produk', roles: ['pemilik', 'kasir'] },
  { icon: '🧾', label: 'Transaksi', to: '/transaksi', roles: ['pemilik', 'kasir'] },
  { icon: '🫧', label: 'Katalog Layanan', to: '/katalog', roles: ['pelanggan'] },
  { icon: '📦', label: 'Pesanan Saya', to: '/pesanan-saya', roles: ['pelanggan'] }
]

export const STATUS_PEMBAYARAN = ['Belum Lunas', 'Lunas']
export const STATUS_PESANAN = ['Diterima', 'Diproses', 'Selesai', 'Diambil']
