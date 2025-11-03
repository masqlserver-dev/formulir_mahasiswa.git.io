<?php
// PASTIKAN XAMPP (Apache dan MySQL) SUDAH BERJALAN

// Tambahan untuk menampilkan error detil jika ada masalah lain
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// =================================================================
// 1. Konfigurasi Database (KOREKSI NAMA DATABASE)
// =================================================================
$servername = "localhost";
$username = "root"; // Default XAMPP
$password = "";     // Default XAMPP (kosong)
$dbname = "db_mahasiswa1"; // ***SUDAH DIKOREKSI SESUAI NAMA DATABASE ANDA***

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// =================================================================
// 2. Memproses Data POST dan INSERT ke Database
// =================================================================
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Ambil dan bersihkan data input (Mencegah SQL Injection)
    $nama_lengkap = $conn->real_escape_string($_POST['nama_lengkap']);
    $nim = $conn->real_escape_string($_POST['nim']);
    $email = $conn->real_escape_string($_POST['email']);
    $prodi = $conn->real_escape_string($_POST['prodi']);
    $jenis_kelamin = $conn->real_escape_string($_POST['jenis_kelamin']);
    $alamat = $conn->real_escape_string($_POST['alamat']);

    // Query SQL untuk INSERT data
    $sql = "INSERT INTO data_mahasiswa (nama_lengkap, nim, email, prodi, jenis_kelamin, alamat) 
            VALUES ('$nama_lengkap', '$nim', '$email', '$prodi', '$jenis_kelamin', '$alamat')";

    // Eksekusi Query
    if ($conn->query($sql) === TRUE) {
        // Jika berhasil, tampilkan pop-up sukses dan redirect kembali ke formulir
        echo "<script>alert('✅ Pendaftaran Berhasil! Data telah disimpan ke database.'); window.location.href='index.html';</script>";
    } else {
        // Jika gagal, tampilkan error dan redirect
        echo "<script>alert('❌ Error saat menyimpan data: " . $conn->error . "'); window.location.href='index.html';</script>";
    }
}

// Menutup koneksi
$conn->close();
?>