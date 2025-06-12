document.addEventListener('DOMContentLoaded', () => {
    const lines = [
        "🌊 Sungai yang dulu bersih dan jadi sumber kehidupan, kini dipenuhi sampah dan tercemar. Ikan-ikan menghilang 🐟, airnya bau 😷, dan desa pun terdampak.",
        "✨ Tapi masih ada harapan.",
        "🧹 Tugasmu: kumpulkan sampah 🗑️, hindari rintangan ⚠️, dan pulihkan sungai sebelum semuanya terlambat ⏳.",
        "💪 Bersihkan sungai. 🌱 Selamatkan masa depan!"
    ];

    const container = document.getElementById('text-container');
    const nextButton = document.getElementById('btn-selanjutnya');
    const skipButton = document.getElementById('btn-skip');

    let currentLine = 0;
    let isSkipped = false;

    function typeLine(text, callback) {
        const p = document.createElement('p');
        p.className = 'text-line';
        container.appendChild(p);

        let i = 0;
        const typing = setInterval(() => {
            if (isSkipped) {
                clearInterval(typing);
                p.innerHTML = text;
                if (callback) callback();
                return;
            }
            if (i < text.length) {
                p.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                if (callback) callback();
            }
        }, 40);
    }

    function showNextLine() {
        if (currentLine < lines.length) {
            typeLine(lines[currentLine], () => {
                currentLine++;
                if (currentLine === lines.length) {
                    nextButton.style.display = 'block';
                } else {
                    setTimeout(showNextLine, 500);
                }
            });
        }
    }

    // Sembunyikan tombol selanjutnya di awal
    nextButton.style.display = 'none';

    // Jalankan animasi cutscene
    showNextLine();

    nextButton.addEventListener('click', () => {
        window.location.href = 'Penjelasan.html';
    });

    skipButton.addEventListener('click', () => {
        isSkipped = true;
        container.innerHTML = '';
        lines.forEach(line => {
            const p = document.createElement('p');
            p.className = 'text-line';
            p.innerHTML = line;
            container.appendChild(p);
        });
        nextButton.style.display = 'block';
    });
});
