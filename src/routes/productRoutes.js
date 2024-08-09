const express = require('express');
const productController = require('../controllers/productController');
const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Route for submitting a product, requires authentication
router.post('/submit', ensureAuthenticated, productController.submitProduct);

// Route for getting a product by its ID
router.get('/product/:id', productController.getProductById);

// Route for fetching search suggestions
router.get('/api/search-suggestions', productController.getSearchSuggestions);

// Route for fetching search results
router.get('/search-results', productController.getSearchResults);

router.get('/api/search-products', productController.apiSearchProducts);

// Route for getting products by brand
router.get('/brand/:brandName', productController.getProductsByBrand);

// Route for fetching all products (if this method exists in productController)
router.get('/products', productController.getProducts);

// Route for paginated search results with related products
router.get('/search-results', productController.searchProductsWithPagination);

module.exports = router;
