<script setup>
import { ref } from 'vue';

// --- MOCK DATA UNTUK TIM ---
// Anda bisa mengganti ini dengan data tim Anda yang sebenarnya.
// Avatar menggunakan layanan gratis ui-avatars.com
const teamMembers = ref([
  {
    name: 'Adi Nugroho',
    role: 'Founder & Lead Developer',
    quote: '"Saya percaya teknologi bisa membuat petualangan di alam bebas menjadi lebih aman dan menyenangkan."',
    avatar: 'https://ui-avatars.com/api/?name=Adi+Nugroho&background=2d8659&color=fff&size=128'
  },
  {
    name: 'Citra Lestari',
    role: 'Content & Community Manager',
    quote: '"Setiap gunung punya cerita. Tugas saya adalah membagikan cerita itu dan membangun komunitas pendaki yang solid."',
    avatar: 'https://ui-avatars.com/api/?name=Citra+Lestari&background=495057&color=fff&size=128'
  },
  {
    name: 'Budi Santoso',
    role: 'Data & Meteorologi Partner',
    quote: '"Data cuaca yang akurat adalah kunci keselamatan. Saya bangga bisa berkontribusi untuk itu."',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=2d8659&color=fff&size=128'
  }
]);
</script>

<template>
  <div class="about-page">
    <header class="about-header">
      <div class="container text-center">
        <h1 class="main-title">Dibuat oleh Pendaki, untuk Pendaki.</h1>
        <p class="subtitle">
          InfoGunung lahir dari kecintaan kami terhadap alam Indonesia dan semangat untuk saling menjaga di jalur pendakian.
        </p>
      </div>
    </header>

    <section class="our-story">
      <div class="container">
        <div class="story-content">
          <div class="story-image">
            <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop" alt="Tim pendaki sedang berdiskusi di gunung">
          </div>
          <div class="story-text">
            <h2>Kisah Kami</h2>
            <p>
              Semuanya berawal dari sebuah pendakian yang hampir batal karena informasi cuaca yang simpang siur. Kami menyadari, banyak pendaki, baik pemula maupun berpengalaman, menghadapi masalah yang sama. Sulitnya mendapatkan data cuaca gunung yang terpusat, akurat, dan mudah dipahami menjadi sebuah tantangan.
            </p>
            <p>
              Dari situlah, ide InfoGunung muncul. Bukan hanya sebagai website, tapi sebagai sebuah platform yang kami harapkan bisa menjadi "teman digital" bagi setiap pendaki di Jawa, memberikan informasi krusial demi keselamatan dan kenyamanan setiap petualangan.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="our-mission">
        <div class="container text-center">
            <h2 class="section-title">Misi & Nilai Kami</h2>
            <div class="values-grid">
                <div class="value-card">
                    <div class="icon-wrapper">🛡️</div>
                    <h3>Keamanan Utama</h3>
                    <p>Menyediakan informasi yang akurat untuk membantu pendaki mengambil keputusan yang tepat demi keselamatan.</p>
                </div>
                <div class="value-card">
                    <div class="icon-wrapper">🎯</div>
                    <h3>Akurasi Data</h3>
                    <p>Mengintegrasikan data dari sumber meteorologi terpercaya untuk memberikan prediksi cuaca yang andal.</p>
                </div>
                <div class="value-card">
                    <div class="icon-wrapper">🤝</div>
                    <h3>Komunitas Solid</h3>
                    <p>Membangun wadah bagi para pendaki untuk berbagi informasi, pengalaman, dan semangat konservasi alam.</p>
                </div>
            </div>
        </div>
    </section>


    <section class="our-team">
      <div class="container text-center">
        <h2 class="section-title">Tim di Balik InfoGunung</h2>
        <div class="team-grid">
          <div v-for="member in teamMembers" :key="member.name" class="team-card">
            <img :src="member.avatar" :alt="`Foto ${member.name}`" class="avatar">
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
            <blockquote class="member-quote">{{ member.quote }}</blockquote>
          </div>
        </div>
      </div>
    </section>

    <section class="get-in-touch">
        <div class="container text-center">
            <h2 class="section-title">Terhubung dengan Kami</h2>
            <p>Punya saran, masukan, atau ingin berkolaborasi? Kami akan senang mendengarnya!</p>
            <div class="social-links">
                <a href="mailto:kontak@infogunung.com" title="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
                <a href="#" target="_blank" title="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" target="_blank" title="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
            </div>
        </div>
    </section>

  </div>
</template>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}
.text-center { text-align: center; }

.about-header {
  padding: 5rem 0;
  background-color: var(--color-background);
}
.main-title {
  font-size: 3.2rem;
  font-weight: 800;
  color: var(--color-text);
}
.subtitle {
  font-size: 1.25rem;
  color: #555;
  max-width: 700px;
  margin: 1rem auto 0 auto;
}

section {
  padding: 5rem 0;
}
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

/* Our Story */
.our-story {
  background-color: white;
}
.story-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: center;
}
.story-image img {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}
.story-text h2 {
  font-size: 2.5rem;
  margin-top: 0;
}
.story-text p {
  line-height: 1.8;
  color: #333;
}

/* Mission & Values */
.our-mission {
    background-color: #f8f9fa;
}
.values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}
.value-card {
    background-color: white;
    padding: 2.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}
.icon-wrapper {
    font-size: 3rem;
    margin-bottom: 1rem;
}
.value-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

/* Our Team */
.our-team {
  background-color: white;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.team-card {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  border: 4px solid white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.member-name {
  margin: 0;
  font-size: 1.5rem;
}
.member-role {
  color: var(--color-primary);
  font-weight: 600;
  margin-top: 0.25rem;
}
.member-quote {
  margin-top: 1rem;
  font-style: italic;
  color: #555;
  border-left: 3px solid var(--color-primary);
  padding-left: 1rem;
  text-align: left;
}

/* Get in Touch */
.get-in-touch {
    background-color: var(--color-text);
    color: white;
}
.get-in-touch .section-title {
    color: white;
}
.get-in-touch p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
}
.social-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
}
.social-links a {
    color: white;
    border: 2px solid white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
}
.social-links a:hover {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    transform: translateY(-5px);
}
</style>