document.addEventListener('DOMContentLoaded', () => {
  const searchResults = document.getElementById('prd-display');
  const paginationContainer = document.getElementById('pagination-container');

  let currentPage = 1;
  const limit = 21;

   // Check if we're on the search results page
   const isSearchResultsPage = window.location.pathname === '/search-results';

   if (isSearchResultsPage) {
     // The page is already rendered by the server, just set up pagination
     setupPagination();
   } else {
     // We're not on the search results page, use the API
     fetchSearchResults();
   }
 
   function setupPagination() {
     const paginationData = JSON.parse(document.getElementById('pagination-data').textContent);
     displayPagination(paginationData);
   }

  async function fetchSearchResults(page = 1) {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('query');

      if (!query) {
          searchResults.innerHTML = '<p>No search query provided.</p>';
          return;
      }

      try {
          const response = await fetch(`/api/search-products?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const { products, pagination } = await response.json();
          displaySearchResults(products);
          displayPagination(pagination);
      } catch (error) {
          console.error('Error fetching search results:', error);
          searchResults.innerHTML = '<p>Error fetching results. Please try again.</p>';
      }
  }

  function displaySearchResults(products) {
      searchResults.innerHTML = '';

      if (products.length === 0) {
          searchResults.innerHTML = '<p>No results found.</p>';
          return;
      }

      products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('items');
          productElement.innerHTML = `
              <img src="${product.image || ''}" alt="${product.product_name}">
              <div class="details">
                  <div class="name">${product.product_name}</div>
                  <div class="condition">${product.condition}</div>
                  <div class="price">&#8358;${product.price.toFixed(2)}</div>
                  <div class="rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <div class="location"><i class="fa-solid fa-location-dot"></i> ${product.location}</div>
              </div>
          `;
          productElement.addEventListener('click', () => {
              window.location.href = `/product/${product._id}`;
          });
          searchResults.appendChild(productElement);
      });
  }

  function displayPagination(pagination) {
      paginationContainer.innerHTML = '';

      if (pagination.currentPage > 1) {
          const prevButton = createButton('Previous', () => fetchSearchResults(pagination.currentPage - 1));
          paginationContainer.appendChild(prevButton);
      }

      if (pagination.currentPage < pagination.totalPages) {
          const nextButton = createButton('Next', () => fetchSearchResults(pagination.currentPage + 1));
          paginationContainer.appendChild(nextButton);
      }
  }

  function createButton(text, onClick) {
      const button = document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', onClick);
      return button;
  }

  fetchSearchResults();
});
