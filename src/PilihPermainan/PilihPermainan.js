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
    const audio = new Audio("../../backsound/backsound-pilihan.mp3");
    audio.loop = true;
    
    const playAudio = () => {
        audio.play().catch(error => {
            console.log("Autoplay prevented:", error);
            document.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    };

    playAudio();

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

    function showNameInput() {
        const overlay = document.createElement('div');
        overlay.className = 'name-popup-overlay';
        overlay.innerHTML = `
            <div class="name-popup">
                <h2>Selamat Datang di EcoQuest!</h2>
                <input type="text" 
                       id="player-name" 
                       placeholder="Masukkan nama kamu..." 
                       maxlength="15"
                       value="${localStorage.getItem('playerName') || ''}">
                <button id="start-btn" disabled>Mulai Petualangan</button>
            </div>
        `;
        document.body.appendChild(overlay);
        
        const nameInput = document.getElementById('player-name');
        const startBtn = document.getElementById('start-btn');
        
        nameInput.addEventListener('input', () => {
            const name = nameInput.value.trim();
            startBtn.disabled = name.length < 3;
        });
        
        startBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (name.length >= 3) {
                localStorage.setItem('playerName', name);
                overlay.remove();
            }
        });

        nameInput.focus();
    }

    // Check if player name exists
    if (!localStorage.getItem('playerName')) {
        showNameInput();
    }

    // Navigasi ke masing-masing game
    btnBersihkanSungai.addEventListener("click", function () {
        if (localStorage.getItem('playerName')) {
            window.location.href = "../BersihkanSungai/cutscene.html";
        } else {
            showNameInput();
        }
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

    if (!localStorage.getItem('namaPemain')) {
        showLoginPopup();
    }

    function showLoginPopup() {
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        overlay.innerHTML = `
            <div class="popup-content">
                <h2 class="popup-title">Selamat Datang di EcoQuest!</h2>
                <input type="text" 
                       class="popup-input"
                       id="nama-pemain" 
                       placeholder="Masukkan nama kamu..." 
                       maxlength="15">
                <button id="mulai-btn" class="popup-button" disabled>Mulai Petualangan</button>
            </div>
        `;
        document.body.appendChild(overlay);

        const namaInput = document.getElementById('nama-pemain');
        const mulaiBtn = document.getElementById('mulai-btn');

        namaInput.addEventListener('input', () => {
            const nama = namaInput.value.trim();
            mulaiBtn.disabled = nama.length < 3;
        });

        mulaiBtn.addEventListener('click', () => {
            const nama = namaInput.value.trim();
            if (nama.length >= 3) {
                localStorage.setItem('namaPemain', nama);
                overlay.remove();
            }
        });
    }
});
