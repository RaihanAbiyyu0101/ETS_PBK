// Inti persistensi: baca localStorage, kalau kosong isi dari file JSON seed.
export function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function loadOrSeed(key, seed) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.warn(`Data ${key} rusak, memuat ulang dari seed`, err)
  }
  const fresh = JSON.parse(JSON.stringify(seed)) // salin agar seed asli tidak berubah
  save(key, fresh)
  return fresh
}
