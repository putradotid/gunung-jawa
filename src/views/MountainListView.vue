<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

// --- DATA GUNUNG ---
// Saya telah mengubah daftar teks Anda menjadi array of objects yang bisa diolah.
// Gambar menggunakan placeholder dari picsum.photos. Anda bisa menggantinya dengan gambar asli.
const allMountains = ref([
  { id: 1, name: 'Merbabu', location: 'Jawa Tengah', description: 'Terkenal dengan pemandangan matahari terbit yang indah.', image: 'https://picsum.photos/seed/Merbabu/400/300', temp: 13, status: 'Cerah Berawan' },
  { id: 2, name: 'Pangrango', location: 'Jawa Barat', description: 'Memiliki Puncak Mandalawangi yang legendaris dan lembah penuh edelweiss.', image: 'https://picsum.photos/seed/Pangrango/400/300', temp: 15, status: 'Aman Didaki' },
  { id: 3, name: 'Gede', location: 'Jawa Barat', description: 'Bersebelahan dengan Gunung Pangrango, memiliki alun-alun Surya Kencana.', image: 'https://picsum.photos/seed/Gede/400/300', temp: 14, status: 'Aman Didaki' },
  { id: 4, name: 'Patuha', location: 'Jawa Barat', description: 'Terkenal dengan objek wisata Kawah Putih yang indah dan sureal.', image: 'https://picsum.photos/seed/Patuha/400/300', temp: 16, status: 'Aman Dikunjungi' },
  { id: 5, name: 'Arjuno', location: 'Jawa Timur', description: 'Salah satu gunung tertinggi di Jawa dengan banyak situs peninggalan sejarah.', image: 'https://picsum.photos/seed/Arjuno/400/300', temp: 11, status: 'Waspada Angin' },
  { id: 6, name: 'Slamet', location: 'Jawa Tengah', description: 'Merupakan gunung berapi aktif dan puncak tertinggi di Jawa Tengah.', image: 'https://picsum.photos/seed/Slamet/400/300', temp: 12, status: 'Waspada' },
  { id: 7, name: 'Sindoro', location: 'Jawa Tengah', description: 'Bersebelahan dengan Gunung Sumbing, menawarkan pemandangan alam menakjubkan.', image: 'https://picsum.photos/seed/Sindoro/400/300', temp: 13, status: 'Cerah' },
  { id: 8, name: 'Ciremai', location: 'Jawa Barat', description: 'Gunung berapi soliter tertinggi di Jawa Barat dengan jalur pendakian yang menantang.', image: 'https://picsum.photos/seed/Ciremai/400/300', temp: 15, status: 'Aman Didaki' },
  { id: 9, name: 'Ijen', location: 'Jawa Timur', description: 'Terkenal di seluruh dunia dengan fenomena api biru (Blue Fire) yang menakjubkan.', image: 'https://picsum.photos/seed/Ijen/400/300', temp: 14, status: 'Aman, Waspada Gas' },
  { id: 10, name: 'Tangkuban Perahu', location: 'Jawa Barat', description: 'Gunung berapi aktif yang kawahnya bisa diakses dengan mudah oleh wisatawan.', image: 'https://picsum.photos/seed/TangkubanPerahu/400/300', temp: 18, status: 'Aman Dikunjungi' },
  { id: 11, name: 'Kelud', location: 'Jawa Timur', description: 'Memiliki "Anak Gunung Kelud" yang muncul di tengah kawah setelah letusan.', image: 'https://picsum.photos/seed/Kelud/400/300', temp: 19, status: 'Aman Dikunjungi' },
  { id: 12, name: 'Kawi', location: 'Jawa Timur', description: 'Selain pendakian, gunung ini juga dikenal sebagai tempat wisata religi.', image: 'https://picsum.photos/seed/Kawi/400/300', temp: 17, status: 'Cerah' },
  { id: 13, name: 'Galunggung', location: 'Jawa Barat', description: 'Terkenal dengan kawahnya yang luas dan tangga dengan ratusan anak tangga.', image: 'https://picsum.photos/seed/Galunggung/400/300', temp: 18, status: 'Aman Dikunjungi' },
  { id: 14, name: 'Raung', location: 'Jawa Timur', description: 'Memiliki kaldera yang sangat besar dan jalur puncak sejati yang ekstrem.', image: 'https://picsum.photos/seed/Raung/400/300', temp: 11, status: 'Waspada, Level II' },
  { id: 15, name: 'Welirang', location: 'Jawa Timur', description: 'Dikenal sebagai "gunung belerang" dengan pemandangan penambang belerang tradisional.', image: 'https://picsum.photos/seed/Welirang/400/300', temp: 12, status: 'Waspada Gas Belerang' },
]);

