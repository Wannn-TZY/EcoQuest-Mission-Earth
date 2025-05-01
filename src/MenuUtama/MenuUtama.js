const volumeBtn = document.getElementById("volume-btn");
const bgMusic = document.getElementById("bg-music");

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

document.addEventListener("DOMContentLoaded", () => { 
    const StartBtn = document.getElementById("start-btn");
    StartBtn.addEventListener("click", () => {
        window.location.href = "../TampilanUtama/TampilanUtama.html";
    });

    const suaraMenu = document.getElementById('suaraMenu');


});