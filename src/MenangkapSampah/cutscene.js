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

    nextButton.addEventListener('click', () => {
        window.location.href = 'Penjelasan.html';
    });
});