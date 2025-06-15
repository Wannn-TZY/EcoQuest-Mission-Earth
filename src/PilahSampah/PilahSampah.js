const trashItems = [
    { type: 'organic', image: '../../Asset/Sampah1.jpg' },
    { type: 'inorganic', image: '../../Asset/Sampah2.jpg' },
    { type: 'organic', image: '../../Asset/Sampah3.jpg' },
    { type: 'organic', image: '../../Asset/Sampah4.jpg' },
    { type: 'dangerous', image: '../../Asset/Sampah5.jpg' },
    { type: 'dangerous', image: '../../Asset/Sampah6.jpg' },
];

let score = 0;
let lives = 3;
let timeLeft = 60;
let gameInterval;
let isGameOver = false;
let playerName = '';

function initGame() {
    updateUI();
    generateTrash(10);
    startTimer();
    setupDragAndDrop();
}

function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('time').textContent = timeLeft;
}

function generateTrash(count) {
    const gameArea = document.getElementById('game-area');
    const areaWidth = gameArea.offsetWidth - 60; // Adjusted margin
    const areaHeight = gameArea.offsetHeight;
    
    // Define safe zones
    const safeZoneTop = 100; // Space below status bar
    const safeZoneBottom = areaHeight - 70; // Increased space above bins
    const usableHeight = safeZoneBottom - safeZoneTop;
    
    // Create grid for better distribution
    const gridCols = 5;
    const gridRows = 4;
    const cellWidth = areaWidth / gridCols;
    const cellHeight = usableHeight / gridRows;
    
    for (let i = 0; i < 20; i++) { // Increased number of trash items
        const trash = trashItems[Math.floor(Math.random() * trashItems.length)];
        const trashElement = document.createElement('img');
        trashElement.src = trash.image;
        trashElement.className = 'trash-item';
        trashElement.dataset.type = trash.type;
        
        // Calculate grid-based random position
        const gridCol = Math.floor(Math.random() * gridCols);
        const gridRow = Math.floor(Math.random() * gridRows);
        
        // Add random offset within grid cell
        const offsetX = Math.random() * (cellWidth - 40);
        const offsetY = Math.random() * (cellHeight - 40);
        
        const posX = (gridCol * cellWidth) + offsetX + 30;
        const posY = (gridRow * cellHeight) + offsetY + safeZoneTop;
        
        trashElement.style.left = posX + 'px';
        trashElement.style.top = posY + 'px';
        
        gameArea.appendChild(trashElement);
    }
}

function setupDragAndDrop() {
    const trashElements = document.querySelectorAll('.trash-item');
    const bins = document.querySelectorAll('.bin');

    trashElements.forEach(trash => {
        trash.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
            e.target.setAttribute('dragging', 'true');
        });
        
        trash.addEventListener('dragend', e => {
            e.target.removeAttribute('dragging');
        });
        
        trash.setAttribute('draggable', true);
    });

    bins.forEach(bin => {
        bin.addEventListener('dragover', e => e.preventDefault());
        bin.addEventListener('drop', handleDrop);
    });
}

function handleDrop(e) {
    e.preventDefault();
    const trashType = e.dataTransfer.getData('text/plain');
    const binType = e.target.closest('.bin').id.split('-')[0];
    const draggedElement = document.querySelector('.trash-item[dragging="true"]');
    
    if (draggedElement) {
        // Remove the trash item regardless of correct/incorrect bin
        draggedElement.remove();
        
        if (trashType === binType) {
            score += 10;
            e.target.closest('.bin').style.transform = 'scale(1.1)';
            setTimeout(() => e.target.closest('.bin').style.transform = 'scale(1)', 200);
        } else {
            lives--;
            if (lives <= 0) {
                endGame('lose');
                return;
            }
        }
        
        updateUI();
        checkWinCondition();
    }
}

function startTimer() {
    gameInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame('lose');
        }
    }, 1000);
}

function checkWinCondition() {
    const remainingTrash = document.querySelectorAll('.trash-item').length;
    if (remainingTrash === 0) {
        endGame('win');
    }
}

function endGame(result) {
    clearInterval(gameInterval);
    isGameOver = true;

    if (result === 'win') {
        document.getElementById('final-score').textContent = score;
        document.getElementById('victory-popup').classList.remove('hidden');
        saveToLeaderboard(playerName, score, 'Pilah Sampah');
    } else {
        document.getElementById('final-score-lose').textContent = score;
        document.getElementById('gameover-popup').classList.remove('hidden');
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

function showNamePopup() {
    const overlay = document.createElement('div');
    overlay.className = 'name-popup-overlay';
    overlay.innerHTML = `
        <div class="name-popup">
            <h2>Masukkan Nama Kamu</h2>
            <input type="text" id="player-name" placeholder="Masukkan nama..." maxlength="15">
            <button onclick="startGameWithName()">Mulai Bermain</button>
        </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('player-name').focus();
}

function startGameWithName() {
    const nameInput = document.getElementById('player-name');
    if (nameInput.value.trim() === '') {
        alert('Nama tidak boleh kosong!');
        return;
    }
    
    playerName = nameInput.value.trim();
    document.querySelector('.name-popup-overlay').remove();
    initGame();
}

// Modify your popup close handlers
document.querySelectorAll('#play-again, #play-again-lose, #back-to-menu, #back-to-menu-lose').forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        popup.classList.add('fade-out');
        setTimeout(() => {
            if (button.id.includes('back-to-menu')) {
                window.location.href = '../PilihPermainan/PilihPermainan.html';
            } else {
                location.reload();
            }
        }, 500);
    });
});

// Start the game when the page loads
window.addEventListener('load', showNamePopup);