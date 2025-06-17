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
            const keterangan = getGradeDescription(entry.score);
            const row = leaderboardTable.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span class="player-name">${entry.name}</span></td>
                <td><span class="score">${entry.score}</span></td>
                <td><span class="game-name">${entry.game}</span></td>
                <td>${keterangan}</td>
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

    // Reset leaderboard functionality
    const resetButton = document.getElementById('reset-leaderboard');
    const resetModal = document.getElementById('reset-modal');
    const successModal = document.getElementById('success-modal');
    const confirmReset = document.getElementById('confirm-reset');
    const cancelReset = document.getElementById('cancel-reset');

    resetButton.addEventListener('click', () => {
        resetModal.style.display = 'block';
    });

    cancelReset.addEventListener('click', () => {
        resetModal.style.display = 'none';
    });

    confirmReset.addEventListener('click', () => {
        // Hapus data
        localStorage.removeItem('leaderboard');
        leaderboardData = [];
        filterData();

        // Tutup modal konfirmasi
        resetModal.style.display = 'none';
        
        // Tampilkan modal sukses
        successModal.style.display = 'block';
        
        // Mainkan sound effect (opsional)
        const successSound = new Audio('../../Asset/success-sound.mp3');
        successSound.play();
    });

    window.closeSuccessModal = function() {
        successModal.style.display = 'none';
    }

    // Tutup modal jika user klik di luar modal
    window.addEventListener('click', (e) => {
        if (e.target === resetModal) {
            resetModal.style.display = 'none';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    // Initial render
    filterData();
});

function getGradeDescription(score) {
  if (score >= 90 && score <= 300) {
    return "SANGAT LUAR BIASA. kamu cerdas";
  } else if (score >= 80 && score <= 89) {
    return "LUAR BIASA. kamu hebat";
  } else if (score >= 60 && score <= 79) {
    return "CUKUP BAGUS. kamu harus bisa";
  } else {
    return "CUKUP. kamu harus belajar lagi";
  }
}