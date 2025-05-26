document.addEventListener("DOMContentLoaded", function () {
    const btnSelanjutnya = document.getElementById("btn-selanjutnya");
    const volumeBtn = document.getElementById("volume-btn");
    const typedTextElement = document.getElementById("penjelasan");

    let volumeAktif = true;

    // Penjelasan dengan emoji & highlight
    const kalimat = [
        "👋 <b>Selamat datang di Mini Game <span style='color:#2196F3;'>Menangkap Sampah!</span></b>",
        "🗑️ <b>Tugasmu:</b> Tangkap semua <span style='color:#388e3c;'>sampah</span> yang jatuh dari atas sebelum menyentuh daratan.",
        "⚠️ <b>Hati-hati!</b> Jika ada sampah yang jatuh ke daratan, <span style='color:#e53935;'>nyawamu akan berkurang</span>.",
        "❤️ Kamu punya <b>3 nyawa</b> untuk menyelesaikan misi.",
        "🏆 Tangkap sebanyak mungkin sampah dan jadilah <span style='color:#fbc02d;'>pahlawan sungai!</span>",
        "🎮 <i>Siap? Klik tombol selanjutnya untuk bermain!</i>"
    ];

    // Efek typing per kalimat
    function tampilkanKalimat(index) {
        if (index >= kalimat.length) return;
        const p = document.createElement('p');
        p.style.opacity = 0;
        p.style.transition = "opacity 0.7s, transform 0.7s";
        p.style.transform = "translateY(20px)";
        p.innerHTML = "";
        typedTextElement.appendChild(p);

        let i = 0;
        function ketik() {
            if (i <= kalimat[index].length) {
                p.innerHTML = kalimat[index].slice(0, i);
                i++;
                setTimeout(ketik, 18);
            } else {
                setTimeout(() => {
                    p.style.opacity = 1;
                    p.style.transform = "translateY(0)";
                    setTimeout(() => tampilkanKalimat(index + 1), 500);
                }, 80);
            }
        }
        ketik();
    }

    // Mulai efek typing
    tampilkanKalimat(0);

    // Event tombol selanjutnya
    btnSelanjutnya.addEventListener("click", function () {
        window.location.href = "../MenangkapSampah/TangkapSampah.html";
    });

    // Event tombol volume
    volumeBtn.addEventListener("click", function () {
        volumeAktif = !volumeAktif;
        volumeBtn.src = volumeAktif ? "../../Asset/VolumeAktif.jpg" : "../../Asset/VolumeNonAktif.jpg";
    });

    // Tambahkan tombol "Lewati Penjelasan" agar user bisa langsung main
    if (!document.getElementById('btn-lewati')) {
        const btnLewati = document.createElement('button');
        btnLewati.id = 'btn-lewati';
        btnLewati.textContent = '⏩ Lewati Penjelasan';
        btnLewati.style.position = 'absolute';
        btnLewati.style.top = '30px';
        btnLewati.style.left = '50%';
        btnLewati.style.transform = 'translateX(-50%)';
        btnLewati.style.padding = '10px 22px';
        btnLewati.style.background = '#f44336';
        btnLewati.style.color = 'white';
        btnLewati.style.border = 'none';
        btnLewati.style.borderRadius = '20px';
        btnLewati.style.cursor = 'pointer';
        btnLewati.style.fontSize = '1rem';
        btnLewati.style.opacity = 0.9;
        btnLewati.style.zIndex = 1001;
        document.body.appendChild(btnLewati);

        btnLewati.addEventListener('click', () => {
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
