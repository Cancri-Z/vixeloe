const Product = require('../models/Product');

exports.submitProduct = async (req, res) => {
  try {
    const productData = req.body;
    productData.userId = req.user.id;
    productData.approvalStatus = 'pending';

    const newProduct = new Product(productData);
    await newProduct.save();

    res.json({ success: true, message: 'Product submitted for approval' });
  } catch (error) {
    console.error('Error submitting product:', error);
    res.status(500).json({ success: false, message: 'Error submitting product' });
  }
};

exports.getSearchSuggestions = async (req, res) => {
  const query = req.query.query.trim();
  if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
      const suggestions = await Product.find({ product_name: { $regex: query, $options: 'i' } })
          .select('product_name -_id')
          .limit(10);
      
      const suggestionNames = suggestions.map(product => product.product_name);
      res.json(suggestionNames);
  } catch (error) {
      console.error('Error fetching search suggestions:', error);
      res.status(500).json({ error: 'Error fetching search suggestions' });
  }
};

exports.getSearchResults = async (req, res) => {
  const query = req.query.query || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 21;
  const skip = (page - 1) * limit;

  try {
    const totalProducts = await Product.countDocuments({ $text: { $search: query } });
    const products = await Product.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .skip(skip)
    .limit(limit)
    .lean();

    const totalPages = Math.ceil(totalProducts / limit);

    res.render('search-results', {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts
      },
      query
    });
  } catch (error) {
    console.error('Error in search results:', error);
    res.status(500).render('error', { message: 'An error occurred while fetching search results' });
  }
};

exports.apiSearchProducts = async (req, res) => {
  const query = req.query.query || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 21;
  const skip = (page - 1) * limit;

  try {
    const totalProducts = await Product.countDocuments({ $text: { $search: query } });
    const products = await Product.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .skip(skip)
    .limit(limit)
    .lean();

    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts
      }
    });
  } catch (error) {
    console.error('Error in API search products:', error);
    res.status(500).json({ error: 'An error occurred while fetching search results' });
  }
};


exports.getProductsByBrand = async (req, res) => {
  const brandName = req.params.brandName;
  const products = await Product.find({ brand: brandName });
  res.render('brands', { products, brandName });
};

// Ensure this method is needed and implemented correctly
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Ensure this method is needed and implemented correctly
exports.searchProductsWithPagination = async (req, res) => {
  const { query, page = 1, limit = 40 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const searchQuery = { $text: { $search: query } };
    let matchingProducts = await Product.find(searchQuery)
      .sort({ score: { $meta: "textScore" } })
      .lean();

    let allProducts = matchingProducts;
    if (matchingProducts.length < limit) {
      const additionalProducts = await Product.find({ _id: { $nin: matchingProducts.map(p => p._id) } })
        .lean();
      allProducts = allProducts.concat(additionalProducts);
    }

    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const paginatedProducts = allProducts.slice(skip, skip + limit);

    let relatedProducts = [];
    if (paginatedProducts.length > 0) {
      const mainProduct = paginatedProducts[0];
      relatedProducts = await Product.find({
        $and: [
          { _id: { $ne: mainProduct._id } },
          {
            $or: [
              { brand: mainProduct.brand },
              { product_name: new RegExp(mainProduct.product_name.split(' ')[0], 'i') }
            ]
          }
        ]
      }).limit(5).lean();
    }

    res.json({
      products: paginatedProducts,
      relatedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) {
    return res.status(404).send('Product not found');
  }
  res.render('productpage', { product });
};

exports.submitSellForm = async (req, res) => {
  try {
    const formData = req.body;
    const newProduct = new Product(formData);
    await newProduct.save();
    res.redirect('/publish');
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).send('Server error');
  }
};