// State untuk filter dan search
const searchQuery = ref('');
const selectedLocation = ref('Semua');
const locations = ['Semua', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur'];

// Fungsi untuk mengubah filter lokasi
function filterByLocation(location) {
  selectedLocation.value = location;
}

// Computed property untuk memfilter daftar gunung secara otomatis
const filteredMountains = computed(() => {
  let mountains = allMountains.value;

  // 1. Filter berdasarkan lokasi
  if (selectedLocation.value !== 'Semua') {
    mountains = mountains.filter(m => m.location === selectedLocation.value);
  }

  // 2. Filter berdasarkan pencarian
  if (searchQuery.value) {
    mountains = mountains.filter(m => 
      m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return mountains;
});
</script>

<template>
  <div class="list-view-container">
    <div class="header-section">
      <h1>Galeri Gunung Jawa</h1>
      <p>Jelajahi dan temukan informasi pendakian untuk petualangan Anda berikutnya.</p>
    </div>

    <div class="filter-controls">
      <div class="location-filters">
        <button 
          v-for="location in locations" 
          :key="location"
          @click="filterByLocation(location)"
          :class="{ active: selectedLocation === location }">
          {{ location }}
        </button>
      </div>
      <div class="search-input">
        <input type="text" v-model="searchQuery" placeholder="🔍 Cari nama gunung...">
      </div>
    </div>

    <div v-if="filteredMountains.length > 0" class="mountain-grid">
      <div v-for="mountain in filteredMountains" :key="mountain.id" class="mountain-card">
        <img :src="mountain.image" :alt="`Pemandangan Gunung ${mountain.name}`" class="card-image">
        <div class="card-content">
          <span class="location-tag">{{ mountain.location }}</span>
          <h3>Gunung {{ mountain.name }}</h3>
          <p class="description">{{ mountain.description }}</p>
          <div class="weather-info">
            <span>🌡️ {{ mountain.temp }}°C</span>
            <span>📍 {{ mountain.status }}</span>
          </div>
          <RouterLink :to="`/gunung/${mountain.id}`" class="details-button">Lihat Detail Cuaca</RouterLink>
        </div>
      </div>
    </div>
    
    <div v-else class="no-results">
      <h3>Oops! Gunung tidak ditemukan.</h3>
      <p>Coba ubah filter atau kata kunci pencarian Anda.</p>
    </div>
  </div>
</template>

<style scoped>
.list-view-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.header-section h1 {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text);
}

.header-section p {
  font-size: 1.2rem;
  color: #555;
}

/* Filter dan Search */
.filter-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 1.5rem;
}

.location-filters {
  display: flex;
  gap: 0.5rem;
  background-color: #e9ecef;
  padding: 0.5rem;
  border-radius: 50px;
}

.location-filters button {
  border: none;
  background-color: transparent;
  color: #555;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.location-filters button.active, .location-filters button:hover {
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 4px 10px rgba(45, 134, 89, 0.3);
}

.search-input input {
  padding: 0.9rem 1.2rem;
  border: 1px solid #ddd;
  border-radius: 50px;
  width: 250px;
  font-size: 1rem;
}

/* Grid dan Card */
.mountain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.mountain-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.mountain-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 25px rgba(0,0,0,0.12);
}

.card-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Membuat konten memenuhi sisa ruang */
}

.location-tag {
  background-color: #f1f3f5;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 1rem;
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
}

.description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1; /* Mendorong info cuaca dan tombol ke bawah */
  margin-bottom: 1rem;
}

.weather-info {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid #f1f1f1;
  font-weight: 500;
  color: #333;
}

.details-button {
  display: block;
  background-color: var(--color-primary);
  color: white;
  text-align: center;
  padding: 0.9rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;
  margin-top: auto; /* Mendorong tombol ke bagian paling bawah */
}

.details-button:hover {
  background-color: #256d49;
}

/* No Results Message */
.no-results {
  text-align: center;
  padding: 4rem;
  background-color: #f8f9fa;
  border-radius: 15px;
}

.no-results h3 {
  font-size: 1.5rem;
}
</style>