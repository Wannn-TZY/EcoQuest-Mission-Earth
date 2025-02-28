document.addEventListener("DOMContentLoaded", function () {
    const btnSelanjutnya = document.getElementById("btn-selanjutnya");
    const volumeBtn = document.getElementById("volume-btn");

    let volumeAktif = true;

    // Event untuk tombol selanjutnya
    btnSelanjutnya.addEventListener("click", function () {
        
        window.location.href = "../MenangkapSampah/TangkapSampah.html"; 
    });

    // Event untuk tombol volume
    volumeBtn.addEventListener("click", function () {
        volumeAktif = !volumeAktif;
        volumeBtn.src = volumeAktif ? "../../Asset/VolumeAktif.jpg" : "../../Asset/VolumeNonAktif.jpg";
    });
});
