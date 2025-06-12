document.addEventListener('DOMContentLoaded', () => {
    const leaderboardTable = document.getElementById('leaderboard-table');
    const searchInput = document.getElementById('search-input');
    const tabButtons = document.querySelectorAll('.tab-btn');
    let currentGame = 'all';
    let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];

    function formatDate(date) {
        return new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    function renderTable(data) {
        leaderboardTable.innerHTML = '';
        if (data.length === 0) {
            leaderboardTable.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-message">
                        Belum ada data skor untuk ditampilkan
                    </td>
                </tr>`;
            return;
        }

        data.forEach((entry, index) => {
            const row = leaderboardTable.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span class="player-name">${entry.name}</span></td>
                <td><span class="score">${entry.score}</span></td>
                <td><span class="game-name">${entry.game}</span></td>
                <td><span class="date">${formatDate(entry.date || new Date())}</span></td>
            `;
        });
    }

    function filterData() {
        const searchTerm = searchInput.value.toLowerCase();
        let filtered = [...leaderboardData];

        if (currentGame !== 'all') {
            filtered = filtered.filter(entry => entry.game === currentGame);
        }

        if (searchTerm) {
            filtered = filtered.filter(entry =>
                entry.name.toLowerCase().includes(searchTerm) ||
                entry.game.toLowerCase().includes(searchTerm)
            );
        }

        filtered.sort((a, b) => b.score - a.score);
        renderTable(filtered);
    }

    // Tab button event listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentGame = button.dataset.game;
            filterData();
        });
    });

    // Search input event listener
    searchInput.addEventListener('input', filterData);

    // Initial render
    filterData();
});