// --- calculator.js --- //
document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('premiumCalculator');
    const resultDiv = document.getElementById('premiumResult');
    const premiumText = document.getElementById('calculatedPremium');
    const messageDiv = document.getElementById('calculatorMessage');

    calculatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        messageDiv.style.display = 'none';

        const fullName = document.getElementById('calc-fullname').value;
        const dob = document.getElementById('calc-dob').value;
        const job = document.getElementById('calc-job').value;
        const smoker = document.getElementById('calc-smoker').value;
        const hypertension = document.getElementById('calc-hypertension').value;
        const diabetes = document.getElementById('calc-diabetes').value;

        if (!fullName || !dob || !job || smoker === "" || hypertension === "" || diabetes === "") {
            showMessage('Harap isi semua informasi yang diperlukan.', 'error');
            return;
        }

        const k1 = parseInt(smoker);
        const k2 = parseInt(hypertension);
        const k3 = parseInt(diabetes);
        const P = 2000000;

        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        let m = 0;
        if (age <= 20) {
            m = 0.1;
        } else if (age <= 35) {
            m = 0.2;
        } else if (age <= 50) {
            m = 0.25;
        } else {
            m = 0.4;
        }

        const totalPremium = P + (m * P) + (k1 * 0.5 * P) + (k2 * 0.4 * P) + (k3 * 0.5 * P);

        premiumText.textContent = `Rp ${totalPremium.toLocaleString('id-ID')}`;
        resultDiv.style.display = 'block';

        localStorage.setItem('finalPremium', totalPremium);
        
        localStorage.setItem('productName', 'Asuransi Kesehatan INSUPER');
    });

    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }
});