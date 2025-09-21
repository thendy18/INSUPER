// --- jiwa-calculator.js --- //
document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('jiwaPremiumCalculator');
    const resultDiv = document.getElementById('premiumResult');
    const premiumText = document.getElementById('calculatedPremium');
    const messageDiv = document.getElementById('calculatorMessage');

    calculatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        messageDiv.style.display = 'none';
        resultDiv.style.display = 'none';

        // Ambil nilai 
        const fullName = document.getElementById('jiwa-fullname').value;
        const dob = document.getElementById('jiwa-dob').value;
        const coverageAmount = document.getElementById('jiwa-coverage').value;

        // Validasi input
        if (!fullName || !dob || !coverageAmount) {
            showMessage('Harap isi semua informasi yang diperlukan.', 'error');
            return;
        }

        // --- PERHITUNGAN PREMI ---

        // 1. Hitung umur (u)
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Tentukan tarif premi (m) berdasarkan umur
        let m = 0; // Tarif premi
        if (age <= 30) {
            m = 0.002; // 0.2%
        } else if (age > 30 && age <= 50) {
            m = 0.004; // 0.4%
        } else { // age > 50
            m = 0.01; // 1%
        }

        // Ambil besaran pertanggungan (t)
        const t = parseFloat(coverageAmount);

        // Hitung harga premi per bulan
        const monthlyPremium = m * t;

        // --- TAMPILKAN HASIL ---
        premiumText.textContent = `Rp ${monthlyPremium.toLocaleString('id-ID')}`;
        resultDiv.style.display = 'block';

        // Simpan data ke localStorage untuk halaman checkout
        // Premi tahunan = premi bulanan * 12
        localStorage.setItem('finalPremium', monthlyPremium * 12);
        localStorage.setItem('productName', 'Asuransi Jiwa INSUPER');
    });

    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }
});