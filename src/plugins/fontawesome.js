// src/plugins/fontawesome.js

// 1. Import library inti
import { library } from '@fortawesome/fontawesome-svg-core';

// 2. Import komponen ikon Vue
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 3. Import ikon spesifik yang ingin Anda gunakan
//    (Anda bisa menambahkan ikon lain sesuai kebutuhan)
import { faInstagram, faYoutube, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faMountain, faUser } from '@fortawesome/free-solid-svg-icons';

// 4. Tambahkan ikon-ikon tersebut ke library
library.add(faInstagram, faYoutube, faFacebook, faTiktok, faHeart, faMountain, faUser);

// 5. Ekspor komponen FontAwesomeIcon agar bisa diregistrasi secara global
export default FontAwesomeIcon;