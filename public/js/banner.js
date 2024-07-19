const bannerImages = document.querySelectorAll('.banner-img');
const dotIndicatorsContainer = document.getElementById('dot-indicators');
let currentIndex = 0;
let slideInterval;

// Function to create dot indicators
function createDotIndicators() {
    // Clear existing dots
    dotIndicatorsContainer.innerHTML = '';

    // Create a new dot for each image
    for (let i = 0; i < bannerImages.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) {
            dot.classList.add('active');
        }
        dotIndicatorsContainer.appendChild(dot);
    }
}

// Function to update the active image and dot indicator
function updateActive() {
    // Remove active class from all images and dots
    bannerImages.forEach(img => img.classList.remove('active'));
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to the current image and dot
    bannerImages[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Function to go to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % bannerImages.length;
    updateActive();
}

// Event listeners for next and previous buttons
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + bannerImages.length) % bannerImages.length;
    updateActive();
});
nextBtn.addEventListener('click', nextSlide);

// Event listener for dot indicators
dotIndicatorsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('dot')) {
        const dots = document.querySelectorAll('.dot');
        currentIndex = Array.from(dots).indexOf(event.target);
        updateActive();
    }
});

// Start the slideshow
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Initialize the slideshow
function initSlideshow() {
    createDotIndicators();
    updateActive();
    startSlideshow();
}

// Wait for the DOM to load before initializing
document.addEventListener('DOMContentLoaded', initSlideshow);