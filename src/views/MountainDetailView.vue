<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { ref, computed, onMounted } from 'vue'; // 1. Import onMounted

// --- KODE UNTUK MENGAMBIL DATA CUACA (SEBAIKNYA DISIMPAN DI FILE TERPISAH) ---
const apiKey = '6203054842e25d37aa7f9c44b7098fc7'; // <-- PASTIKAN API KEY BENAR

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
// --- AKHIR DARI KODE UNTUK CUACA ---


// --- DATABASE GUNUNG (SAMA SEPERTI DI HALAMAN SEBELUMNYA) ---
// Data awal diubah untuk menampilkan status "loading"
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

// 1. Dapatkan informasi route saat ini
const route = useRoute();
const mountainId = parseInt(route.params.id);

// 2. Cari data gunung yang cocok berdasarkan ID. Ini tetap reaktif.
const mountain = computed(() => {
  return allMountains.value.find(m => m.id === mountainId);
});

// 3. Fungsi untuk mengambil data cuaca untuk SATU gunung
async function fetchWeatherForMountain(mountainObject) {
  // Jika tidak ada objek gunung, hentikan fungsi
  if (!mountainObject) return;

  const { lat, lon, name } = mountainObject;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();

    // Langsung perbarui properti objek gunung yang ditemukan
    mountainObject.temp = Math.round(data.main.temp);
    mountainObject.status = translateWeatherDescription(data.weather[0].description);

  } catch (error) {
    console.error(`Gagal mengambil data cuaca untuk ${name}:`, error);
    mountainObject.temp = '-';
    mountainObject.status = 'Gagal Memuat';
  }
}

// 4. Saat komponen dimuat, panggil fungsi untuk mengambil data cuaca
onMounted(() => {
  // 'mountain.value' mengacu pada hasil dari computed property di atas
  fetchWeatherForMountain(mountain.value);
});
</script>

<template>
  <div class="detail-container">
    <div v-if="mountain" class="detail-card">
      <div class="image-header" :style="{ backgroundImage: `url(${mountain.image})` }">
        <RouterLink to="/gunung" class="back-button">← Kembali ke Daftar</RouterLink>
        <h1>Gunung {{ mountain.name }}</h1>
        <p class="location-tag">{{ mountain.location }}</p>
      </div>
      
      <div class="content-body">
        <div class="weather-details">
          <h2>Informasi Cuaca & Status</h2>
          <div class="weather-grid">
            <div class="weather-item">
              <span class="icon">🌡️</span>
              <span class="label">Suhu Saat Ini</span>
              <span class="value">{{ mountain.temp }}°C</span>
            </div>
            <div class="weather-item">
              <span class="icon">📍</span>
              <span class="label">Status Pendakian</span>
              <span class="value status">{{ mountain.status }}</span>
            </div>
          </div>
        </div>

        <div class="description-details">
          <h2>Deskripsi</h2>
          <p>{{ mountain.description }}</p>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h1>Oops! Gunung tidak ditemukan.</h1>
      <p>Gunung dengan ID "{{ route.params.id }}" tidak ada dalam daftar kami.</p>
      <RouterLink to="/gunung" class="back-button">← Kembali ke Daftar</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.detail-card {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
}

.image-header {
  height: 400px;
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  position: relative;
}

.image-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 60%);
}

.image-header > * {
  position: relative;
  z-index: 2;
}

.image-header h1 {
  font-size: 3.5rem;
  margin: 0;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
}

.location-tag {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  align-self: flex-start;
  font-weight: 600;
  margin-top: 0.5rem;
}

.back-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(0,0,0,0.5);
  color: white;
  padding: 0.6rem 1rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: var(--color-primary);
}

.content-body {
  padding: 2rem;
}

.content-body h2 {
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 0.4rem;
  display: inline-block;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.weather-item {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
}

.weather-item .icon {
  font-size: 2rem;
  display: block;
}

.weather-item .label {
  display: block;
  color: #666;
  margin: 0.3rem 0;
}

.weather-item .value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
}
.weather-item .value.status {
  font-size: 1rem;
}

.description-details p {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

.not-found {
  text-align: center;
  padding: 2rem;
}

/*  Tambahan khusus untuk mobile */
@media (max-width: 768px) {
  .image-header {
    height: 250px;
    padding: 1rem;
  }

  .image-header h1 {
    font-size: 2rem;
  }

  .content-body {
    padding: 1.5rem 1rem;
  }

  /* Ubah grid jadi fleksibel */
  .weather-grid {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.8rem;
  }

  .weather-item {
    flex: 1;                /* supaya bagi rata */
    padding: 0.8rem;
  }

  .weather-item .icon {
    font-size: 1.5rem;
  }

  .weather-item .value {
    font-size: 1rem;
  }
}
</style>