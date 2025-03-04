document.addEventListener('DOMContentLoaded', function() {
    const btnKembali = document.getElementById("btn-kembali");
    const btnKembaliBelajar = document.getElementById("btn-KembaliBelajar");

    btnKembali.addEventListener('click', function() { 
        window.location.href = '../TampilanUtama/TampilanUtama.html';
    });

    btnKembaliBelajar.addEventListener('click', function() { 
        window.location.href = 'Halaman2.html';
    });
});