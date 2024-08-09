const express = require('express');
const { body, check } = require('express-validator');
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Route for signup
router.post('/signup', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  // Ensure confirmPassword is checked and matches password
  check('confirmPassword', 'Passwords do not match').custom((value, { req }) => value === req.body.password)
], userController.signup);

// Route for login
// router.post('/login', userController.login);
router.post('/api/user/login', userController.login);
router.get('/login', userController.renderLoginPage);

// Route for logout 
// router.post('/logout', userController.logout);
router.post('/api/user/logout', userController.logout);
router.get('/logout', userController.handleLogoutRedirect);

// Route for getting user profile with authentication
router.get('/profile', ensureAuthenticated, userController.getUserProfile);

// Route for updating user profile with authentication
router.post('/profile', ensureAuthenticated, userController.updateUserProfile);

module.exports = router;
