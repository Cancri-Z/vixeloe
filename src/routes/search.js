const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Route to get search suggestions
router.get('/suggestions', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.json([]);
    }

    try {
        const regexQuery = new RegExp(query, 'i');
        const suggestions = await Product.find({ product_name: regexQuery }).limit(5).lean();
        res.json(suggestions.map(product => product.product_name));
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get search results
router.get('/results', async (req, res) => {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // Adjust this number as needed

    if (!query) {
        return res.status(400).json({ message: 'No search query provided' });
    }

    try {
        const regexQuery = new RegExp(query, 'i');
        
        // Find exact matches first
        const products = await Product.find({
            $or: [
                { product_name: regexQuery },
                { description: regexQuery },
                { brand: regexQuery }
            ]
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

        // Count total products for pagination
        const totalProducts = await Product.countDocuments({
            $or: [
                { product_name: regexQuery },
                { description: regexQuery },
                { brand: regexQuery }
            ]
        });

        const totalPages = Math.ceil(totalProducts / limit);

        // Find related products based on brand if exact matches found
        let relatedProducts = [];
        if (products.length > 0) {
            const firstProduct = products[0];
            relatedProducts = await Product.find({
                brand: firstProduct.brand,
                _id: { $ne: firstProduct._id } // Exclude the first product from the related products
            })
            .limit(5)
            .lean();
        }

        const pagination = {
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts
        };

        res.json({ products, pagination, relatedProducts });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while fetching results' });
    }
});

module.exports = router;
