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
        "🏙️ Kota kita semakin bersih jika kita pilah sampah dengan benar!",
        "🗑️ Berbagai jenis sampah akan muncul di layar.",
        "♻️ Tugasmu adalah <b>memasukkan sampah ke tempat yang tepat</b> sesuai jenisnya.",
        "🚮 Ada tempat sampah organik, anorganik, dan B3. Pilih dengan cermat ya!",
        "⏰ Semakin cepat dan tepat kamu memilah, semakin tinggi skor yang kamu dapatkan!",
        "🌟 Siap jadi pahlawan lingkungan? Yuk mulai petualangan pilah sampah!"
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
                setTimeout(typingEffect, 18);
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
                setTimeout(showNextLine, 600);
            });
        } else {
            setTimeout(() => {
                nextButton.style.opacity = 1;
            }, 400);
        }
    }

    showNextLine();
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

// Tunggu sampai DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Cari element nextButton
    const nextButton = document.getElementById('nextButton');
    
    // Pastikan button ada sebelum menambahkan event listener
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            window.location.href = 'Penjelasan.html';
        });
    } else {
        console.error('Element dengan id "nextButton" tidak ditemukan');
    }
});