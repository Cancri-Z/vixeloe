// search.js

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  if (query.length === 0) {
    searchResults.innerHTML = '';
    return;
  }

  try {
    const response = await fetch(`/api/search?query=${query}`);
    const products = await response.json();
    displaySearchResults(products);
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
});

function displaySearchResults(products) {
  if (products.length === 0) {
    searchResults.innerHTML = '<p>No products found</p>';
  } else {
    const productList = products.map(product => `<p>${product.name}</p>`).join('');
    searchResults.innerHTML = productList;
  }
}
