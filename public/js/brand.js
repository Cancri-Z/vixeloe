document.addEventListener('DOMContentLoaded', function() {
    const titleX = document.getElementById('titleX');
    const aside = document.querySelector('.aside');
    const productsTop = document.querySelector('#products-top');
    const footer = document.querySelector('footer');
    const filter = document.querySelector('#filter');
    const container = document.querySelector('.products-container');

    const filterIcon = titleX.querySelector('.fa-filter');
    const closeIcon = titleX.querySelector('.close-icon');
    const filterText = titleX.querySelector('.filter-text');

    // Function to toggle the aside and change titleX icons
    function toggleAside() {
        aside.classList.toggle('show');
        if (aside.classList.contains('show')) {
            filterIcon.style.display = 'none';
            filterText.style.display = 'none';
            closeIcon.style.display = 'flex';
        } else {
            filterIcon.style.display = 'inline';
            filterText.style.display = 'inline';
            closeIcon.style.display = 'none';
        }
        productsTop.classList.toggle('blur');
        footer.classList.toggle('blur');
        document.body.classList.toggle('no-scroll');
    }

    // Add click event listener to titleX
    titleX.addEventListener('click', toggleAside);

    // Close the aside when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!aside.contains(event.target) && !titleX.contains(event.target)) {
            aside.classList.remove('show');
            filterIcon.style.display = 'inline';
            filterText.style.display = 'inline';
            closeIcon.style.display = 'none';
            productsTop.classList.remove('blur');
            footer.classList.remove('blur');
            document.body.classList.remove('no-scroll');
        }
    });

    // Prevent scrolling on blurred elements
    document.addEventListener('scroll', function() {
        if (aside.classList.contains('show')) {
            productsTop.style.overflow = 'hidden';
            footer.style.overflow = 'hidden';
        } else {
            productsTop.style.overflow = 'auto';
            footer.style.overflow = 'auto';
        }
    });

    // Intersection Observer to hide the filter near the footer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                filter.style.display = 'none';
            } else {
                filter.style.display = 'block';
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(footer);

    // Fetch and display products by brand
    const brandName = document.querySelector('body').getAttribute('data-brand-name');

    if (brandName) {
        fetchProductsByBrand(brandName);
    }

    function fetchProductsByBrand(brand) {
        fetch(`/api/products?brand=${brand}`)
            .then(response => response.json())
            .then(products => {
                displayProducts(products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function displayProducts(products) {
        container.innerHTML = ''; // Clear existing content

        products.forEach(product => {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'deal';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.product_name}">
            <div class="details">
                <p class="name">${product.product_name}</p>
                <p class="condition">${product.condition}</p>
                <p class="price">&#8358;${product.price}</p>
                <p class="rating">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                <p class="location"><i class="fa-solid fa-location-dot"></i> ${product.location}</p>
            </div>
        `;
        return card;
    }
});
