const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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
  next();
});

// ROUTES

// Signup route
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, middleName, username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ field: 'password', message: 'Passwords do not match' });
    }

    // Check if user already exists
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

    // Send a response to redirect to the login page
    res.status(201).json({ message: 'User created successfully', redirect: '/login' });
  } catch (error) {
    console.error('Error in signup:', error);
    if (error.name === 'ValidationError') {
      // Mongoose validation error
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
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

    // Set session
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
  res.render('index', { user: req.session.user });
});

// Define routes for specific pages
const pages = ['login', 'sell', 'productpage', 'signup', 'new_password', 'password_recovery', 'notification', 'brands', 'forgetpassword', 'messages', 'profile', 'publish'];

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
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
