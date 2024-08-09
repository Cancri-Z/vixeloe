const express = require('express');
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/product-approval', ensureAdmin, adminController.getApproveProducts);
router.post('/product-approval/update', ensureAdmin, adminController.updateProductStatus);

module.exports = router;
