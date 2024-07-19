
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: String,
  description: String,
  brand: String,
  condition: String,
  price: Number,
  location: String,
  image: String,
  contact: String
});

productSchema.index({ product_name: 'text', description: 'text', brand: 'text' });

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
