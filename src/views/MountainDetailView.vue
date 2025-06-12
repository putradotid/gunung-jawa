<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { ref, computed } from 'vue';

// --- DATABASE GUNUNG (SAMA SEPERTI DI HALAMAN SEBELUMNYA) ---
// Dalam aplikasi nyata, data ini sebaiknya disimpan di satu tempat (misal: file .js terpisah atau Pinia)
// agar tidak perlu di-copy paste.
const allMountains = ref([
  { id: 1, name: 'Merbabu', location: 'Jawa Tengah', description: 'Terkenal dengan pemandangan matahari terbit yang indah.', image: 'https://asset.kompas.com/crops/37yCLGqU2DiI7FGy_scDpnAlGzQ=/0x0:1500x1000/1200x800/data/photo/2020/08/14/5f3615920efd9.jpg', temp: 13, status: 'Cerah Berawan' },
  { id: 2, name: 'Pangrango', location: 'Jawa Barat', description: 'Memiliki Puncak Mandalawangi yang legendaris dan lembah penuh edelweiss.', image: 'https://img.inews.co.id/media/1200/files/inews_new/2023/05/05/fakta_gunung_gede_pangrango.jpg', temp: 15, status: 'Aman Didaki' },
  { id: 3, name: 'Gede', location: 'Jawa Barat', description: 'Bersebelahan dengan Gunung Pangrango, memiliki alun-alun Surya Kencana.', image: 'https://jnewsonline.com/wp-content/uploads/2025/01/gunung-gede.jpg', temp: 14, status: 'Aman Didaki' },
  // ... (salin sisa data gunung Anda di sini) ...
  { id: 15, name: 'Welirang', location: 'Jawa Timur', description: 'Dikenal sebagai "gunung belerang" dengan pemandangan penambang belerang tradisional.', image: 'https://shelterjelajah.com/wp-content/uploads/2023/04/Private-Trip-Gunung-Welirang-Luxury.jpg', temp: 12, status: 'Waspada Gas Belerang' },
]);

// 1. Dapatkan informasi route saat ini (termasuk parameter)
const route = useRoute();

// 2. Ambil ID dari parameter URL. route.params.id adalah string, jadi kita ubah ke angka
const mountainId = parseInt(route.params.id);

// 3. Cari data gunung yang cocok berdasarkan ID menggunakan computed property
const mountain = computed(() => {
  return allMountains.value.find(m => m.id === mountainId);
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
  top: 1.5rem;
  left: 1.5rem;
  background-color: rgba(0,0,0,0.5);
  color: white;
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: var(--color-primary);
}

.content-body {
  padding: 2.5rem;
}

.content-body h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 0.5rem;
  display: inline-block;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.weather-item {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
}

.weather-item .icon {
  font-size: 2.5rem;
  display: block;
}

.weather-item .label {
  display: block;
  color: #666;
  margin: 0.5rem 0;
}

.weather-item .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}
.weather-item .value.status {
  font-size: 1.2rem;
}

.description-details p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}

.not-found {
  text-align: center;
  padding: 4rem;
}
</style>