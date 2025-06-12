document.addEventListener('DOMContentLoaded', function() {
    const lines = document.querySelectorAll('.text-line');
    const nextButton = document.getElementById('btn-selanjutnya');
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animation = 'fadeIn 1s forwards';
        }, index * 2000); // Each line appears after 2 seconds
    });

    // Show next button after all lines are displayed
    setTimeout(() => {
        nextButton.style.animation = 'fadeIn 1s forwards';
    }, (lines.length * 2000));
document.addEventListener('DOMContentLoaded', () => {
    const lines = [
        "🌤️ Sampah-sampah mulai berjatuhan dari atas ke sungai dan daratan!",
        "🧺 Tugasmu adalah menangkap sampah dengan jaring sebelum sampah jatuh ke daratan.",
        "⚡️ Hati-hati! Jangan sampai sampah jatuh ke daratan, karena itu akan mengurangi nyawamu.",
        "⏱️ Tangkap sebanyak mungkin sampah dalam waktu yang terbatas untuk menjaga lingkungan tetap bersih!",
        "🌟 Siap jadi pahlawan kebersihan? Ayo mulai petualanganmu sekarang!"
    ];

    const container = document.getElementById('text-container');
    const nextButton = document.getElementById('btn-selanjutnya');
    const skipButton = document.getElementById('btn-skip');

    let currentLine = 0;
    let isSkipped = false;

    function typeLine(text, callback) {
        const p = document.createElement('p');
        p.className = 'text-line';
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        container.appendChild(p);

        let i = 0;
        const typing = setInterval(() => {
            if (isSkipped) {
                clearInterval(typing);
                p.innerHTML = text;
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
                if (callback) callback();
                return;
            }
            if (i < text.length) {
                p.innerHTML += text.charAt(i);
                i++;
            } else {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
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
                }
                setTimeout(showNextLine, 500);
            });
        }
    }

    // Hide next button initially
    nextButton.style.display = 'none';

    // Start the animation
    showNextLine();

    // Button event listeners
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
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            container.appendChild(p);
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, 100 * idx);
        });
        nextButton.style.display = 'block';
    });
});
});