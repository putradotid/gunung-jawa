<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import L from 'leaflet';
// --- PERBAIKAN 1: (PALING PENTING) Impor CSS Leaflet ---
import 'leaflet/dist/leaflet.css';

const mountains = ref([
    // ... data gunung Anda tidak berubah ...
    { id: 1, name: 'Merbabu', location: 'Jawa Tengah', status: 'Cerah', coords: [-7.4542, 110.4386], image: 'https://asset.kompas.com/crops/37yCLGqU2DiI7FGy_scDpnAlGzQ=/0x0:1500x1000/1200x800/data/photo/2020/08/14/5f3615920efd9.jpg' },
    { id: 2, name: 'Pangrango', location: 'Jawa Barat', status: 'Aman Didaki', coords: [-6.7820, 106.9820], image: 'https://img.inews.co.id/media/1200/files/inews_new/2023/05/05/fakta_gunung_gede_pangrango.jpg' },
    { id: 3, name: 'Gede', location: 'Jawa Barat', status: 'Aman Didaki', coords: [-6.7860, 106.9800], image: 'https://jnewsonline.com/wp-content/uploads/2025/01/gunung-gede.jpg' },
    { id: 4, name: 'Patuha', location: 'Jawa Barat', status: 'Aman Dikunjungi', coords: [-7.1652, 107.4017], image: 'https://pariwisataindonesia.id/wp-content/uploads/2021/12/gunung_patuha.jpg' },
    { id: 5, name: 'Arjuno', location: 'Jawa Timur', status: 'Waspada Angin', coords: [-7.7569, 112.5855], image: 'https://backpackerjakarta.com/wp-content/uploads/2018/02/gunung-arjuno-di-malang.jpg' },
    { id: 6, name: 'Slamet', location: 'Jawa Tengah', status: 'Waspada', coords: [-7.2422, 109.2083], image: 'https://img.inews.co.id/media/1200/files/inews_new/2023/10/22/puncak_gunung_slamet.jpg' },
    { id: 7, name: 'Sindoro', location: 'Jawa Tengah', status: 'Cerah', coords: [-7.2956, 109.9950], image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijxOZeBrmsgh2gd16gIcC6naWzYEpaa2hUHxi0AUdvrNTKdkwhtMbkpvel5WJzXkRI0Xq14Y9VDfYlYSaP5DUBf2DkjruK5GCfTXkCe41H3gktBh-Jr3dq4kCUJirdwAplPNaEYhdzw7vW/s1600/sindoro+%25281%2529.jpg' },
    { id: 8, name: 'Ciremai', location: 'Jawa Barat', status: 'Aman Didaki', coords: [-6.8922, 108.4014], image: 'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/251/2024/10/04/IMG_7313-599703419.jpg' },
    { id: 9, name: 'Ijen', location: 'Jawa Timur', status: 'Aman, Waspada Gas', coords: [-8.0583, 114.2444], image: 'https://asset.kompas.com/crops/fu2SL2EKEzm5evOAXDv-SyvvD9Y=/0x0:1200x800/1200x800/data/photo/2021/08/19/611e162fed8b4.jpg' },
    { id: 10, name: 'Raung', location: 'Jawa Timur', status: 'Waspada, Level II', coords: [-8.1250, 114.0431], image: 'https://shelterjelajah.com/wp-content/uploads/2024/08/Tips-Mendaki-Gunung-Raung.jpeg' },
]);

let map = null;
// --- PERBAIKAN 2: Simpan referensi marker untuk membuka popup ---
const markers = {};
// --- PERBAIKAN 3: State untuk melacak item yang aktif di daftar ---
const selectedMountainId = ref(null);

onMounted(() => {
  map = L.map('mapContainer').setView([-7.6, 110.5], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  mountains.value.forEach(mountain => {
    const marker = L.marker(mountain.coords).addTo(map);
    
    marker.bindPopup(`
      <div class="map-popup">
        <img src="${mountain.image}" alt="${mountain.name}" class="popup-image">
        <h4>${mountain.name}</h4>
        <p>${mountain.location}</p>
        <p><strong>Status:</strong> ${mountain.status}</p>
        <a href="/gunung/${mountain.id}" class="popup-link" target="_blank">Lihat Detail</a>
      </div>
    `);
    
    // Simpan marker dengan key id gunungnya
    markers[mountain.id] = marker;
  });
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

// --- PERBAIKAN 4: Modifikasi fungsi agar lebih interaktif ---
function selectMountain(mountain) {
  // Atur ID gunung yang dipilih
  selectedMountainId.value = mountain.id;
  
  // "Terbang" ke lokasi
  map.flyTo(mountain.coords, 11, {
    animate: true,
    duration: 1.5
  });
  
  // Buka popup yang sesuai di peta
  const marker = markers[mountain.id];
  if (marker) {
    marker.openPopup();
  }
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
        <li 
          v-for="mountain in mountains" 
          :key="mountain.id" 
          @click="selectMountain(mountain)"
          :class="{ active: mountain.id === selectedMountainId }">
          <div class="list-item-content">
            <strong>{{ mountain.name }}</strong>
            <span>{{ mountain.location }}</span>
          </div>
        </li>
      </ul>
    </aside>

    <main class="map-container-wrapper">
      <div id="mapContainer"></div>
    </main>
  </div>
</template>

<style scoped>
#mapContainer {
  height: 100%;
  width: 100%;
  border-radius: 15px;
  z-index: 1;
}

/* --- PERBAIKAN RESPONSIVE --- */
.map-view-layout {
  display: grid;
  padding: 1rem; /* Padding lebih kecil untuk mobile */
  gap: 1rem;
  height: calc(100vh - 70px); /* Sesuaikan 70px dengan tinggi header/navbar Anda */
  box-sizing: border-box;

  /* --- 1. GAYA DEFAULT (MOBILE FIRST): Satu Kolom --- */
  /* Sidebar di atas (45% tinggi), Peta di bawah (sisanya) */
  grid-template-columns: 1fr;
  grid-template-rows: 45vh 1fr; 
}

/* --- 2. MEDIA QUERY: Terapkan gaya ini hanya untuk layar lebar --- */
@media (min-width: 992px) {
  .map-view-layout {
    /* Kembalikan ke layout 2 kolom untuk desktop */
    grid-template-columns: 350px 1fr;
    grid-template-rows: 1fr; /* Reset ke satu baris */
    gap: 1.5rem;
    padding: 1.5rem;
  }
}
/* --- AKHIR DARI PERBAIKAN RESPONSIVE --- */


.mountain-sidebar {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden; /* Ini tetap penting untuk scrolling internal */
}

.sidebar-header {
  padding: 1rem 1.5rem; /* Sedikit rampingkan padding vertikal */
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0;
}

.sidebar-header h2 {
  margin: 0 0 0.25rem 0; /* Kurangi margin bawah */
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
  overflow-y: auto;
  flex-grow: 1;
}

.mountain-list li {
  padding: 1rem 1.5rem; /* Sedikit rampingkan padding vertikal */
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.mountain-list li.active, .mountain-list li:hover {
  background-color: #e6f3ee;
  color: var(--color-primary);
}
.mountain-list li.active strong {
    color: var(--color-primary);
}


.list-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-item-content strong {
  font-size: 1.1rem;
  transition: color 0.2s ease;
}

.list-item-content span {
  font-size: 0.9rem;
  color: #6c757d;
}

.map-container-wrapper {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  padding: 0;
  /* Perlu untuk memastikan grid di mobile tidak 'pecah' */
  min-height: 0; 
}


/* Styling untuk Custom Popup di Peta (tidak berubah) */
:global(.map-popup) {
  text-align: center;
  width: 180px;
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