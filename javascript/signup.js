// --- signup.js ---

document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen form dan pesan dari HTML
    const signupForm = document.getElementById('signupForm');
    const messageDiv = document.getElementById('message');

    // Jalankan kode saat tombol submit diklik
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ambil semua nilai dari setiap input
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validasi Input
        if (!fullName || !phone || !email || !password || !confirmPassword) {
            showMessage('Semua field harus diisi!', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Format email tidak valid!', 'error');
            return;
        }

        const nameRegex = /^[a-zA-Z\s]{3,32}$/;
        if (!nameRegex.test(fullName)) {
            showMessage('Nama lengkap hanya boleh berisi huruf (3-32 karakter)!', 'error');
            return;
        }

        const phoneRegex = /^08[0-9]{8,14}$/;
        if (!phoneRegex.test(phone)) {
            showMessage('Nomor HP harus diawali 08xx dan panjang 10-16 digit!', 'error');
            return;
        }
        
        if (password.length < 8) {
            showMessage('Kata sandi minimal harus 8 karakter!', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('Kata sandi dan konfirmasi tidak cocok!', 'error');
            return;
        }

        // Simulasi Penyimpanan Data
        const newUser = {
            fullName,
            phone,
            email,
            password
        };

        localStorage.setItem('user', JSON.stringify(newUser));

        // Tampilkan Pesan Sukses dan Alihkan Halaman
        showMessage('Pendaftaran berhasil! Anda akan dialihkan ke halaman login.', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });

    // Fungsi untuk menampilkan pesan error atau sukses
    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
    }
});