<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

// Definisikan API Key Anda di satu tempat
const apiKey = '6203054842e25d37aa7f9c44b7098fc7'; // <-- PASTIKAN INI BENAR

// --- FUNGSI UNTUK MENERJEMAHKAN STATUS CUACA ---
function translateWeatherDescription(description) {
  const translations = {
    'clear sky': 'Langit Cerah',
    'few clouds': 'Sedikit Berawan',
    'scattered clouds': 'Berawan Sebagian',
    'broken clouds': 'Berawan',
    'overcast clouds': 'Sangat Berawan',
    'shower rain': 'Hujan Gerimis',
    'rain': 'Hujan',
    'light rain': 'Hujan Ringan',
    'moderate rain': 'Hujan Sedang',
    'thunderstorm': 'Badai Petir',
    'snow': 'Salju',
    'mist': 'Berkabut',
    'fog': 'Kabut Tebal',
  };
  return translations[description.toLowerCase()] || (description.charAt(0).toUpperCase() + description.slice(1));
}

// --- DATA GUNUNG ---
// Data awal diatur dengan status 'loading'
const allMountains = ref([
    { id: 1, name: 'Merbabu', location: 'Jawa Tengah', description: 'Terkenal dengan pemandangan matahari terbit yang indah.', image: 'https://asset.kompas.com/crops/37yCLGqU2DiI7FGy_scDpnAlGzQ=/0x0:1500x1000/1200x800/data/photo/2020/08/14/5f3615920efd9.jpg', lat: -7.454390182169386, lon: 110.43997928248285, temp: '...', status: 'Memuat...', icon: null },
    { id: 2, name: 'Pangrango', location: 'Jawa Barat', description: 'Memiliki Puncak Mandalawangi yang legendaris dan lembah penuh edelweiss.', image: 'https://img.inews.co.id/media/1200/files/inews_new/2023/05/05/fakta_gunung_gede_pangrango.jpg', lat: -6.769275317033436, lon: 106.96348227125267, temp: '...', status: 'Memuat...', icon: null },
    { id: 3, name: 'Gede', location: 'Jawa Barat', description: 'Bersebelahan dengan Gunung Pangrango, memiliki alun-alun Surya Kencana.', image: 'https://jnewsonline.com/wp-content/uploads/2025/01/gunung-gede.jpg', lat: -6.787308831022403, lon: 106.98198723263066, temp: '...', status: 'Memuat...', icon: null },
    { id: 4, name: 'Patuha', location: 'Jawa Barat', description: 'Terkenal dengan objek wisata Kawah Putih yang indah dan sureal.', image: 'https://pariwisataindonesia.id/wp-content/uploads/2021/12/gunung_patuha.jpg', lat: -7.160409281430084, lon: 107.39997960943913, temp: '...', status: 'Memuat...', icon: null },
    { id: 5, name: 'Arjuno', location: 'Jawa Timur', description: 'Salah satu gunung tertinggi di Jawa dengan banyak situs peninggalan sejarah.', image: 'https://backpackerjakarta.com/wp-content/uploads/2018/02/gunung-arjuno-di-malang.jpg', lat: -7.724064156312168, lon: 112.58970140958358, temp: '...', status: 'Memuat...', icon: null },
    // ***** INI BAGIAN YANG DIPERBAIKI *****
    { id: 6, name: 'Slamet', location: 'Jawa Tengah', description: 'Merupakan gunung berapi aktif dan puncak tertinggi di Jawa Tengah.', image: 'https://img.inews.co.id/media/1200/files/inews_new/2023/10/22/puncak_gunung_slamet.jpg', lat: -7.240664941694138, lon: 109.21414390999458, temp: '...', status: 'Memuat...', icon: null },
    { id: 7, name: 'Sindoro', location: 'Jawa Tengah', description: 'Bersebelahan dengan Gunung Sumbing, menawarkan pemandangan alam menakjubkan.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijxOZeBrmsgh2gd16gIcC6naWzYEpaa2hUHxi0AUdvrNTKdkwhtMbkpvel5WJzXkRI0Xq14Y9VDfYlYSaP5DUBf2DkjruK5GCfTXkCe41H3gktBh-Jr3dq4kCUJirdwAplPNaEYhdzw7vW/s1600/sindoro+%25281%2529.jpg', lat: -7.301478117879672, lon: 109.99613362481797, temp: '...', status: 'Memuat...', icon: null },
    { id: 8, name: 'Ciremai', location: 'Jawa Barat', description: 'Gunung berapi soliter tertinggi di Jawa Barat dengan jalur pendakian yang menantang.', image: 'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/251/2024/10/04/IMG_7313-599703419.jpg', lat: -6.892480936316369, lon: 108.4070098400601, temp: '...', status: 'Memuat...', icon: null },
    { id: 9, name: 'Ijen', location: 'Jawa Timur', description: 'Terkenal di seluruh dunia dengan fenomena api biru (Blue Fire) yang menakjubkan.', image: 'https://asset.kompas.com/crops/fu2SL2EKEzm5evOAXDv-SyvvD9Y=/0x0:1200x800/1200x800/data/photo/2021/08/19/611e162fed8b4.jpg', lat: -8.055678699133033, lon: 114.24361471781717, temp: '...', status: 'Memuat...', icon: null },
    { id: 10, name: 'Tangkuban Perahu', location: 'Jawa Barat', description: 'Gunung berapi aktif yang kawahnya bisa diakses dengan mudah oleh wisatawan.', image: 'https://www.agoda.com/wp-content/uploads/2024/02/Featured-image-Tangkuban-Perahu-Bandung-Indonesia.jpg', lat: -6.758912951654527, lon: 107.60973770193705, temp: '...', status: 'Memuat...', icon: null },
    { id: 11, name: 'Kelud', location: 'Jawa Timur', description: 'Memiliki "Anak Gunung Kelud" yang muncul di tengah kawah setelah letusan.', image: 'https://asset.kompas.com/crops/Kc4NFC9_4nRvoUd25lHf2Bmt0PA=/21x8:1787x1186/1200x800/data/photo/2022/08/20/6300949c5346c.jpg', lat: -7.934234642571064, lon: 112.31436088635661, temp: '...', status: 'Memuat...', icon: null },
    { id: 12, name: 'Kawi', location: 'Jawa Timur', description: 'Selain pendakian, gunung ini juga dikenal sebagai tempat wisata religi.', image: 'https://shelterjelajah.com/wp-content/uploads/2024/12/Tips-Tektok-Gunung-Kawi.jpeg', lat: -7.953597142263375, lon: 112.46517157895796, temp: '...', status: 'Memuat...', icon: null },
    { id: 13, name: 'Galunggung', location: 'Jawa Barat', description: 'Terkenal dengan kawahnya yang luas dan tangga dengan ratusan anak tangga.', image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Mt_galunggung_volcanic_crater.jpg', lat: -7.265772449008553, lon: 108.0714520406878, temp: '...', status: 'Memuat...', icon: null },
    { id: 14, name: 'Raung', location: 'Jawa Timur', description: 'Memiliki kaldera yang sangat besar dan jalur puncak sejati yang ekstrem.', image: 'https://shelterjelajah.com/wp-content/uploads/2024/08/Tips-Mendaki-Gunung-Raung.jpeg', lat: -8.124770907018101, lon: 114.04609070969117, temp: '...', status: 'Memuat...', icon: null },
    { id: 15, name: 'Welirang', location: 'Jawa Timur', description: 'Dikenal sebagai "gunung belerang" dengan pemandangan penambang belerang tradisional.', image: 'https://shelterjelajah.com/wp-content/uploads/2023/04/Private-Trip-Gunung-Welirang-Luxury.jpg', lat: -7.9158591023577465, lon: 112.44995700223055, temp: '...', status: 'Memuat...', icon: null },
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

  if (selectedLocation.value !== 'Semua') {
    mountains = mountains.filter(m => m.location === selectedLocation.value);
  }

  if (searchQuery.value) {
    mountains = mountains.filter(m =>
      m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return mountains;
});

// Gunakan onMounted untuk menjalankan fetch data saat komponen siap
onMounted(() => {
  allMountains.value.forEach(async (mountain) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${mountain.lat}&lon=${mountain.lon}&appid=${apiKey}&units=metric`;
    
    console.log(`Mengambil data untuk: ${mountain.name} dari URL: ${apiUrl}`);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        // Jika response tidak OK, lempar error dengan statusnya
        throw new Error(`Gagal mengambil data cuaca, status: ${response.status}`);
      }
      const data = await response.json();

      console.log(`Data diterima untuk ${mountain.name}:`, data);

      // Perbarui nilai temp dan status
      mountain.temp = Math.round(data.main.temp);
      mountain.status = translateWeatherDescription(data.weather[0].description);
      mountain.icon = data.weather[0].icon;

    } catch (error) {
      console.error(`Error saat mengambil data untuk ${mountain.name}:`, error);
      // Jika error, tampilkan pesan di kartu
      mountain.temp = '-';
      mountain.status = 'Gagal Memuat';
      mountain.icon = null;
    }
  });
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
  overflow-x: auto; /* scroll horizontal */
  -webkit-overflow-scrolling: touch;
}

.location-filters button {
  flex: 0 0 auto;
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

/* Mobile Responsive */
@media (max-width: 768px) {
  .header-section h1 {
    font-size: 2rem;
    font-weight: 700;
  }

  .filter-controls {
    flex-direction: column; /* jadi kolom */
    align-items: stretch;
  }

  .location-filters {
    width: 100%;
    justify-content: flex-start;
  }

  .search-input {
    width: 100%;
  }

  .search-input input {
    width: 100%;
  }
}

</style>