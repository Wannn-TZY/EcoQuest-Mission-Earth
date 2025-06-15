document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = new Audio('../../backsound/backsound-game1.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;

    backgroundMusic.addEventListener('error', (e) => {
        console.log('Error loading audio:', e);
    });

    backgroundMusic.addEventListener('canplaythrough', () => {
        console.log('Audio sudah siap diputar');
    });

    document.addEventListener('click', function initAudio() {
        playBackgroundMusic();
        document.removeEventListener('click', initAudio);
    }, { once: true });

    const gameContainer = document.getElementById('gameContainer');
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const timerElement = document.getElementById('timer');

    let score = 0;
    let lives = 3;
    let timeLeft = 60;
    let gameInterval;
    let timerInterval;

    const sampahImages = [
        '../../Asset/Sampah1.jpg',
        '../../Asset/Sampah2.jpg',
        '../../Asset/Sampah3.jpg',
        '../../Asset/Sampah4.jpg'
    ];

    function createSampah() {
        const sampah = document.createElement('img');
        sampah.className = 'sampah';
        sampah.src = sampahImages[Math.floor(Math.random() * sampahImages.length)];
        
        const riverHeight = window.innerHeight * 0.6;
        const padding = 50;
        const minY = window.innerHeight - riverHeight + padding;
        const maxY = window.innerHeight - padding;
        const yPos = minY + (Math.random() * (maxY - minY));
        
        sampah.style.top = `${yPos}px`;
        sampah.style.right = '-50px';
        sampah.style.left = 'auto';
        
        gameContainer.appendChild(sampah);

        sampah.addEventListener('click', () => {
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
            gameContainer.removeChild(sampah);
        });

        let xPos = gameContainer.offsetWidth + 50;
        const speed = 5;
        
        const moveInterval = setInterval(() => {
            xPos -= speed;
            sampah.style.right = `${gameContainer.offsetWidth - xPos}px`;

            if (xPos < -50) {
                if (gameContainer.contains(sampah)) {
                    gameContainer.removeChild(sampah);
                    updateLives();
                }
                clearInterval(moveInterval);
            }
        }, 50);
    }

    function showVictoryPopup() {
        const popup = document.getElementById('victory-popup');
        popup.classList.add('show');
        document.querySelector('#victory-popup .popup-score').textContent = score;
        saveToLeaderboard(playerName, score, 'Bersihkan Sungai');
    }

    function showGameOverPopup() {
        const popup = document.getElementById('gameover-popup');
        popup.classList.add('show');
        document.querySelector('#gameover-popup .popup-score').textContent = score;
    }

    function resetGame() {
        score = 0;
        lives = 3;
        gameTimer = 60;
        isGameActive = true;
        
        backgroundMusic.volume = 0.5;
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
        
        scoreElement.textContent = `Score: ${score}`;
        livesElement.textContent = `Lives: ${lives}`;
        timerElement.textContent = `Time: ${gameTimer}`;
        
        document.getElementById('victory-popup').classList.remove('show');
        document.getElementById('gameover-popup').classList.remove('show');
        
        clearInterval(gameInterval);
        startGame();
    }

    document.getElementById('play-again').addEventListener('click', resetGame);
    document.getElementById('play-again-lose').addEventListener('click', resetGame);
    document.getElementById('back-to-menu').addEventListener('click', () => {
        window.location.href = '../PilihPermainan/PilihPermainan.html';
    });
    document.getElementById('back-to-menu-lose').addEventListener('click', () => {
        window.location.href = '../PilihPermainan/PilihPermainan.html';
    });

    function updateLives() {
        lives--;
        livesElement.textContent = `Lives: ${lives}`;
        if (lives <= 0) {
            showGameOverPopup();
            endGame();
        }
    }

    let playerName = '';

    window.startGameWithName = function() {
        const nameInput = document.getElementById('player-name');
        if (nameInput.value.trim() === '') {
            alert('Nama tidak boleh kosong!');
            return;
        }
        
        playerName = nameInput.value.trim();
        document.querySelector('.name-popup-overlay').remove();
        startGame();
    }

    function showNamePopup() {
        const overlay = document.createElement('div');
        overlay.className = 'name-popup-overlay';
        overlay.innerHTML = `
            <div class="name-popup">
                <h2>Masukkan Nama Kamu</h2>
                <input type="text" id="player-name" placeholder="Masukkan nama..." maxlength="15">
                <button onclick="window.startGameWithName()">Mulai Bermain</button>
            </div>
        `;
        document.body.appendChild(overlay);
        document.getElementById('player-name').focus();
    }

    function startGame() {
        score = 0;
        lives = 3;
        timeLeft = 10;
        gameTimer = 10;
        isGameActive = true;
        
        scoreElement.textContent = `Score: ${score}`;
        livesElement.textContent = `Lives: ${lives}`;
        timerElement.textContent = `Time: ${timeLeft}`;
        
        if (gameInterval) clearInterval(gameInterval);
        if (timerInterval) clearInterval(timerInterval);
        
        gameInterval = setInterval(createSampah, 2000);
        
        timerInterval = setInterval(() => {
            if (isGameActive) {
                timeLeft--;
                timerElement.textContent = `Time: ${timeLeft}`;
                if (timeLeft <= 0 && lives > 0) {
                    showVictoryPopup();
                    endGame();
                }
            }
        }, 1000);
    }

    function endGame() {
        isGameActive = false;
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        
        const fadeOut = setInterval(() => {
            if (backgroundMusic.volume > 0.1) {
                backgroundMusic.volume -= 0.1;
            } else {
                backgroundMusic.pause();
                backgroundMusic.volume = 0.5;
                clearInterval(fadeOut);
            }
        }, 100);
        
        const allSampah = document.querySelectorAll('.sampah');
        allSampah.forEach(sampah => gameContainer.removeChild(sampah));
    }

    function playBackgroundMusic() {
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("Musik berhasil diputar");
                })
                .catch(error => {
                    console.log("Musik gagal diputar:", error);
                });
        }
    }

    function saveToLeaderboard(name, score, game) {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        const newEntry = {
            name,
            score,
            game,
            date: new Date().toISOString()
        };
        leaderboard.push(newEntry);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }

    // BACKSOUND OTOMATIS
    const backsound = new Audio('bs.mp3');
    backsound.loop = true;
    backsound.volume = 0.5;
    backsound.play().catch(() => {
        document.body.addEventListener('click', () => {
            backsound.play();
        }, { once: true });
    });

    showNamePopup();
});
