<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

// Definisikan API Key Anda di satu tempat
const apiKey = '6203054842e25d37aa7f9c44b7098fc7';

// --- FUNGSI BARU UNTUK MENERJEMAHKAN STATUS CUACA ---
function translateWeatherDescription(description) {
  const translations = {
    'clear sky': 'Langit Cerah',
    'few clouds': 'Sedikit Berawan',
    'scattered clouds': 'Berawan Sebagian',
    'broken clouds': 'Berawan',
    'overcast clouds': 'Sangat Berawan (Mendung)',
    'shower rain': 'Hujan Gerimis',
    'rain': 'Hujan',
    'light rain': 'Hujan Ringan',
    'moderate rain': 'Hujan Sedang',
    'thunderstorm': 'Badai Petir',
    'snow': 'Salju',
    'mist': 'Berkabut',
    'fog': 'Kabut Tebal',
  };
  // Kembalikan terjemahan jika ada, atau kembalikan teks asli dengan huruf kapital
  return translations[description.toLowerCase()] || (description.charAt(0).toUpperCase() + description.slice(1));
}

// contoh get api di link bawah ini
// https://api.openweathermap.org/data/2.5/weather?lat=-8.1072&lon=112.9223&appid=6203054842e25d37aa7f9c44b7098fc7&units=metric

// --- MOCK DATA (Data Palsu) ---
// Nanti, data ini akan Anda ambil dari API atau database Anda.

const featuredMountains = ref([
  {
    id: 1,
    name: 'Gunung Semeru',
    location: 'Jawa Timur',
    image: 'https://plus.unsplash.com/premium_photo-1697729935951-420138024919?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lat: -8.1072,
    lon: 112.9223,
    temp: "...",
    status: 'Cerah, Aman Didaki',
    icon: null
  },
  {
    id: 2,
    name: 'Gunung Merbabu',
    location: 'Jawa Tengah',
    image: 'https://asset.kompas.com/crops/37yCLGqU2DiI7FGy_scDpnAlGzQ=/0x0:1500x1000/1200x800/data/photo/2020/08/14/5f3615920efd9.jpg',
    lat: -7.452422957882377,
    lon: 110.44041882494714,
    temp: "...",
    status: 'Berawan, Waspada Angin',
    icon: null
  },
  {
    id: 3,
    name: 'Gunung Gede',
    location: 'Jawa Barat',
    image: 'https://jnewsonline.com/wp-content/uploads/2025/01/gunung-gede.jpg',
    lat: -6.787308831022403,
    lon: 106.98198723263066,
    temp: "...",
    status: 'Cerah, Aman Didaki',
    icon: null
  }
]);

const latestArticles = ref([
  { id: 1, title: '10 Perlengkapan Wajib untuk Pendaki Pemula', excerpt: 'Jangan sampai ada yang tertinggal! Pastikan semua perlengkapan ini ada di dalam ransel Anda sebelum memulai pendakian.' },
  { id: 2, title: 'Tips Menghadapi Badai Hipotermia di Gunung', excerpt: 'Mengenali gejala dan cara penanganan yang tepat saat Anda atau rekan Anda mengalami hipotermia.' },
  { id: 3, title: 'Jalur Pendakian Favorit di Gunung Prau', excerpt: 'Pilih jalur yang paling sesuai dengan kemampuan dan nikmati pemandangan golden sunrise terbaik di Jawa Tengah.' }
]);

// Gunakan onMounted untuk menjalankan fetch data saat komponen siap
onMounted(() => {
  // Loop melalui setiap gunung di dalam ref untuk mengambil datanya masing-masing
  const fetchPromises = featuredMountains.value.map(async (mountain) => {
    // Buat URL API yang dinamis untuk setiap gunung
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${mountain.lat}&lon=${mountain.lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Gagal mengambil data cuaca');
      }
      const data = await response.json();

      // Perbarui nilai temp dan status untuk gunung yang sedang diproses
      // Math.round() untuk membulatkan suhu
      mountain.temp = Math.round(data.main.temp); 
      // Mengambil deskripsi cuaca dan menjadikannya huruf kapital di awal
      mountain.status = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
      mountain.icon = data.weather[0].icon;

    } catch (error) {
      console.error(`Error fetching data for ${mountain.name}:`, error);
      // Jika error, tampilkan pesan di kartu
      mountain.temp = '-';
      mountain.status = 'Gagal Memuat';
      mountain.icon = null;
    }
    return mountain;
  });

  // Promise.all memastikan semua fetch selesai sebelum melanjutkan
  // Meskipun tidak wajib di sini karena kita memodifikasi objek secara langsung,
  // ini adalah praktik yang baik.
  Promise.all(fetchPromises);
});

