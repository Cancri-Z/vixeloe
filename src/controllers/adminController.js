const Product = require('../models/Product');

exports.getApproveProducts = async (req, res) => {
  try {
    const pendingProducts = await Product.find({ approvalStatus: 'pending' });
    res.render('admin-approval', { pendingProducts });
  } catch (error) {
    console.error('Error fetching pending products:', error);
    res.status(500).send('Server error');
  }
};

exports.updateProductStatus = async (req, res) => {
  const { productId, status } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.approvalStatus = status;
    await product.save();

    res.redirect('/admin/product-approval');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
