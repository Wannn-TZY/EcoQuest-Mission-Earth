document.addEventListener('DOMContentLoaded', () => {
    const lines = [
        "🏙️ Kota kita semakin bersih jika kita pilah sampah dengan benar!",
        "🗑️ Berbagai jenis sampah akan muncul di layar.",
        "♻️ Tugasmu adalah memasukkan sampah ke tempat yang tepat sesuai jenisnya.",
        "🚮 Ada tempat sampah organik, anorganik, dan B3. Pilih dengan cermat ya!",
        "🌟 Siap jadi pahlawan lingkungan? Yuk mulai petualangan pilah sampah!"
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