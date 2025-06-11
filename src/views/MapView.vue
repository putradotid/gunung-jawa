<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import L from 'leaflet';

// --- DATA GUNUNG (dengan Koordinat) ---
// Saya telah menambahkan properti 'coords' [latitude, longitude] untuk setiap gunung.
// Ini adalah data krusial untuk menempatkan pin di peta.
const mountains = ref([
  { id: 1, name: 'Merbabu', location: 'Jawa Tengah', status: 'Cerah', coords: [-7.4542, 110.4386], image: 'https://picsum.photos/seed/Merbabu/200/150' },
  { id: 2, name: 'Pangrango', location: 'Jawa Barat', status: 'Aman Didaki', coords: [-6.7820, 106.9820], image: 'https://picsum.photos/seed/Pangrango/200/150' },
  { id: 3, name: 'Gede', location: 'Jawa Barat', status: 'Aman Didaki', coords: [-6.7860, 106.9800], image: 'https://picsum.photos/seed/Gede/200/150' },
  { id: 4, name: 'Patuha', location: 'Jawa Barat', status: 'Aman Dikunjungi', coords: [-7.1652, 107.4017], image: 'https://picsum.photos/seed/Patuha/200/150' },
  { id: 5, name: 'Arjuno', location: 'Jawa Timur', status: 'Waspada Angin', coords: [-7.7569, 112.5855], image: 'https://picsum.photos/seed/Arjuno/200/150' },
  { id: 6, name: 'Slamet', location: 'Jawa Tengah', status: 'Waspada', coords: [-7.2422, 109.2083], image: 'https://picsum.photos/seed/Slamet/200/150' },
  { id: 7, name: 'Sindoro', location: 'Jawa Tengah', status: 'Cerah', coords: [-7.2956, 109.9950], image: 'https://picsum.photos/seed/Sindoro/200/150' },
  { id: 8, name: 'Ciremai', location: 'Jawa Barat', status: 'Aman Didaki', coords: [-6.8922, 108.4014], image: 'https://picsum.photos/seed/Ciremai/200/150' },
  { id: 9, name: 'Ijen', location: 'Jawa Timur', status: 'Aman, Waspada Gas', coords: [-8.0583, 114.2444], image: 'https://picsum.photos/seed/Ijen/200/150' },
  { id: 10, name: 'Raung', location: 'Jawa Timur', status: 'Waspada, Level II', coords: [-8.1250, 114.0431], image: 'https://picsum.photos/seed/Raung/200/150' },
]);

let map = null; // Variabel untuk menyimpan instance peta

// --- Fungsi untuk Inisialisasi Peta ---
onMounted(() => {
  // Inisialisasi peta dan pusatkan di Pulau Jawa
  map = L.map('mapContainer').setView([-7.6, 110.5], 7);

  // Menambahkan 'tile layer' dari OpenStreetMap (peta dasar)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Menambahkan pin/marker untuk setiap gunung
  mountains.value.forEach(mountain => {
    const marker = L.marker(mountain.coords).addTo(map);
    
    // Membuat konten popup yang akan muncul saat pin diklik
    marker.bindPopup(`
      <div class="map-popup">
        <img src="${mountain.image}" alt="${mountain.name}" class="popup-image">
        <h4>${mountain.name}</h4>
        <p>${mountain.location}</p>
        <p><strong>Status:</strong> ${mountain.status}</p>
        <a href="/gunung/${mountain.id}" class="popup-link">Lihat Detail</a>
      </div>
    `);
  });
});

// Membersihkan map saat komponen dihancurkan untuk mencegah memory leak
onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

// Fungsi untuk "terbang" ke lokasi gunung saat item di list diklik
function flyToMountain(coords) {
  map.flyTo(coords, 11, { // Zoom level 11
    animate: true,
    duration: 1.5
  });
}
</script>

<template>
  <div class="map-view-layout">
    <aside class="mountain-sidebar">
      <div class="sidebar-header">
        <h2>Pilih Gunung</h2>
        <p>Klik nama gunung untuk melihat lokasinya di peta.</p>
      </div>
      <ul class="mountain-list">
        <li v-for="mountain in mountains" :key="mountain.id" @click="flyToMountain(mountain.coords)">
          <div class="list-item-content">
            <strong>{{ mountain.name }}</strong>
            <span>{{ mountain.location }}</span>
          </div>
        </li>
      </ul>
    </aside>

    <main class="map-container">
      <div id="mapContainer"></div>
    </main>
  </div>
</template>

<style scoped>
/* PENTING: Peta harus punya tinggi yang definitif */
#mapContainer {
  height: 100%;
  width: 100%;
  border-radius: 15px;
  z-index: 1; /* Agar peta tetap di bawah elemen lain jika ada tumpang tindih */
}

.map-view-layout {
  display: grid;
  grid-template-columns: 350px 1fr; /* Kolom kiri 350px, sisanya untuk peta */
  height: calc(100vh - 80px); /* Tinggi penuh dikurangi tinggi navbar */
  overflow: hidden; /* Mencegah scrolling halaman utama */
}

/* Styling untuk Sidebar Kiri */
.mountain-sidebar {
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-header h2 {
  margin: 0 0 0.5rem 0;
}

.sidebar-header p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

.mountain-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; /* Membuat list bisa di-scroll jika panjang */
  flex-grow: 1;
}

.mountain-list li {
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.mountain-list li:hover {
  background-color: #e9ecef;
}

.list-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-item-content strong {
  font-size: 1.1rem;
}

.list-item-content span {
  font-size: 0.9rem;
  color: #6c757d;
}

/* Styling untuk Kontainer Peta Kanan */
.map-container {
  padding: 1.5rem;
  background-color: #e9ecef;
}

/* Styling untuk Custom Popup di Peta */
/* Kita perlu menggunakan selector global, karena popup dirender di luar scope komponen */
:global(.map-popup) {
  text-align: center;
}
:global(.map-popup .popup-image) {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}
:global(.map-popup h4) {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
}
:global(.map-popup p) {
  margin: 0 0 10px 0;
  font-size: 0.9rem;
  color: #555;
}
:global(.map-popup .popup-link) {
  display: block;
  background-color: var(--color-primary);
  color: white !important;
  padding: 8px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
}
</style>