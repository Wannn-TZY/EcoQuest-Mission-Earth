// Add this to a new file: src/utils/playerUtils.js

function savePlayerName(name) {
    localStorage.setItem('playerName', name);
}

function getPlayerName() {
    return localStorage.getItem('playerName') || '';
}

function checkPlayerName() {
    const name = getPlayerName();
    if (!name) {
        window.location.href = '../PilihPermainan/PilihPermainan.html';
        return false;
    }
    return true;
}

function simpanNamaPemain(nama) {
    localStorage.setItem('namaPemain', nama);
}

function ambilNamaPemain() {
    return localStorage.getItem('namaPemain') || '';
}

function simpanKeLeaderboard(score, game) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const newEntry = {
        name: ambilNamaPemain(),
        score,
        game,
        date: new Date().toISOString()
    };
    leaderboard.push(newEntry);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}