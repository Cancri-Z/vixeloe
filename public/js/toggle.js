//To slide brands div from the top
const brandsBtn = document.getElementById('brands-btn');
const hiddenBrands = document.getElementById('hidden-brands');
const cnl = document.getElementById('cnl');

brandsBtn.addEventListener('click', (event) => {
    hiddenBrands.classList.remove('hide');
    hiddenBrands.classList.toggle('show');
    event.stopPropagation(); // Prevent this click from being detected by the document listener
});

cnl.addEventListener('click', (event) => {
    hiddenBrands.classList.remove('show');
    hiddenBrands.classList.add('hide');
    event.stopPropagation(); // Prevent this click from being detected by the document listener
});

document.addEventListener('click', (event) => {
    if (!hiddenBrands.contains(event.target) && !brandsBtn.contains(event.target)) {
        hiddenBrands.classList.remove('show');
        hiddenBrands.classList.add('hide');
    }
});


//Toggle bar slide-in-out
const toggleBar = document.getElementById('togglebar');
const toggleContent = document.getElementById('toggle-content');
const cnl1 = document.getElementById('cnl1');

toggleBar.addEventListener('click', (event) => {
    toggleContent.classList.remove('hide');
    toggleContent.classList.toggle('show');
    event.stopPropagation(); // Prevent this click from being detected by the document listener
});

cnl1.addEventListener('click', (event) => {
    toggleContent.classList.remove('show');
    toggleContent.classList.add('hide');
    event.stopPropagation(); // Prevent this click from being detected by the document listener
});

document.addEventListener('click', (event) => {
    if (!toggleContent.contains(event.target) && !toggleBar.contains(event.target)) {
        toggleContent.classList.remove('show');
        toggleContent.classList.add('hide');
    }
});

//For HiddenX 
const brandsBtnX = document.getElementById('brands-btnX');
const hiddenBrandsX = document.getElementById('hidden-brandsX');
const cnlX = document.getElementById('cnlX');

brandsBtnX.addEventListener('click', (event) => {
    hiddenBrandsX.classList.remove('hide');
    hiddenBrandsX.classList.toggle('show');
    event.stopPropagation(); // Prevent this click from being detected by the document listener
});

cnlX.addEventListener('click', (event) => {
    hiddenBrandsX.classList.remove('show');
    hiddenBrandsX.classList.add('hide');
    event.stopPropagation(); // Prevent this click from being detected by the document listener
});

document.addEventListener('click', (event) => {
    if (!hiddenBrandsX.contains(event.target) && !brandsBtnX.contains(event.target)) {
        hiddenBrandsX.classList.remove('show');
        hiddenBrandsX.classList.add('hide');
    }
});