</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-content">
        <h1>Jelajahi Puncak Jawa</h1>
        <p class="subtitle">Sumber informasi cuaca dan kondisi pendakian terpercaya di Pulau Jawa.</p>
        <RouterLink to="/gunung" class="cta-button">Lihat Daftar Gunung</RouterLink>
      </div>
    </section>

    <section class="featured-mountains">
      <div class="container">
        <h2 class="section-title">Gunung Pilihan</h2>
        <div class="mountain-grid">
          <div v-for="mountain in featuredMountains" :key="mountain.id" class="mountain-card">
            <img :src="mountain.image" :alt="`Pemandangan ${mountain.name}`" class="card-image">
            <div class="card-content">
              <h3>{{ mountain.name }}</h3>
              <p class="location">{{ mountain.location }}</p>
              <div class="weather-info">
                <div class="temp-display">
                  <span class="icon">🌡️</span>
                  <span>{{ mountain.temp }}°C</span>
                </div>
                <div class="status-display">
                  <img 
                    v-if="mountain.icon" 
                    :src="`https://openweathermap.org/img/wn/${mountain.icon}@2x.png`" 
                    :alt="mountain.status" 
                    class="weather-icon">
                  <span class="status-text">{{ mountain.status }}</span>
                </div>
              </div>
              <RouterLink :to="`/gunung/${mountain.id}`" class="details-button">Lihat Detail</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="latest-articles">
       <div class="container">
        <h2 class="section-title">Panduan & Artikel Terbaru</h2>
        <div class="article-grid">
            <div v-for="article in latestArticles" :key="article.id" class="article-card">
                <h3>{{ article.title }}</h3>
                <p>{{ article.excerpt }}</p>
                <RouterLink to="/panduan" class="read-more">Baca Selengkapnya →</RouterLink>
            </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Hero Section Styling */
.hero {
  position: relative;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnQlMjBicm9tb3xlbnwwfHwwfHx8MA%3D%3D');
  background-size: cover;
  background-position: center;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
}

.hero-content .subtitle {
  font-size: 1.25rem;
  font-weight: 300;
  margin-bottom: 2rem;
}

.cta-button {
  background-color: var(--color-primary);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  transition: background-color 0.3s, transform 0.3s;
}

.cta-button:hover {
  background-color: #256d49;
  transform: translateY(-3px);
}

/* General Section Styling */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.featured-mountains, .latest-articles {
  padding: 4rem 0;
}

.latest-articles {
    background-color: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--color-text);
}

/* Mountain Card Styling */
.mountain-grid, .article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.mountain-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.mountain-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 25px rgba(0,0,0,0.12);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: var(--color-text);
}

.location {
  color: #777;
  margin-bottom: 1rem;
}

.weather-info {
  display: flex; /* Gunakan flexbox */
  justify-content: space-between; /* Posisikan suhu dan status di ujung */
  align-items: center; /* Sejajarkan secara vertikal */
  background-color: #f8f9fa; /* Beri sedikit background */
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
}

.temp-display span {
  font-size: 1.8rem; /* Perbesar ukuran suhu */
  font-weight: 700;
  color: var(--color-text);
}

.status-display {
  display: flex;
  flex-direction: column; /* Susun ikon dan teks secara vertikal */
  align-items: center; /* Pusatkan ikon dan teks */
  text-align: center;
}

.weather-icon {
  width: 50px; /* Ukuran ikon */
  height: 50px;
  object-fit: contain;
}

.status-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
}

.status {
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  color: #888;
  font-weight: 500;
  text-align: center;
}

.details-button {
  display: block;
  background-color: #f1f1f1;
  color: var(--color-text);
  text-align: center;
  padding: 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
}

.details-button:hover {
  background-color: var(--color-primary);
  color: white;
}

/* Article Card Styling */
.article-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.article-card h3 {
    margin-top: 0;
}

.read-more {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 700;
}
</style>