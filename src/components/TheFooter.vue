<template>
  <footer class="footer-sosmed">
    <div class="footer-container">
      <p>© {{ currentYear }} InfoGunung | Pendaki untuk Pendaki</p>
      
      <div class="social-links">
        <a 
          v-for="link in socialLinks" 
          :key="link.name" 
          :href="link.url" 
          target="_blank" 
          rel="noopener noreferrer"
          :aria-label="link.name"
        >
          <font-awesome-icon :icon="link.icon" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref } from 'vue';

const currentYear = computed(() => new Date().getFullYear());

// Kelola semua link sosmed di sini. Mudah untuk diubah.
const socialLinks = ref([
  // PERBAIKAN: Format 'icon' diubah menjadi array [prefix, iconName] agar kompatibel dengan komponen <font-awesome-icon>
  { name: 'Instagram', url: 'https://instagram.com', icon: ['fab', 'instagram'] },
  { name: 'YouTube', url: 'https://youtube.com', icon: ['fab', 'youtube'] },
  { name: 'Facebook', url: 'https://facebook.com', icon: ['fab', 'facebook'] },
  { name: 'TikTok', url: 'https://tiktok.com', icon: ['fab', 'tiktok'] }
]);
</script>

<style scoped>
.footer-sosmed {
  background-color: #222831; /* Warna hitam antrasit */
  color: #eeeeee;
  padding: 2rem 5%;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-container p {
  margin: 0;
  font-size: 0.9rem;
  color: #adb5bd;
}

.social-links {
  display: flex;
  align-items: center; /* Menjaga ikon tetap sejajar */
  gap: 1.2rem;
}

.social-links a {
  color: #eeeeee;
  font-size: 1.4rem;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-links a:hover {
  color: #00adb5; /* Warna aksen untuk hover */
  transform: translateY(-3px); /* Efek mengangkat */
}
</style>