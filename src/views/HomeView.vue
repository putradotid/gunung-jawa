<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// --- MOCK DATA (Data Palsu) ---
// Nanti, data ini akan Anda ambil dari API atau database Anda.
const featuredMountains = ref([
  {
    id: 1,
    name: 'Gunung Semeru',
    location: 'Jawa Timur',
    image: 'https://plus.unsplash.com/premium_photo-1697729935951-420138024919?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    temp: 10,
    status: 'Cerah, Aman Didaki'
  },
  {
    id: 2,
    name: 'Gunung Merbabu',
    location: 'Jawa Tengah',
    image: 'https://asset.kompas.com/crops/37yCLGqU2DiI7FGy_scDpnAlGzQ=/0x0:1500x1000/1200x800/data/photo/2020/08/14/5f3615920efd9.jpg',
    temp: 12,
    status: 'Berawan, Waspada Angin'
  },
  {
    id: 3,
    name: 'Gunung Gede',
    location: 'Jawa Barat',
    image: 'https://jnewsonline.com/wp-content/uploads/2025/01/gunung-gede.jpg',
    temp: 14,
    status: 'Cerah, Aman Didaki'
  }
]);

const latestArticles = ref([
  { id: 1, title: '10 Perlengkapan Wajib untuk Pendaki Pemula', excerpt: 'Jangan sampai ada yang tertinggal! Pastikan semua perlengkapan ini ada di dalam ransel Anda sebelum memulai pendakian.' },
  { id: 2, title: 'Tips Menghadapi Badai Hipotermia di Gunung', excerpt: 'Mengenali gejala dan cara penanganan yang tepat saat Anda atau rekan Anda mengalami hipotermia.' },
  { id: 3, title: 'Jalur Pendakian Favorit di Gunung Prau', excerpt: 'Pilih jalur yang paling sesuai dengan kemampuan dan nikmati pemandangan golden sunrise terbaik di Jawa Tengah.' }
]);

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
                <span>🌡️ {{ mountain.temp }}°C</span>
                <span class="status" :class="{ 'status-aman': mountain.status.includes('Aman'), 'status-waspada': mountain.status.includes('Waspada') }">
                  {{ mountain.status }}
                </span>
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.status {
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  text-align: center;
}

.status-aman {
  background-color: var(--color-primary); /* Hijau */
}

.status-waspada {
  background-color: #f39c12; /* Oranye */
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