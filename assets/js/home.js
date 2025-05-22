AOS.init();
// Custom smooth scroll without changing the hash URL
document.querySelector('[data-scroll="#waktu-acara"]').addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#waktu-acara');
    const offset = -70;
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startY = window.pageYOffset;
    const duration = 1200;
    const startTime = performance.now();

    function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, startY + (targetY - startY) * ease);

        if (progress < 1) {
            requestAnimationFrame(scrollStep);
        }
    }

    requestAnimationFrame(scrollStep);

    // Play music saat undangan dibuka
    const audio = document.getElementById('bg-music');
    audio.play().catch(() => {}); // catch untuk mencegah error di browser tertentu
    // Ganti icon ke pause
    document.getElementById('music-icon').className = 'bi bi-pause-circle';
});

// Bg Music
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle-floating');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

// function updateIcon() {
//     if (audio.paused) {
//         musicIcon.className = 'bi bi-play-circle';
//     } else {
//         musicIcon.className = 'bi bi-pause-circle';
//     }
// }

musicBtn.addEventListener('click', function() {
    // e.stopPropagation();
    if (audio.paused) {
        audio.play();
        musicIcon.className = 'bi bi-play-circle';
        isPlaying = true;
    } else {
        audio.pause();
        musicIcon.className = 'bi bi-pause-circle';
        isPlaying = false;
    }
    // updateIcon();
});

// audio.addEventListener('play', updateIcon);
// audio.addEventListener('pause', updateIcon);

// // Set initial icon
// updateIcon();

// Jangan tampilkan tombol music sebelum undangan dibuka
musicBtn.style.display = 'none';
document.querySelector('[data-scroll="#waktu-acara"]').addEventListener('click', function() {
    musicBtn.style.display = 'flex';
});

// Countdown Timer
const countdown = document.getElementById('countdown');
const weddingDate = new Date("2025-06-26T08:00:00").getTime();

function pad(num) {
  return String(num).padStart(2, '0');
}

function renderCountdown(days, hours, mins, secs) {
  countdown.innerHTML = `
    <div class="countdown-item"><span class="count">${pad(days)}</span><span class="label">Days</span></div>
    <div class="countdown-item"><span class="count">${pad(hours)}</span><span class="label">Hours</span></div>
    <div class="countdown-item"><span class="count">${pad(mins)}</span><span class="label">Minutes</span></div>
    <div class="countdown-item"><span class="count">${pad(secs)}</span><span class="label">Seconds</span></div>
  `;
}

if (countdown) {
  let prev = {};
  renderCountdown(0, 0, 0, 0); // initial render
  let countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      countdown.innerHTML = "Selamat datang di hari pernikahan kami!";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    // Jika angka berubah, beri animasi
    const items = countdown.querySelectorAll('.count');
    const values = [days, hours, mins, secs];
    if (items.length === 4) {
      values.forEach((val, i) => {
        if (items[i].textContent !== pad(val)) {
          items[i].textContent = pad(val);
          items[i].classList.add('animated');
          setTimeout(() => items[i].classList.remove('animated'), 200);
        }
      });
    } else {
      renderCountdown(days, hours, mins, secs);
    }
  }, 1000);
}