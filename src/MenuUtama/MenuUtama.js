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
        window.location.href = "../Storyboard/storyboard.html";
    });

    const suaraMenu = document.getElementById('suaraMenu');


});

document.addEventListener("DOMContentLoaded", function () {
    const volumeBtn = document.getElementById("volume-btn");
    const belajarBtn = document.getElementById("btn-belajar");
    const bermainBtn = document.getElementById("btn-bermain");
    const kembaliBtn = document.getElementById("btn-kembali");

    let volumeAktif = true; 
    const audio = new Audio("../../backsound/backsound-menu-utama.mp3"); 
    audio.loop = true;
    
    // Autoplay dengan handling untuk browser policy
    const playAudio = () => {
        audio.play().catch(error => {
            console.log("Autoplay prevented:", error);
            // Add click handler as fallback
            document.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    };

    playAudio(); // Try to play immediately
});