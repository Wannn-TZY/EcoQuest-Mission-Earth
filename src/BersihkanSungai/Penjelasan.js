document.addEventListener("DOMContentLoaded", function () {
    const btnSelanjutnya = document.getElementById("btn-selanjutnya");
    const volumeBtn = document.getElementById("volume-btn");
    const typedTextElement = document.getElementById("typed-text");
    const kembali = document.getElementById("btn-kembali");

    let volumeAktif = true;
    let audio = new Audio("../../backsound/backsound-game3.mp3");
    audio.loop = true;
    audio.play();

    // Kalimat penjelasan dengan emoji
    const kalimat = [
        "🧑‍🚀 Selamat datang di <b>EcoQuest: Bersihkan Sungai!</b>",
        "❤️ Kamu punya <b>3 nyawa</b> untuk menyelesaikan misi.",
        "🕒 Waktumu hanya <b>1 menit</b> untuk membersihkan sungai.",
        "🗑️ Kumpulkan semua <b>sampah</b> yang mengalir di sungai.",
        "⚠️ <b>Jangan sampai sampah terlewat</b> agar tidak kehilangan nyawa.",
        "🌊 Jadikan sungai bersih kembali dan selamatkan lingkungan!"
    ];

    let currentKalimat = 0;

    // Efek typing per kalimat dengan animasi fadeIn
    function tampilkanKalimat(index) {
        if (index >= kalimat.length) return;
        const p = document.createElement('p');
        p.style.opacity = 0;
        p.style.transition = "opacity 0.7s, transform 0.7s";
        p.style.transform = "translateY(20px)";
        p.innerHTML = ""; // Mulai kosong
        typedTextElement.appendChild(p);

        let i = 0;
        function ketik() {
            if (i <= kalimat[index].length) {
                p.innerHTML = kalimat[index].slice(0, i);
                i++;
                setTimeout(ketik, 30);
            } else {
                // Setelah selesai, fade in
                setTimeout(() => {
                    p.style.opacity = 1;
                    p.style.transform = "translateY(0)";
                    // Tampilkan kalimat berikutnya setelah jeda
                    setTimeout(() => tampilkanKalimat(index + 1), 700);
                }, 100);
            }
        }
        ketik();
    }

    // Mulai efek typing kalimat
    tampilkanKalimat(0);

    // Tombol selanjutnya
    btnSelanjutnya.addEventListener("click", function () {
        window.location.href = "bersihkansungai.html";
    });

    // Tombol kembali
    kembali.addEventListener("click", function() {
        document.querySelector('.game-container').style.opacity = 0;
        audio.pause();
        audio.currentTime = 0;
        setTimeout(() => {
            window.location.href = "../PilihPermainan/PilihPermainan.html";
        }, 300);
    });

    // Tombol volume
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

    // Fitur: tombol "Lewati Penjelasan"
    if (!document.getElementById('btn-lewati')) {
        const btnLewati = document.createElement('button');
        btnLewati.id = 'btn-lewati';
        btnLewati.textContent = '⏩ Lewati Penjelasan';
        btnLewati.style.position = 'fixed';
        btnLewati.style.top = '20px';
        btnLewati.style.right = '90px';
        btnLewati.style.zIndex = 1001;
        btnLewati.style.padding = '10px 22px';
        btnLewati.style.background = '#f44336';
        btnLewati.style.color = 'white';
        btnLewati.style.border = 'none';
        btnLewati.style.borderRadius = '20px';
        btnLewati.style.cursor = 'pointer';
        btnLewati.style.fontSize = '1rem';
        btnLewati.style.opacity = 0.85;
        document.body.appendChild(btnLewati);

        btnLewati.addEventListener('click', () => {
            // Tampilkan semua kalimat sekaligus dengan animasi
            typedTextElement.innerHTML = "";
            kalimat.forEach((kal, idx) => {
                const p = document.createElement('p');
                p.innerHTML = kal;
                p.style.opacity = 0;
                p.style.transition = "opacity 0.7s, transform 0.7s";
                p.style.transform = "translateY(20px)";
                typedTextElement.appendChild(p);
                setTimeout(() => {
                    p.style.opacity = 1;
                    p.style.transform = "translateY(0)";
                }, 100 + idx * 100);
            });
        });
    }
});
