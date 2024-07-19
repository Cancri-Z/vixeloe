const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Function to search products with metadata
async function searchProducts(query, page, limit) {
  try {
    const regex = new RegExp(query, 'i');
    const totalProducts = await Product.countDocuments({
      $or: [
        { product_name: regex },
        { description: regex },
        { brand: regex },
        { title: regex },
        { keywords: regex },
        { full_content: regex }
      ]
    });
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find({
      $or: [
        { product_name: regex },
        { description: regex },
        { brand: regex },
        { title: regex },
        { keywords: regex },
        { full_content: regex }
      ]
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

    return { products, pagination: { currentPage: page, totalPages, totalProducts } };
  } catch (error) {
    throw error;
  }
}

// Route to handle search requests
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // Adjust this number as needed
    console.log('Search query:', query);

    const { products, pagination } = await searchProducts(query, page, limit);
    res.json({ products, pagination, relatedProducts: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Home page route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Other page routes
const pages = [
  'adverts', 'brands', 'forgetpassword', 'link', 'listings', 'login', 'messages', 
  'sell', 'new_password', 'notifications', 'page404', 'password_recovery', 
  'productpage', 'profile', 'publish', 'search-results', 'sell', 'settings', 'signup'
];

pages.forEach(page => {
  router.get(`/${page}`, (req, res) => {
    res.render(page, { title: page.charAt(0).toUpperCase() + page.slice(1) });
  });
});

module.exports = router;
