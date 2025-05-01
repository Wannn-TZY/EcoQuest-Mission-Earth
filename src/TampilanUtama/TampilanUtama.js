document.addEventListener("DOMContentLoaded", function () {
    const volumeBtn = document.getElementById("volume-btn");
    const kembaliBtn = document.getElementById("btn-kembali");
    const belajarBtn = document.getElementById("btn-belajar");
    const bermainBtn = document.getElementById("btn-bermain");

    let volumeAktif = true; 
    let audio = new Audio("../../backsound/backsound-menu-utama.mp3"); 
    audio.loop = true;
    audio.play(); 


    volumeBtn.addEventListener("click", function () {
        volumeAktif = !volumeAktif;
        if (volumeAktif) {
            audio.play();
            volumeBtn.src = "../../Asset/VolumeAktif.jpg";
        } else {
            audio.pause();
            volumeBtn.src = "../../Asset/VolumeNonAktif.jpg";
        }
    });

    kembaliBtn.addEventListener("click", function () {
        window.location.href = "../MenuUtama/MenuUtama.html";
    });

    // Tombol masuk ke halaman belajar
    belajarBtn.addEventListener("click", function () {
        window.location.href = "../Belajar/Halaman1.html";
    });

    // Tombol masuk ke halaman bermain
    bermainBtn.addEventListener("click", function () {
        window.location.href = "../PilihPermainan/PilihPermainan.html";
    });
});
