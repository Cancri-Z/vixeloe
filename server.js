const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');
const session = require('express-session');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Change to true if using HTTPS
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Force correct Content-Type for JavaScript files
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schemas
const productSchema = new mongoose.Schema({
  product_name: String,
  description: String,
  brand: String,
  condition: String,
  price: Number,
  location: String,
  image: String
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Indices
productSchema.index({ product_name: 'text', description: 'text', brand: 'text' });
userSchema.index({ username: 1, email: 1 });

// User password hashing middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Models
const Product = mongoose.model('Product', productSchema, 'products');
const User = mongoose.model('User', userSchema);

// Middleware to pass user information to templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isLoggedIn = !!req.session.user; // true if user is logged in, otherwise false
  next();
});

// ROUTES

// Signup route
app.post('/api/signup', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, middleName, username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ field: 'email', message: 'Email already in use' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ field: 'username', message: 'Username already taken' });
      }
    }

    const newUser = new User({
      firstName,
      lastName,
      middleName,
      username,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', redirect: '/login' });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/api/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ $or: [{ email: username }, { username: username }] });

    if (!user) {
      return res.status(400).json({ field: 'username', message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ field: 'password', message: 'Invalid username or password' });
    }

    req.session.user = {
      id: user._id,
      username: user.username
    };

    res.status(200).json({ message: 'Login successful', redirect: '/' });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/');
  });
});

// User profile route
// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

// Route to get profile page
app.get('/profile', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('profile', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


// User profile data updating route
app.post('/api/user/profile', ensureAuthenticated, upload.single('profilePicture'), async (req, res) => {
  try {
    console.log('Incoming form data:', req.body);
    if (req.file) {
      console.log('Uploaded file:', req.file);
    }

    const updatedData = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      maritalStatus: req.body.maritalStatus,
      occupation: req.body.occupation,
      status: req.body.status,
      bio: req.body.bio,
      email: req.body.email,
      homeAddress: req.body.homeAddress,
      officeAddress: req.body.officeAddress,
      homePhone: req.body.homePhone,
      mobilePhone: req.body.mobilePhone,
      officePhone: req.body.officePhone,
    };

    console.log('Updated data:', updatedData);

    if (req.file) {
      updatedData.profilePicture = req.file.path;
    }

    const user = await User.findByIdAndUpdate(req.session.user.id, updatedData, { new: true });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.session.user = user; // Update session with new user data
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error in profile update:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// Search suggestions route
app.get('/api/search-suggestions', async (req, res) => {
  const { query } = req.query;
  try {
    const regexQuery = new RegExp(query, 'i');
    const suggestions = await Product.find({ product_name: regexQuery }).limit(5).lean();
    res.json(suggestions.map(product => product.product_name));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search results route
app.get('/search-results', async (req, res) => {
  const query = req.query.query || '';
  const products = await Product.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } }).limit(40);
  res.render('search-results', { products, query });
});

// Route to get products by brand
app.get('/brand/:brandName', async (req, res) => {
  const brandName = req.params.brandName;
  const products = await Product.find({ brand: brandName });
  res.render('brands', { products, brandName });
});

// Brand products route
app.get('/api/products', async (req, res) => {
  const { brand } = req.query;
  const products = await Product.find({ brand }).lean();
  res.json(products);
});

// Search products route with pagination
app.get('/api/search-products', async (req, res) => {
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
});

// Individual product route
app.get('/product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) {
    return res.status(404).send('Product not found');
  }
  res.render('productpage', { product });
});

// Serve HTML files
app.get('/', (req, res) => {
  console.log('Request received for /');
  res.render('index', { isLoggedIn: req.session.user ? true : false });
});

// Define routes for specific pages
const pages = ['login', 'sell', 'productpage', 'signup', 'new_password', 'password_recovery', 'notification', 'brands', 'forgetpassword', 'messages', 'profile', 'publish', 'link', 'settings',];

pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.render(page, { user: req.session.user });
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Sorry, that resource doesn't exist!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
