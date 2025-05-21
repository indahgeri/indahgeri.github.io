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

// RSVP Form
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nama = this.nama.value;
    const kehadiran = this.kehadiran.value;
    const result = document.getElementById('rsvp-result');
    if (result) {
      result.innerHTML = `Terima kasih, ${nama}. Anda telah memilih: <strong>${kehadiran}</strong>.`;
    }
    this.reset();
  });
}

// Autoplay music
window.addEventListener('load', () => {
  const music = document.getElementById('bg-music');
  if (music) {
    music.play().catch(() => {
      console.log("Autoplay diblokir browser. Klik layar untuk mulai.");
      document.body.addEventListener('click', () => music.play(), { once: true });
    });
  }
});
