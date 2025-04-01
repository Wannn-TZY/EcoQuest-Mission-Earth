document.addEventListener('DOMContentLoaded', () => {
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
        
        // Calculate position within river area (70vh from bottom)
        const riverHeight = window.innerHeight * 0.6; // 70vh in pixels
        const padding = 50; // Padding to keep sampah fully within river
        const minY = window.innerHeight - riverHeight + padding; // Top boundary with padding
        const maxY = window.innerHeight - padding; // Bottom boundary with padding
        const yPos = minY + (Math.random() * (maxY - minY));
        
        sampah.style.top = `${yPos}px`;
        sampah.style.right = '-50px'; // Start from right side
        sampah.style.left = 'auto'; // Clear left position
        
        gameContainer.appendChild(sampah);

        sampah.addEventListener('click', () => {
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
            gameContainer.removeChild(sampah);
        });

        let xPos = gameContainer.offsetWidth + 50; // Start beyond right edge
        const speed = 3;
        
        const moveInterval = setInterval(() => {
            xPos -= speed; // Move left instead of right
            sampah.style.right = `${gameContainer.offsetWidth - xPos}px`;

            // Check if sampah has reached the left edge
            if (xPos < -50) {
                if (gameContainer.contains(sampah)) {
                    gameContainer.removeChild(sampah);
                    updateLives();
                }
                clearInterval(moveInterval);
            }
        }, 50);
    }

    let gameTimer = 60;
    let isGameActive = true;

    function showVictoryPopup() {
        const popup = document.getElementById('victory-popup');
        document.getElementById('final-score').textContent = score;
        popup.classList.remove('hidden');
    }

    function showGameOverPopup() {
        const popup = document.getElementById('gameover-popup');
        document.getElementById('final-score-lose').textContent = score;
        popup.classList.remove('hidden');
    }

    function resetGame() {
        // Reset game variables
        score = 0;
        lives = 3;
        gameTimer = 60;
        isGameActive = true;
        
        // Reset displays
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById('lives').textContent = `Lives: ${lives}`;
        document.getElementById('timer').textContent = `Time: ${gameTimer}`;
        
        // Hide popups
        document.getElementById('victory-popup').classList.add('hidden');
        document.getElementById('gameover-popup').classList.add('hidden');
        
        // Clear and restart the game
        clearInterval(gameInterval);
        startGame();
    }

    // Event listeners for popup buttons
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

    function startGame() {
        // Reset game state
        score = 0;
        lives = 3;
        timeLeft = 60;
        gameTimer = 60;
        isGameActive = true;
        
        // Update display
        scoreElement.textContent = `Score: ${score}`;
        livesElement.textContent = `Lives: ${lives}`;
        timerElement.textContent = `Time: ${timeLeft}`;
        
        // Clear any existing intervals
        if (gameInterval) clearInterval(gameInterval);
        if (timerInterval) clearInterval(timerInterval);
        
        // Start spawning sampah
        gameInterval = setInterval(createSampah, 2000);
        
        // Start timer
        timerInterval = setInterval(() => {
            if (isGameActive) {
                timeLeft--;
                timerElement.textContent = `Time: ${timeLeft}`;
                
                // Victory condition
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
        
        // Remove all existing sampah
        const allSampah = document.querySelectorAll('.sampah');
        allSampah.forEach(sampah => gameContainer.removeChild(sampah));
    }

    startGame();
});