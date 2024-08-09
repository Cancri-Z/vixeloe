const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route to get search suggestions
router.get('/search-suggestions', searchController.getSuggestions);

module.exports = router;
