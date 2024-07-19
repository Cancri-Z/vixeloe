const stars = document.querySelectorAll('.star');
const commentSection = document.querySelector('.comment-section textarea');
const submitBtn = document.querySelector('.submit-btn');
const ratingContainer = document.querySelector('.rating-container');

let currentRating = 0;

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    currentRating = index + 1;
    resetStars();
    highlightStars(currentRating);
  });
});

submitBtn.addEventListener('click', () => {
  const comment = commentSection.value.trim();
  if (comment !== '') {
    const newDisplaySection = document.createElement('div');
    newDisplaySection.classList.add('display-section');

    const ratingDisplay = document.createElement('div');
    ratingDisplay.classList.add('rating-display');

    for (let i = 0; i < 5; i++) {
      const starIcon = document.createElement('span');
      starIcon.classList.add('star');
      if (i < currentRating) {
        starIcon.innerHTML = '&#9733;'; // Filled star
      } else {
        starIcon.innerHTML = '&#9734;'; // Empty star
      }
      ratingDisplay.appendChild(starIcon);
    }

    const commentDisplay = document.createElement('div');
    commentDisplay.textContent = comment;

    newDisplaySection.appendChild(ratingDisplay);
    newDisplaySection.appendChild(commentDisplay);
    ratingContainer.appendChild(newDisplaySection);

    commentSection.value = '';
    currentRating = 0;
    resetStars();
  }
});

function resetStars() {
  stars.forEach(star => star.classList.remove('active'));
}

function highlightStars(rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}