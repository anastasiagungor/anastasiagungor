const video = document.getElementById('video');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');

// Function to update progress bar smoothly
function updateProgress() {
    if (video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        progress.style.width = `${percentage}%`;
    }
    requestAnimationFrame(updateProgress);
}

// Start updating progress when video is playing
video.addEventListener('play', () => {
    requestAnimationFrame(updateProgress);
});

// Seek video position on progress bar click
progressBar.addEventListener('click', (event) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newTime = (clickX / progressBar.offsetWidth) * video.duration;
    video.currentTime = newTime;
});

// Ensure video plays automatically after page loads
window.addEventListener('load', () => {
    video.play();
});

// Function to toggle controls visibility based on screen size
function toggleControls() {
    if (window.innerWidth <= 768) {
        video.setAttribute('controls', 'controls');
    } else {
        video.removeAttribute('controls');
    }
}

// Run on load and on resize
toggleControls();
window.addEventListener('resize', toggleControls);