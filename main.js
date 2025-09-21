// --- main.js (Tanpa Kode Slider) --- //
document.addEventListener('DOMContentLoaded', () => {
    
    // Logika untuk Cek Status Login
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userString = localStorage.getItem('user');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const authButtons = document.getElementById('authButtons');
    const logoutButton = document.getElementById('logoutButton');

    if (welcomeMessage && authButtons && logoutButton) {
        if (isLoggedIn === 'true' && userString) {
            // Jika pengguna sudah login
            const user = JSON.parse(userString);
            welcomeMessage.textContent = `Selamat Datang, ${user.fullName}!`;
            authButtons.style.display = 'none';
            logoutButton.style.display = 'block';

            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'login.html';
            });
        } else {
            // Jika pengguna belum login
            welcomeMessage.textContent = `Perlindungan Maksimal, Ketenangan Pikiran Total`;
            authButtons.style.display = 'flex';
            logoutButton.style.display = 'none';
        }
    }

     // --- KODE BARU UNTUK MENU HAMBURGER ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});