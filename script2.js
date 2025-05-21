// Background music autoplay (with user gesture fallback for some browsers)
document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bg-music');
    if (music) {
        // Try to play immediately, fallback to user gesture
        music.play().catch(() => {
            document.body.addEventListener('click', () => {
                music.play();
            }, { once: true });
        });
    }

    // Countdown
    const targetDate = new Date('2025-06-20T00:00:00');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            daysSpan.textContent = '00';
            hoursSpan.textContent = '00';
            minutesSpan.textContent = '00';
            secondsSpan.textContent = '00';
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        daysSpan.textContent = String(days).padStart(2, '0');
        hoursSpan.textContent = String(hours).padStart(2, '0');
        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // RSVP Form
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpList = document.getElementById('rsvp-list');
    let rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');

    function renderRSVPs() {
        rsvpList.innerHTML = '';
        if (rsvps.length === 0) {
            rsvpList.innerHTML = '<p>Belum ada konfirmasi kehadiran.</p>';
            return;
        }
        rsvps.forEach(rsvp => {
            const entry = document.createElement('div');
            entry.className = 'rsvp-entry';
            entry.innerHTML = `<span class="name">${rsvp.name}</span> <span class="attendance">(${rsvp.attendance})</span><div class="message">${rsvp.message ? rsvp.message : ''}</div>`;
            rsvpList.appendChild(entry);
        });
    }
    renderRSVPs();

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const attendance = document.getElementById('attendance').value;
        const message = document.getElementById('message').value.trim();
        if (!name || !attendance) return;
        const newRSVP = { name, attendance, message };
        rsvps.unshift(newRSVP);
        localStorage.setItem('rsvps', JSON.stringify(rsvps));
        renderRSVPs();
        rsvpForm.reset();
    });

    // Gallery: click to enlarge
    document.querySelectorAll('.gallery img').forEach(img => {
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = 'rgba(0,0,0,0.7)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = 1000;
            const bigImg = document.createElement('img');
            bigImg.src = img.src;
            bigImg.style.maxWidth = '90vw';
            bigImg.style.maxHeight = '80vh';
            bigImg.style.borderRadius = '12px';
            overlay.appendChild(bigImg);
            overlay.addEventListener('click', () => document.body.removeChild(overlay));
            document.body.appendChild(overlay);
        });
    });
});
