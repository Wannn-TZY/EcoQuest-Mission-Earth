document.addEventListener("DOMContentLoaded", function () {
    const btnSelanjutnya = document.getElementById("btn-selanjutnya");
    const volumeBtn = document.getElementById("volume-btn");
    const typedTextElement = document.getElementById("typed-text");

    let volumeAktif = true;

    // Text to be typed
    const textToType = "Ini adalah game Pilah Sampah. Kamu diberikan nyawa sebanyak 3 untuk kesempatannya. Tujuan kamu adalah untuk memilah sampah yang berserakan untuk dimasukan kedalam keranjang sesuai dengan jenisnya. Kamu diberikan waktu selama 1 menit untuk memilahnya.";
    
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
        window.location.href = "PilahSampah.html";
    });

    // Event untuk tombol volume
    volumeBtn.addEventListener("click", function () {
        volumeAktif = !volumeAktif;
        volumeBtn.src = volumeAktif ? "../../Asset/VolumeAktif.jpg" : "../../Asset/VolumeNonAktif.jpg";
    });
});
