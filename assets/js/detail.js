
const backgrounds = [
    './assets/indah_geri/prewedding-indah-geri-6.jpg',
    './assets/indah_geri/prewedding-indah-geri-7.jpg',
    './assets/indah_geri/prewedding-indah-geri-10.jpg',
    './assets/indah_geri/prewedding-indah-geri-11.jpg'
];
let current = 0;
let next = 1;
const bgSlides = [
    document.getElementById('bg1'),
    document.getElementById('bg2')
];
let active = 0; // index bgSlides yang aktif di layar

// Set initial backgrounds
bgSlides[0].style.backgroundImage = `url('${backgrounds[current]}')`;
bgSlides[1].style.backgroundImage = `url('${backgrounds[next]}')`;
bgSlides[0].style.transform = 'translateX(0)';
bgSlides[1].style.transform = 'translateX(100vw)';

setInterval(() => {
    // Tentukan index mana yang akan masuk dan keluar
    const outIdx = active;
    const inIdx = 1 - active;

    // Set background untuk slide berikutnya
    bgSlides[inIdx].style.backgroundImage = `url('${backgrounds[next]}')`;

    // Animasi geser
    bgSlides[outIdx].style.transform = 'translateX(-100vw)';
    bgSlides[inIdx].style.transform = 'translateX(0)';

    setTimeout(() => {
        // Reset posisi slide keluar ke kanan untuk persiapan animasi berikutnya
        bgSlides[outIdx].style.transform = 'translateX(100vw)';
        // Update index dan urutan gambar
        current = next;
        next = (next + 1) % backgrounds.length;
        active = inIdx;
    }, 1000); // Durasi animasi harus sama dengan CSS transition
}, 9000);


const audio = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle-floating');
const icon = document.getElementById('music-icon');

function updateIcon() {
    if (audio.paused) {
        icon.className = 'bi bi-play-circle';
    } else {
        icon.className = 'bi bi-pause-circle';
    }
}

toggleBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updateIcon();
});

audio.addEventListener('play', updateIcon);
audio.addEventListener('pause', updateIcon);

// Set initial icon
updateIcon();