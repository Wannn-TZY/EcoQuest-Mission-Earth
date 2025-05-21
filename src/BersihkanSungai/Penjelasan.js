document.addEventListener("DOMContentLoaded", function () {
    const btnSelanjutnya = document.getElementById("btn-selanjutnya");
    const volumeBtn = document.getElementById("volume-btn");
    const typedTextElement = document.getElementById("typed-text");
    const kembali = document.getElementById("btn-kembali"); // Add this line

    let volumeAktif = true;
    let audio = new Audio("../../backsound/backsound-game1.mp3");
    audio.loop = true;
    audio.play();

    // Text to be typed
    const textToType = "Ini adalah game Bersihkan sungai. Kamu diberikan nyawa sebanyak 3 untuk kesempatannya. Tujuan kamu adalah untuk membersihkan sampah yang mengalir didalam sungai dan membuat sungai bersih kembali. Kamu diberikan waktu selama 1 menit untuk membersihkannya.";
    
    // Typing effect function
    function typeWriter(text, i = 0) {
        if (i < text.length) {
            typedTextElement.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 50); // Adjust speed here (50ms)
        }
    }

    // Start typing effect
    typeWriter(textToType);

    // Event untuk tombol selanjutnya
    btnSelanjutnya.addEventListener("click", function () {
        window.location.href = "bersihkansungai.html";
    });

    // Event untuk tombol kembali
    kembali.addEventListener("click", function() {
        // Add fade out effect
        document.querySelector('.game-container').style.opacity = 0;
        
        // Stop the audio before navigating
        audio.pause();
        audio.currentTime = 0;
        
        // Navigate back with delay for transition
        setTimeout(() => {
            window.location.href = "../PilihPermainan/PilihPermainan.html";
        }, );
    });

    // Event untuk tombol volume
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
});
