window.onload = function () {
    console.log("Halaman sudah dimuat sepenuhnya!");
    
    const trashBin = document.getElementById('trash-bin');
    const gameArea = document.getElementById('game-area');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const livesElement = document.getElementById('lives');
    const victoryPopup = document.getElementById('victory-popup');
    
    let score = 0;
    let lives = 3;
    let timeLeft = 60;
    let gameActive = true;
    let trashBinX = gameArea.clientWidth / 2; // Posisi awal tempat sampah
    const trashBinSpeed = 20; // Kecepatan tempat sampah

    // Fungsi untuk mendapatkan lebar area game yang selalu diperbarui
    function getGameWidth() {
        return gameArea.clientWidth;
    }

    // Pergerakan tempat sampah dengan mouse
    gameArea.addEventListener('mousemove', (e) => {
        if (!gameActive) return;
    
        const rect = gameArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const newPosition = mouseX - (trashBin.offsetWidth / 2);
        
        // Batasi pergerakan agar tidak keluar dari area permainan
        trashBinX = Math.max(0, Math.min(newPosition, gameArea.offsetWidth - trashBin.offsetWidth));
        trashBin.style.left = `${trashBinX}px`;
    });


    // Pergerakan tempat sampah dengan keyboard, termasuk tombol A, D, dan panah
    document.addEventListener('keydown', (e) => {
        if (!gameActive) return;

        const gameWidth = getGameWidth();

        console.log("Tombol ditekan:", e.key); // Debugging untuk memastikan tombol ditekan

        if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
            trashBinX = Math.max(0, trashBinX - trashBinSpeed);
        } else if (['ArrowRight', 'd', 'D'].includes(e.key)) {
            trashBinX = Math.min(gameWidth - trashBin.clientWidth, trashBinX + trashBinSpeed);
        }

        trashBin.style.left = `${trashBinX}px`;
    });


    // Pergerakan tempat sampah dengan touchpad atau layar sentuh, memastikan responsif

    gameArea.addEventListener('touchmove', (e) => {
        if (!gameActive) return;

        const rect = gameArea.getBoundingClientRect();
        let touchX = e.touches[0].clientX - rect.left - trashBin.clientWidth / 2;

        trashBinX = Math.max(0, Math.min(touchX, rect.width - trashBin.clientWidth));
        trashBin.style.left = `${trashBinX}px`;

        e.preventDefault(); // Mencegah scrolling di perangkat sentuh
    });

    // Fungsi untuk menjatuhkan sampah secara acak
    function spawnTrash() {
        if (!gameActive) return;

        const trash = document.createElement('img');
        trash.src = `../../Asset/Sampah${Math.floor(Math.random() * 4) + 1}.jpg`;
        trash.className = 'trash';

        const minX = 0;
        const maxX = getGameWidth() - 50;
        const randomX = Math.random() * (maxX - minX) + minX;

        trash.style.left = `${randomX}px`;
        trash.style.top = '-50px';
        gameArea.appendChild(trash);

        let pos = -50;
        const fall = setInterval(() => {
            if (!gameActive) {
                clearInterval(fall);
                return;
            }

            pos += 5;
            trash.style.top = `${pos}px`;

            const trashRect = trash.getBoundingClientRect();
            const binRect = trashBin.getBoundingClientRect();
            const gameAreaRect = gameArea.getBoundingClientRect();

            // Cek apakah sampah sudah melewati batas bawah area permainan
            if (pos > gameAreaRect.height) {
                lives--;
                livesElement.textContent = lives;
                trash.remove();
                clearInterval(fall);
                checkGameOver();
            } else if (
                trashRect.bottom >= binRect.top &&
                trashRect.top <= binRect.bottom &&
                trashRect.left < binRect.right &&
                trashRect.right > binRect.left
            ) {
                // Sampah tertangkap
                score += 10;
                scoreElement.textContent = score;
                trash.remove();
                clearInterval(fall);
            }
        }, 50);
    }

    // Timer
    const timer = setInterval(() => {
        if (!gameActive) return;
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) endGame(true);
    }, 1000);

    // Spawn sampah setiap detik
    const spawnInterval = setInterval(() => {
        if (gameActive) spawnTrash();
    }, 1000);

    function checkGameOver() {
        if (lives <= 0) {
            endGame(false);
        }
    }

    function endGame(victory) {
        gameActive = false;
        clearInterval(timer);
        clearInterval(spawnInterval);
        
        if (victory) {
            document.getElementById('final-score').textContent = score;
            victoryPopup.classList.remove('hidden');
        } else {
            window.location.href = 'gameover.html';
        }
    }

    // Tombol kembali ke menu
    document.getElementById('btn-kembali').addEventListener('click', () => {
        window.location.href = '../PilihPermainan/PilihPermainan.html';
    });
};
