document.addEventListener("DOMContentLoaded", function () {
    const btnSelanjutnya = document.getElementById("btn-selanjutnya");
    const volumeBtn = document.getElementById("volume-btn");
    const typedTextElement = document.getElementById("penjelasan"); // Add this line

    let volumeAktif = true;

    // Text to be typed
    const textToType = "Ini adalah game Menangkap Sampah. Tujuan dari game ini adalah untuk menangkap sampah yang berjatuhan dari atas. Kamu diberikan nyawa sebanyak 3 kali kesempatan. Selamat bermain!";
    
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
        window.location.href = "../MenangkapSampah/TangkapSampah.html";
    });

    // Event untuk tombol volume
    volumeBtn.addEventListener("click", function () {
        volumeAktif = !volumeAktif;
        volumeBtn.src = volumeAktif ? "../../Asset/VolumeAktif.jpg" : "../../Asset/VolumeNonAktif.jpg";
    });
});
