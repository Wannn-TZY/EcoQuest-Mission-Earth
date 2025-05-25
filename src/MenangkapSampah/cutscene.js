document.addEventListener('DOMContentLoaded', () => {
    const lines = [
        "🌤️ Sampah-sampah mulai berjatuhan dari atas ke sungai dan daratan!",
        "🧺 Tugasmu adalah menangkap sampah dengan jaring sebelum sampah jatuh ke daratan.",
        "⚡️ Hati-hati! Jangan sampai sampah jatuh ke daratan, karena itu akan mengurangi nyawamu.",
        "⏱️ Tangkap sebanyak mungkin sampah dalam waktu yang terbatas untuk menjaga lingkungan tetap bersih!",
        "🌟 Siap jadi pahlawan sungai? Ayo mulai petualanganmu sekarang!"
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
        p.style.opacity = 0;
        p.style.transition = "opacity 0.6s, transform 0.6s";
        p.style.transform = "translateY(20px)";
        container.appendChild(p);

        function typingEffect() {
            if (isSkipped) {
                p.innerHTML = text;
                p.style.opacity = 1;
                p.style.transform = "translateY(0)";
                if (callback) callback();
                return;
            }
            if (i <= text.length) {
                p.innerHTML = text.slice(0, i);
                p.style.opacity = 1;
                p.style.transform = "translateY(0)";
                i++;
                setTimeout(typingEffect, 22);
            } else {
                if (callback) callback();
            }
        }
        typingEffect();
    }

    function showNextLine() {
        if (currentLine < lines.length) {
            typeLine(lines[currentLine], () => {
                currentLine++;
                setTimeout(showNextLine, 750);
            });
        } else {
            setTimeout(() => {
                nextButton.style.opacity = 1;
            }, 400);
        }
    }

    showNextLine();

    nextButton.addEventListener('click', () => {
        window.location.href = 'Penjelasan.html';
    });

    skipButton.addEventListener('click', () => {
        isSkipped = true;
        container.innerHTML = '';
        lines.forEach((line, idx) => {
            const p = document.createElement('p');
            p.className = 'text-line';
            p.innerHTML = line;
            p.style.opacity = 0;
            p.style.transition = "opacity 0.6s, transform 0.6s";
            p.style.transform = "translateY(20px)";
            container.appendChild(p);
            setTimeout(() => {
                p.style.opacity = 1;
                p.style.transform = "translateY(0)";
            }, 100 + idx * 100);
        });
        nextButton.style.opacity = 1;
    });
});