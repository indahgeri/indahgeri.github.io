
document.addEventListener("DOMContentLoaded", function() {
    const countdownElement = document.getElementById('countdown');
    // const weddingDate = new Date('2025-06-26T08:00:00');
    const date = countdownElement.getAttribute('data-date');
    const weddingDate = new Date(date);

    function pad(num) {
        return String(num).padStart(2, '0');
    }

    function updateCountdown() {
        const now = new Date();
        const timeLeft = weddingDate - now;

        if (timeLeft < 0) {
            countdownElement.innerHTML = "<h3>Acara telah berlangsung</h3>";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="count">${pad(days)}</span>
                <span class="label">Hari</span>
            </div>
            <div class="countdown-item">
                <span class="count">${pad(hours)}</span>
                <span class="label">Jam</span>
            </div>
            <div class="countdown-item">
                <span class="count">${pad(minutes)}</span>
                <span class="label">Menit</span>
            </div>
            <div class="countdown-item">
                <span class="count">${pad(seconds)}</span>
                <span class="label">Detik</span>
            </div>`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});