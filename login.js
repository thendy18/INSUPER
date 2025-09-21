// --- login.js ---
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showMessage('Email dan kata sandi harus diisi!', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Format email tidak valid!', 'error');
            return;
        }

        const storedUserString = localStorage.getItem('user');
        
        if (!storedUserString) {
            showMessage('Akun tidak ditemukan. Silakan daftar terlebih dahulu.', 'error');
            return;
        }

        const storedUser = JSON.parse(storedUserString);

        if (email === storedUser.email && password === storedUser.password) {
            showMessage(`Login berhasil! Selamat datang, ${storedUser.fullName}.`, 'success');
            
            // Simpan status login di localStorage
            localStorage.setItem('isLoggedIn', 'true');

            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 2000);
        } else {
            showMessage('Email atau kata sandi salah!', 'error');
        }
    });

    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
    }
});