document.addEventListener('DOMContentLoaded', () => {
    const lines = [
        "🌊 Sungai yang dulu bersih dan jadi sumber kehidupan, kini dipenuhi sampah dan tercemar. Ikan-ikan menghilang 🐟, airnya bau 😷, dan desa pun terdampak.",
        "✨ Tapi masih ada harapan.",
        "🧹 Tugasmu: kumpulkan sampah 🗑️, hindari rintangan ⚠️, dan pulihkan sungai sebelum semuanya terlambat ⏳.",
        "💪 Bersihkan sungai. 🌱 Selamatkan masa depan!"
    ];

    const container = document.getElementById('text-container');
    const nextButton = document.getElementById('btn-next');
    const skipButton = document.getElementById('btn-skip');

    let currentLine = 0;
    let isSkipped = false;

    nextButton.style.opacity = 0;

    function typeLine(text, callback) {
        let i = 0;
        const p = document.createElement('p');
        p.className = 'text-line';
        container.appendChild(p);

        const typing = setInterval(() => {
            if (isSkipped) {
                clearInterval(typing);
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
                setTimeout(showNextLine, 500);
            });
        } else {
            setTimeout(() => {
                nextButton.style.opacity = 1;
            }, 500);
        }
    }

    showNextLine();

    nextButton.addEventListener('click', () => {
        window.location.href = 'Penjelasan.html';
    });

    skipButton.addEventListener('click', () => {
        isSkipped = true;
        window.location.href = 'Penjelasan.html';
    });
});
