// --- mobil-calculator.js --- //
document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('mobilPremiumCalculator');
    const resultDiv = document.getElementById('premiumResult');
    const premiumText = document.getElementById('calculatedPremium');
    const messageDiv = document.getElementById('calculatorMessage');
    const yearSelect = document.getElementById('car-year');
    const currentYear = new Date().getFullYear();

    // Mengisi pilihan tahun secara dinamis
    for (let year = currentYear; year >= currentYear - 20; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Fungsi untuk menampilkan nama file yang dipilih
    const fileInputs = document.querySelectorAll('.file-input');
    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'Pilih File...';
            const labelSpan = e.target.nextElementSibling.querySelector('span');
            if (labelSpan) {
                labelSpan.textContent = fileName;
            }
        });
    });

    // Proses utama 
    calculatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        messageDiv.style.display = 'none';
        resultDiv.style.display = 'none';

        
        let isValid = true;
        const inputsToValidate = [
            document.getElementById('car-brand'),
            document.getElementById('car-model'),
            document.getElementById('car-year'),
            document.getElementById('car-price'),
            document.getElementById('car-plate'),
            document.getElementById('owner-name'),
            document.getElementById('engine-number'),
            document.getElementById('chassis-number'),
        ];

        // 1. Hapus semua tanda error sebelumnya
        inputsToValidate.forEach(input => input.classList.remove('error-input'));
        fileInputs.forEach(input => input.nextElementSibling.classList.remove('error-input'));

        // 2. Validasi input teks, angka, dan select
        inputsToValidate.forEach(input => {
            if (!input.value || (input.type === 'number' && parseFloat(input.value) <= 0)) {
                isValid = false;
                input.classList.add('error-input');
            }
        });

        // 3. Validasi input file
        fileInputs.forEach(input => {
            if (input.files.length === 0) {
                isValid = false;
                input.nextElementSibling.classList.add('error-input'); // Tandai label customnya
            }
        });

    
        if (!isValid) {
            showMessage('Harap isi semua field yang ditandai merah.', 'error');
            return;
        }


        // Ambil nilai numerik untuk perhitungan (jika sudah valid)
        const carPrice = parseFloat(document.getElementById('car-price').value);
        const carYear = parseInt(document.getElementById('car-year').value);

        // Perhitungan premi
        const carAge = currentYear - carYear;
        let premiumRate = 0;

        if (carAge >= 0 && carAge <= 3) {
            premiumRate = 0.025;
        } else if (carAge > 3 && carAge <= 5) {
            if (carPrice < 200000000) {
                premiumRate = 0.04;
            } else {
                premiumRate = 0.03;
            }
        } else if (carAge > 5) {
            premiumRate = 0.05;
        }

        const totalPremium = carPrice * premiumRate;

        // Tampilkan hasil
        premiumText.textContent = `Rp ${totalPremium.toLocaleString('id-ID')}`;
        resultDiv.style.display = 'block';

        // Simpan data ke localStorage untuk checkout
        localStorage.setItem('finalPremium', totalPremium);
        localStorage.setItem('productName', 'Asuransi Mobil INSUPER');
    });
    
    // Fungsi untuk menampilkan pesan
    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }
});