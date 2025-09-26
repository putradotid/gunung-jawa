<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const searchQuery = ref('');

function search() {
  if (searchQuery.value.trim()) {
    alert(`Mencari: ${searchQuery.value}`);
    // Nanti di sini akan diisi logika pencarian sebenarnya
  }
}

const is_expanded = ref(false)

</script>

<template>
  <header class="navbar">
    <div class="container">
      <div class="logo">
        <RouterLink to="/">🏔️ InfoGunung</RouterLink>
      </div>

      <button class="hamburger" @click="is_expanded = !is_expanded">
        <span v-if="!is_expanded">☰</span>
        <span v-else>✖</span>
      </button>

      <nav class="nav-links" :class="{ active: is_expanded}">
        <RouterLink to="/">Beranda</RouterLink>
        <RouterLink to="/gunung">Daftar Gunung</RouterLink>
        <RouterLink to="/peta">Peta Pendakian</RouterLink>
        <RouterLink to="/panduan">Panduan</RouterLink>
        <RouterLink to="/tentang">Tentang</RouterLink>
      </nav>
      <div class="search-bar">
        <form @submit.prevent="search">
          <input type="text" v-model="searchQuery" placeholder="Cari gunung...">
          <button type="submit">🔍</button>
        </form>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
  color: var(--color-primary);
}

.search-bar form {
  display: flex;
}

.search-bar input {
  border: 1px solid #ccc;
  border-right: none;
  padding: 0.5rem;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-bar button {
  border: 1px solid var(--color-primary);
  background-color: var(--color-primary);
  color: white;
  padding: 0 0.75rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.hamburger {
  display: none;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
    .nav-links {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      flex-direction: column;
      background: white;
      gap: 1rem;
      padding: 1rem;
      display: none;
    }

    .nav-links.active {
      display: flex;
    }

    .hamburger {
      display: block;
    }

    .search-bar {
      display: none;
    }
  }
</style>