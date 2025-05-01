document.addEventListener("DOMContentLoaded", function() {
    const storyText = document.getElementById("story-text");
    const nextBtn = document.getElementById("nextBtn");
    const volumeBtn = document.getElementById("volume-btn");
    const volumeSlider = document.getElementById("volume-slider");
    
    let volumeAktif = true;
    let audio = new Audio("../../backsound/backsound-story.mp3");
    audio.loop = true;
    
    const stories = [
        "🌍 Selamat datang di EcoQuest: Mission Earth!",
        "🌱 Di dunia ini, kita memiliki misi penting...",
        "🌊 Sungai, dan Taman ini sudah tercemar dengan berbagai sampah",
        "🌿 Bumi kita membutuhkan pahlawan sepertimu!",
        "♻️ Bersama-sama, kita akan belajar menjaga lingkungan...",
        "🚀 Apakah kamu siap untuk petualangan ini?"
    ];

    let currentStory = 0;
    let isTyping = false;

    function typeWriter(text, index = 0) {
        if (index < text.length) {
            isTyping = true;
            storyText.textContent = text.substring(0, index + 1);
            setTimeout(() => typeWriter(text, index + 1), 50);
        } else {
            isTyping = false;
        }
    }

    function updateStory() {
        storyText.textContent = '';
        typeWriter(stories[currentStory]);
        
        // Add particle effects
        createParticles();
    }

    function createParticles() {
        const particles = document.createElement('div');
        particles.className = 'particles';
        document.querySelector('.message-box').appendChild(particles);
        
        setTimeout(() => particles.remove(), 1000);
    }

    nextBtn.addEventListener("click", function() {
        if (isTyping) {
            // Skip typing animation
            isTyping = false;
            storyText.textContent = stories[currentStory];
            return;
        }

        currentStory++;
        if (currentStory >= stories.length) {
            // Add transition effect
            document.querySelector('.game-container').style.opacity = 0;
            setTimeout(() => {
                window.location.href = "../PilihPermainan/PilihPermainan.html";
            }, 1000);
        } else {
            updateStory();
        }
    });

    volumeBtn.addEventListener("click", function() {
        volumeAktif = !volumeAktif;
        if (volumeAktif) {
            audio.play();
            volumeBtn.src = "../../Asset/VolumeAktif.jpg";
        } else {
            audio.pause();
            volumeBtn.src = "../../Asset/VolumeNonAktif.jpg";
        }
    });

    volumeSlider.addEventListener("input", function() {
        audio.volume = this.value / 100;
    });

    // Initialize
    updateStory();
    audio.play();
});