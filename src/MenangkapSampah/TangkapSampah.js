document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = new Audio('../../backsound/backsound-game2.mp3');
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

    
    const trashBin = document.getElementById('trash-bin');
    const gameArea = document.getElementById('game-area');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const livesElement = document.getElementById('lives');
    const victoryPopup = document.getElementById('victory-popup');
    
    let score = 0;
    let lives = 3;
    let timer = 15;
    let gameInterval;
    let isGameRunning = true;
    let playerName = '';
    let gameInitialized = false; // Add flag to track if game has been initialized
    let spawnInterval; // Move this declaration to the top

    // Initialize game
    function initGame() {
        if (!playerName) {
            showNamePopup();
            return;
        }

        if (!gameInitialized) {
            score = 0;
            lives = 3;
            timer = 15;
            isGameRunning = true;
            updateUI();
            startTimer();
            
            // Start spawning trash only after game is initialized
            spawnInterval = setInterval(() => {
                if (isGameRunning) spawnTrash();
            }, 1000);
            
            gameInitialized = true;
        }
    }

    function updateUI() {
        document.getElementById('score').textContent = score;
        document.getElementById('lives').textContent = lives;
        document.getElementById('timer').textContent = timer;
    }

    function startTimer() {
        clearInterval(gameInterval); // Clear any existing interval first
        gameInterval = setInterval(() => {
            if (isGameRunning) {
                if (timer > 0) {
                    timer--;
                    updateUI();
                    
                    // Check victory condition when timer reaches 0
                    if (timer === 0 && lives > 0) {
                        endGame('victory');
                    }
                } else {
                    clearInterval(gameInterval);
                }
            }
        }, 1000);
    }

    // Update the endGame function to handle both victory and game over
    function endGame(reason) {
        isGameRunning = false;
        clearInterval(gameInterval);
        
        if (reason === 'victory' && lives > 0) {
            showVictoryPopup();
        } else if (reason === 'lives') {
            showGameOverPopup();
        }
    }

    function showVictoryPopup() {
        const popup = document.getElementById('victory-popup');
        const finalScoreElement = document.getElementById('final-score');
        finalScoreElement.textContent = score;
        popup.classList.remove('hidden');
        saveToLeaderboard(playerName, score, 'Menangkap Sampah');
    }

    function showGameOverPopup() {
        const popup = document.getElementById('gameover-popup');
        const finalScoreElement = document.getElementById('final-score-lose');
        finalScoreElement.textContent = score;
        popup.classList.remove('hidden');
    }

    // Update resetGame function to clear all intervals
    function resetGame() {
        // Clear existing spawn interval if it exists
        if (spawnInterval) {
            clearInterval(spawnInterval);
        }

        score = 0;
        lives = 3;
        timer = 15;
        isGameRunning = true;
        
        // Clear all trash elements
        const trashElements = document.querySelectorAll('.trash');
        trashElements.forEach(trash => trash.remove());
        
        // Hide victory popup if it's showing
        document.getElementById('victory-popup').classList.add('hidden');
        
        // Update UI and restart timer
        updateUI();
        startTimer();

        // Restart trash spawning
        spawnInterval = setInterval(() => {
            if (isGameRunning) spawnTrash();
        }, 1000);
    }

    // Event listeners
    document.getElementById('play-again').addEventListener('click', () => {
        document.getElementById('victory-popup').classList.add('hidden');
        resetGame();
    });

    document.getElementById('back-to-menu').addEventListener('click', () => {
        window.location.href = '../PilihPermainan/PilihPermainan.html';
    });

    // Event listeners for game over popup buttons
    document.getElementById('play-again-lose').addEventListener('click', () => {
        document.getElementById('gameover-popup').classList.add('hidden');
        resetGame();
    });

    document.getElementById('back-to-menu-lose').addEventListener('click', () => {
        window.location.href = '../PilihPermainan/PilihPermainan.html';
    });

     document.getElementById('leaderboard').addEventListener('click', () => {
        window.location.href = '../LeaderboardPermainan/Leaderboard.html';
    });

    document.getElementById('leader-board').addEventListener('click', () => {
        window.location.href = '../LeaderboardPermainan/Leaderboard.html';
    });


    // Check lives
    function decreaseLives() {
        lives--;
        updateUI();
        if (lives <= 0) {
            endGame('lives');
        }
    }

    let trashBinX = gameArea.clientWidth / 2; // Posisi awal tempat sampah
    const trashBinSpeed = 20; // Kecepatan tempat sampah

    // Fungsi untuk mendapatkan lebar area game yang selalu diperbarui
    function getGameWidth() {
        return gameArea.clientWidth;
    }

    // Pergerakan tempat sampah dengan mouse
    gameArea.addEventListener('mousemove', (e) => {
        if (!isGameRunning) return;
    
        const rect = gameArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const newPosition = mouseX - (trashBin.offsetWidth / 2);
        
        // Batasi pergerakan agar tidak keluar dari area permainan
        trashBinX = Math.max(0, Math.min(newPosition, gameArea.offsetWidth - trashBin.offsetWidth));
        trashBin.style.left = `${trashBinX}px`; // Fixed template literal
    });


    // Pergerakan tempat sampah dengan keyboard, termasuk tombol A, D, dan panah
    document.addEventListener('keydown', (e) => {
        if (!isGameRunning) return;

        const gameWidth = getGameWidth();

        console.log("Tombol ditekan:", e.key); // Debugging untuk memastikan tombol ditekan

        if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
            trashBinX = Math.max(0, trashBinX - trashBinSpeed);
        } else if (['ArrowRight', 'd', 'D'].includes(e.key)) {
            trashBinX = Math.min(gameWidth - trashBin.clientWidth, trashBinX + trashBinSpeed);
        }

        trashBin.style.left = `${trashBinX}px`; // Fixed template literal
    });


    // Pergerakan tempat sampah dengan touchpad atau layar sentuh, memastikan responsif

    gameArea.addEventListener('touchmove', (e) => {
        if (!isGameRunning) return;

        const rect = gameArea.getBoundingClientRect();
        let touchX = e.touches[0].clientX - rect.left - trashBin.clientWidth / 2;

        trashBinX = Math.max(0, Math.min(touchX, rect.width - trashBin.clientWidth));
        trashBin.style.left = `${trashBinX}px`; // Fixed template literal

        e.preventDefault(); // Mencegah scrolling di perangkat sentuh
    });

    // Update the fall interval in spawnTrash function
    function spawnTrash() {
        if (!isGameRunning) return;

        const trash = document.createElement('img');
        trash.src = `../../Asset/Sampah${Math.floor(Math.random() * 4) + 1}.jpg`; // Fixed template literal
        trash.className = 'trash';

        const minX = 0;
        const maxX = getGameWidth() - 50;
        const randomX = Math.random() * (maxX - minX) + minX;

        trash.style.left = `${randomX}px`; // Fixed template literal
        trash.style.top = '-50px';
        gameArea.appendChild(trash);

        let pos = -50;
        const fall = setInterval(() => {
            if (!isGameRunning) {
                clearInterval(fall);
                trash.remove();
                return;
            }

            pos += 5;
            trash.style.top = `${pos}px`; // Fixed template literal

            const trashRect = trash.getBoundingClientRect();
            const binRect = trashBin.getBoundingClientRect();
            const gameAreaRect = gameArea.getBoundingClientRect();

            // Check if trash is caught in the bin
            if (
                trashRect.bottom >= binRect.top &&
                trashRect.top <= binRect.bottom &&
                trashRect.left < binRect.right &&
                trashRect.right > binRect.left
            ) {
                // Trash caught successfully
                score += 10;
                updateUI();
                trash.remove();
                clearInterval(fall);
            } 
            // Check if trash passed the bottom of game area
            else if (pos > gameAreaRect.height) {
                decreaseLives();
                trash.remove();
                clearInterval(fall);

                // Check if game should end due to no lives left
                if (lives <= 0) {
                    endGame('lives');
                }
            }
        }, 50);
    }

    // Modify startGameWithName function
    window.startGameWithName = function() {
        const nameInput = document.getElementById('player-name');
        if (nameInput.value.trim() === '') {
            alert('Nama tidak boleh kosong!');
            return;
        }
        
        playerName = nameInput.value.trim();
        document.querySelector('.name-popup-overlay').remove();
        gameInitialized = false;
        initGame(); // Start game after name is entered
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

    // Show name popup immediately
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