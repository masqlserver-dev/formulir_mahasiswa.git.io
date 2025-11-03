document.addEventListener('DOMContentLoaded', function() {
    // 1. Dapatkan elemen formulir
    const form = document.querySelector('form');
    
    // --- Elemen Modal dan Fungsinya DIHAPUS/DINONAKTIFKAN ---
    // Karena PHP akan menangani pengiriman dan pesan sukses.

    // 2. Tambahkan event listener saat formulir disubmit
    form.addEventListener('submit', function(event) {
        
        // Panggil fungsi validasi
        if (!validateForm()) { // Jika validasi GAGAL (false)
            // Hentikan pengiriman formulir dan tampilkan pesan error
            event.preventDefault(); 
            alert('❌ Mohon periksa kembali formulir Anda. Ada data yang belum lengkap atau tidak valid.');
        } 
        // Jika validasi BERHASIL (true), event.preventDefault() tidak dipanggil, 
        // sehingga form akan terkirim secara native ke submit_data.php.
    });

    // --- Logika Tombol Modal DIHAPUS ---
    // viewDataBtn.addEventListener('click', ...);
    // cancelBtn.addEventListener('click', ...);
    // successModal.addEventListener('click', ...);

    // ... (Fungsi validateForm, setError, clearErrors, isValidEmail tetap sama)
    
    // Fungsi utama untuk melakukan validasi (TIDAK BERUBAH)
    function validateForm() {
        let isValid = true;
        // ... (Logika validasi yang sama)
        const namaLengkap = document.getElementById('nama_lengkap').value.trim();
        const nim = document.getElementById('nim').value.trim();
        const email = document.getElementById('email').value.trim();
        const prodi = document.getElementById('prodi').value;
        const alamat = document.getElementById('alamat').value.trim();
        const jenisKelamin = document.querySelector('input[name="jenis_kelamin"]:checked');
        clearErrors();
        if (namaLengkap === "") {setError('nama_lengkap', 'Nama Lengkap wajib diisi.'); isValid = false;}
        if (nim === "") {
            setError('nim', 'NIM wajib diisi.');
            isValid = false;
        } else if (nim.length < 8) { 
            setError('nim', 'NIM minimal 8 digit.');
            isValid = false;
        }
        if (email === "") {
            setError('email', 'Email wajib diisi.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setError('email', 'Format Email tidak valid.');
            isValid = false;
        }
        if (prodi === "") {setError('prodi', 'Pilih Program Studi.'); isValid = false;}
        if (!jenisKelamin) {setError('jenis_kelamin_group', 'Pilih Jenis Kelamin.'); isValid = false;}
        if (alamat === "") {setError('alamat', 'Alamat wajib diisi.'); isValid = false;}
        return isValid;
    }

    // Fungsi untuk menandai field yang error (TIDAK BERUBAH)
    function setError(fieldId, message) {
        // ... (Logika setError yang sama)
        if (fieldId === 'jenis_kelamin_group') {
            const groupDiv = document.querySelector('.form-group:nth-child(5)');
            groupDiv.classList.add('error');
            const msg = document.createElement('span');
            msg.className = 'error-message';
            msg.textContent = message;
            groupDiv.appendChild(msg);
        } else {
            const inputElement = document.getElementById(fieldId);
            const formGroup = inputElement.closest('.form-group');
            formGroup.classList.add('error');
            const msg = document.createElement('span');
            msg.className = 'error-message';
            msg.textContent = message;
            formGroup.appendChild(msg);
        }
    }

    // Fungsi untuk menghapus semua penanda error (TIDAK BERUBAH)
    function clearErrors() {
        // ... (Logika clearErrors yang sama)
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        const errorGroups = document.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => group.classList.remove('error'));
    }

    // Fungsi sederhana untuk memvalidasi format email (TIDAK BERUBAH)
    function isValidEmail(email) {
        // ... (Logika isValidEmail yang sama)
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});