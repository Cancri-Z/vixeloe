const relatedPrdContainer = document.getElementById('related-prd-container');
const scrollLeft = document.getElementById('scroll-left');
const scrollRight = document.getElementById('scroll-right');

scrollLeft.addEventListener('click', () => {
    relatedPrdContainer.scrollBy({
        left: -200,
        behavior: 'smooth'
    });
    updateRelatedButtonVisibility();
});

scrollRight.addEventListener('click', () => {
    relatedPrdContainer.scrollBy({
        left: 200,
        behavior: 'smooth'
    });
    updateRelatedButtonVisibility();
});

function updateRelatedButtonVisibility() {
    const containerWidth = relatedPrdContainer.offsetWidth;
    const containerScrollWidth = relatedPrdContainer.scrollWidth;
    const currentScroll = relatedPrdContainer.scrollLeft;
    const isAtStart = currentScroll === 0;
    const isAtEnd = currentScroll + containerWidth >= containerScrollWidth;
    scrollLeft.style.display = isAtStart ? 'none' : 'block';
    scrollRight.style.display = isAtEnd ? 'none' : 'block';
}

// Call the updateRelatedButtonVisibility function initially
updateRelatedButtonVisibility();

// top search button
const productContainer = document.querySelector('.product-container');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const scrollAmount = 300; // Adjust this value to control the scroll amount

let isProductAtStart = true;
let isProductAtEnd = false;

updateProductButtonVisibility();

leftBtn.addEventListener('click', () => {
    productContainer.scrollLeft -= scrollAmount;
    updateProductButtonVisibility();
});

rightBtn.addEventListener('click', () => {
    productContainer.scrollLeft += scrollAmount;
    updateProductButtonVisibility();
});

function updateProductButtonVisibility() {
    const containerWidth = productContainer.offsetWidth;
    const containerScrollWidth = productContainer.scrollWidth;
    const currentScroll = productContainer.scrollLeft;
    isProductAtStart = currentScroll === 0;
    isProductAtEnd = currentScroll + containerWidth >= containerScrollWidth;
    leftBtn.style.display = isProductAtStart ? 'none' : 'block';
    rightBtn.style.display = isProductAtEnd ? 'none' : 'block';
}