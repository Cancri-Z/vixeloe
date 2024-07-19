document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('#prd-img img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('dots-container');

    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
            img.loading = i === index ? 'eager' : 'lazy'; // Lazy load non-active images
        });
        updateDots(index);
    }

    function updateDots(index) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            dot.setAttribute('aria-current', i === index ? 'true' : 'false');
        });
    }

    function createDots() {
        images.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Show image ${i + 1}`);
            if (i === 0) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            }
            dot.addEventListener('click', () => {
                currentIndex = i;
                showImage(currentIndex);
            });
            dotsContainer.appendChild(dot);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    createDots();
    showImage(0);

    // Accessible rating system
    const ratingContainer = document.querySelector('.star-rating');
    const ratingValue = document.getElementById('rating-value');

    function createRatingSystem() {
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('button');
            star.classList.add('star');
            star.setAttribute('aria-label', `Rate ${i} star${i !== 1 ? 's' : ''}`);
            star.innerHTML = '★';
            star.addEventListener('click', () => setRating(i));
            ratingContainer.appendChild(star);
        }
    }

    function setRating(value) {
        ratingValue.value = value;
        updateStars(value);
    }

    function updateStars(value) {
        const stars = ratingContainer.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < value);
            star.setAttribute('aria-pressed', index < value ? 'true' : 'false');
        });
    }

    createRatingSystem();

    // Comment submission
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = ratingValue.value;
        const comment = document.getElementById('comment').value;

        if (rating && comment) {
            addComment(rating, comment);
            commentForm.reset();
            updateStars(0);
        }
    });

    function addComment(rating, comment) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <div class="comment-rating" aria-label="Rating: ${rating} out of 5 stars">
                ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
            </div>
            <div class="comment-text">${escapeHTML(comment)}</div>
        `;
        commentList.appendChild(commentElement);
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});