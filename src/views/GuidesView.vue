<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

// --- MOCK DATA ARTIKEL ---
// Nanti, data ini akan Anda ambil dari CMS atau database.
const allArticles = ref([
  { id: 1, title: '10 Perlengkapan Wajib untuk Pendaki Pemula', category: 'Pemula', excerpt: 'Jangan sampai ada yang tertinggal! Pastikan semua perlengkapan ini ada di dalam ransel Anda sebelum memulai pendakian.', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop', author: 'Citra Lestari', date: '2025-06-10' },
  { id: 2, title: 'Tips Menghadapi Badai Hipotermia di Gunung', category: 'Keselamatan', excerpt: 'Mengenali gejala dan cara penanganan yang tepat saat Anda atau rekan Anda mengalami hipotermia.', image: 'https://images.unsplash.com/photo-1619519349398-a083a48e2947?q=80&w=1470&auto=format&fit=crop', author: 'Adi Nugroho', date: '2025-06-05' },
  { id: 3, title: 'Review Jalur Pendakian Gunung Merbabu via Selo', category: 'Review Jalur', excerpt: 'Kupas tuntas estimasi waktu, kondisi trek, dan sumber air di jalur pendakian paling populer di Merbabu.', image: 'https://images.unsplash.com/photo-1596723381273-199b53a312da?q=80&w=1548&auto=format&fit=crop', author: 'Budi Santoso', date: '2025-05-28' },
  { id: 4, title: 'Cara Memilih Sepatu Gunung yang Tepat', category: 'Peralatan', excerpt: 'Investasi terbaik seorang pendaki adalah sepatu yang nyaman dan aman. Pelajari cara memilihnya di sini.', image: 'https://images.unsplash.com/photo-1520219318043-c05b82193699?q=80&w=1471&auto=format&fit=crop', author: 'Citra Lestari', date: '2025-05-20' },
  { id: 5, title: 'Manajemen Logistik dan Makanan Saat Mendaki', category: 'Pemula', excerpt: 'Hitung kalori dan bawa makanan yang tepat agar energi Anda tetap terjaga selama di jalur.', image: 'https://images.unsplash.com/photo-1587899932962-d596d19455a5?q=80&w=1470&auto=format&fit=crop', author: 'Adi Nugroho', date: '2025-05-15' },
  { id: 6, title: 'Etika Pendakian: Menjadi Pendaki yang Bertanggung Jawab', category: 'Keselamatan', excerpt: 'Bawa turun sampahmu dan hormati alam. Pelajari prinsip-prinsip "Leave No Trace" untuk menjaga kelestarian gunung.', image: 'https://images.unsplash.com/photo-1621828823198-c1483e45db27?q=80&w=1470&auto=format&fit=crop', author: 'Citra Lestari', date: '2025-05-01' },
]);

// --- LOGIKA FILTER DAN SEARCH ---
const searchQuery = ref('');
const selectedCategory = ref('Semua');

// Membuat daftar kategori unik secara otomatis dari data artikel
const categories = computed(() => {
  const allCats = allArticles.value.map(article => article.category);
  return ['Semua', ...new Set(allCats)];
});

// Memfilter artikel berdasarkan kategori dan pencarian
const filteredArticles = computed(() => {
  let articles = allArticles.value;
  if (selectedCategory.value !== 'Semua') {
    articles = articles.filter(a => a.category === selectedCategory.value);
  }
  if (searchQuery.value) {
    articles = articles.filter(a => 
      a.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return articles;
});

// Memisahkan artikel unggulan (yang pertama) dari sisanya
const featuredArticle = computed(() => filteredArticles.value[0]);
const otherArticles = computed(() => filteredArticles.value.slice(1));

// Fungsi untuk memformat tanggal
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}
</script>

<template>
  <div class="guides-container">
    <header class="guides-header">
      <h1>Panduan & Wawasan Pendakian</h1>
      <p>Dari pemula hingga mahir, temukan semua yang Anda butuhkan untuk petualangan yang tak terlupakan.</p>
    </header>

    <div class="filter-controls">
      <div class="category-filters">
        <button v-for="category in categories" :key="category"
          @click="selectedCategory = category"
          :class="{ active: selectedCategory === category }">
          {{ category }}
        </button>
      </div>
      <input type="text" v-model="searchQuery" placeholder="🔍 Cari artikel..." class="search-input">
    </div>

    <section v-if="featuredArticle" class="featured-article">
      <div class="featured-image">
        <img :src="featuredArticle.image" :alt="featuredArticle.title">
      </div>
      <div class="featured-content">
        <span class="category-tag">{{ featuredArticle.category }}</span>
        <h2>{{ featuredArticle.title }}</h2>
        <p>{{ featuredArticle.excerpt }}</p>
        <div class="article-meta">
          <span>Oleh {{ featuredArticle.author }}</span>
          <span>•</span>
          <span>{{ formatDate(featuredArticle.date) }}</span>
        </div>
        <RouterLink to="#" class="read-more-btn">Baca Selengkapnya</RouterLink>
      </div>
    </section>

    <hr v-if="otherArticles.length > 0" class="divider">

    <section v-if="otherArticles.length > 0" class="articles-grid-section">
      <div class="articles-grid">
        <div v-for="article in otherArticles" :key="article.id" class="article-card">
          <img :src="article.image" :alt="article.title" class="card-image">
          <div class="card-content">
            <span class="category-tag">{{ article.category }}</span>
            <h3>{{ article.title }}</h3>
            <p class="excerpt">{{ article.excerpt }}</p>
            <div class="article-meta-small">
              <span>{{ formatDate(article.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-else-if="filteredArticles.length === 0" class="no-results">
        <h3>Artikel tidak ditemukan.</h3>
        <p>Silakan coba kata kunci atau kategori yang lain.</p>
    </div>

  </div>
</template>

<style scoped>
.guides-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.guides-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.guides-header h1 {
  font-size: 3rem;
  font-weight: 800;
}

.guides-header p {
  font-size: 1.2rem;
  color: #555;
  margin-top: 0.5rem;
}

/* Filter & Search */
.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.category-filters button {
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-filters button:hover {
  background-color: #f1f1f1;
  border-color: #ccc;
}

.category-filters button.active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.search-input {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 50px;
  width: 280px;
}

/* Featured Article */
.featured-article {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  align-items: center;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
}

.featured-image img {
  width: 100%;
  height: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.featured-content .category-tag {
  background-color: var(--color-primary);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.featured-content h2 {
  font-size: 2.2rem;
  margin: 0 0 1rem 0;
}

.featured-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 1.5rem;
}

.article-meta {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 2rem;
}

.read-more-btn {
  background-color: var(--color-text);
  color: white;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: inline-block;
}

/* Divider */
.divider {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 4rem 0;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}
.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}
.card-content .category-tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}
.card-content h3 {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}
.excerpt {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
}
.article-meta-small {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f1f1;
  font-size: 0.8rem;
  color: #888;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 4rem;
  background-color: #f8f9fa;
  border-radius: 15px;
  margin-top: 2rem;
}
</style>