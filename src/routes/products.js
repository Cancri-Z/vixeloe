const express = require('express');
const Product = require('../models/product'); // Assuming you'll move your schemas to separate model files
const router = express.Router();

router.get('/', async (req, res) => {
  const { brand } = req.query;
  try {
    const products = await Product.find({ brand: brand }).lean();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('productpage', { product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send('Server error');
  }
});

module.exports = router;