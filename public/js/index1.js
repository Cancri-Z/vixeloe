//for changing of hero images
const heroImage = document.getElementById('heroImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const images = ['/img/product-advertising-hero-image-header-layout_1302-21013.avif',
                '/img/beautifull-poster-designing-place.jpg',
                '/img/big-gadget-sale-design-template-33c6c8e6f1e51bb2b276280ba5562b82_screen.jpg',
                '/img/poster1.jpg',
                '/img/preview.jpg'
            ];
const dots = document.querySelectorAll('.dot');
let currentImageIndex = 0;

heroImage.style.height = '100%';

function updateDotColor() {
  dots.forEach((dot, index) => {
    if (index === currentImageIndex) {
      dot.style.backgroundColor = '#000';
    } else {
      dot.style.backgroundColor = ''; // Reset the color to default
    }
  });
}

function changeImage(direction) {
  if (direction === 'prev') {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  } else {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }
  heroImage.style.opacity = 0.3;
  setTimeout(() => {
    heroImage.src = images[currentImageIndex];
    heroImage.style.opacity = 1;
    updateDotColor(); // Call the function to update dot color
  }, 500);
}

function startAutoSlide() {
  setInterval(() => {
    changeImage('next');
    updateDotColor(); // Call the function to update dot color
  }, 3000);
}

prevBtn.addEventListener('click', () => {
  changeImage('prev');
});

nextBtn.addEventListener('click', () => {
  changeImage('next');
});

startAutoSlide();




//for the fixation of the aside div
window.addEventListener('scroll', function() {
  const container = document.querySelector('.container');
  const aside = document.querySelector('.aside');
  const containerHeight = container.offsetHeight;
  const asideHeight = aside.offsetHeight;
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollPosition + window.innerHeight >= containerHeight + 70) {
    aside.style.position = 'absolute';
    aside.style.top = 'auto';
    aside.style.bottom = '0';
  } else {
    aside.style.position = 'sticky';
    aside.style.top = '80px';
    aside.style.bottom = 'auto';
  }
});




//for the appearance of the aside div on smaller screen sizes
  const filterDiv = document.getElementById('filter');
  const asideDiv = document.getElementById('asideX');
  const filterIcon = filterDiv.querySelector('i');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);
  const body = document.body;

  let asideOpen = false;

  filterDiv.addEventListener('click', function() {
  asideDiv.style.display = asideOpen ? 'none' : 'block';
  overlay.style.display = asideOpen ? 'none' : 'block';
  body.classList.toggle('no-scroll', !asideOpen);

  if (asideOpen) {
      filterIcon.classList.replace('fa-times', 'fa-filter');
  } else {
      filterIcon.classList.replace('fa-filter', 'fa-times');
  }

  asideOpen = !asideOpen;
  });


  // In your frontend JavaScript
fetch('/api/products')
.then(response => response.json())
.then(data => {
  // Handle the product data
  console.log(data);
})
.catch(error => console.error('Error:', error));