document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen tombol
    const btnVolume = document.getElementById("btn-volume");
    const btnKembali = document.getElementById("btn-kembali");
    const btnBersihkanSungai = document.getElementById("btn-bersihkansungai");
    const btnMemilihSampah = document.getElementById("btn-memilihsampah");
    const btnTangkapSampah = document.getElementById("btn-tangkapsampah");
    const btnPilahSampah = document.getElementById("btn-pilahsampah");

    // Variabel status 
    let volumeAktif = true;
    let audio = new Audio("../../backsound/backsound-pilihan.mp3");
    audio.loop = true;
    audio.play();

    // Fungsi untuk mengaktifkan / menonaktifkan volume
    btnVolume.addEventListener("click", function () {
        volumeAktif = !volumeAktif;
        if (volumeAktif) {
            audio.play();
            btnVolume.src = "../../Asset/VolumeAktif.jpg";
        } else {
            audio.pause();
            btnVolume.src = "../../Asset/VolumeNonAktif.jpg";
        }
    });

    // Navigasi tombol kembali
    btnKembali.addEventListener("click", function () {
        window.location.href = "../TampilanUtama/TampilanUtama.html";
    });

    // Navigasi ke masing-masing game
    btnBersihkanSungai.addEventListener("click", function () {
        window.location.href = "../BersihkanSungai/cutscene.html";
    });


    btnTangkapSampah.addEventListener("click", function () {
        window.location.href = "../MenangkapSampah/cutscene.html";
    });

    btnPilahSampah.addEventListener("click", function () {
        window.location.href = "../PilahSampah/cutscene.html";
    });

    // Efek hover untuk membuat tombol lebih interaktif
    const buttons = [btnVolume, btnKembali, btnBersihkanSungai, btnMemilihSampah, btnTangkapSampah, btnPilahSampah];

    
    buttons.forEach(button => {
        button.addEventListener("mouseover", function () {
            this.style.transform = this.classList.contains('tangkapsampah') 
                ? 'translateX(-50%) scale(1.1)' 
                : 'scale(1.1)';
            this.style.transition = "transform 0.2s ease-in-out";
        });

        button.addEventListener("mouseout", function () {
            this.style.transform = this.classList.contains('tangkapsampah')
                ? 'translateX(-50%) scale(1)'
                : 'scale(1)';
        });

        button.addEventListener("mousedown", function () {
            this.style.transform = this.classList.contains('tangkapsampah')
                ? 'translateX(-50%) scale(0.9)'
                : 'scale(0.9)';
        });

        button.addEventListener("mouseup", function () {
            this.style.transform = this.classList.contains('tangkapsampah')
                ? 'translateX(-50%) scale(1.1)'
                : 'scale(1.1)';
        });
    });
});
