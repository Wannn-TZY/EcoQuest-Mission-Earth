document.addEventListener("DOMContentLoaded", function() {
    const btnKembali = document.getElementById("btn-kembali");
    const btnSelanjutnya = document.getElementById("btn-SelanjutnyaBelajar");

    btnKembali.addEventListener("click", function() {
        window.location.href = "../TampilanUtama/TampilanUtama.html"; 
    });

    btnSelanjutnya.addEventListener("click", function() {
        window.location.href = "Halaman2.html"; 
    });
});
