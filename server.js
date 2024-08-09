// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const multer = require('multer');
// const session = require('express-session');
// const helmet = require('helmet');
// const { body, validationResult } = require('express-validator');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(helmet());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));
// app.use(express.static(path.join(__dirname, 'public')));


// // Set up session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your_secret_key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: process.env.NODE_ENV === 'production' } // Change to true if using HTTPS
// }));

// // Passport initialization
// app.use(passport.initialize());
// app.use(passport.session());

// // Force correct Content-Type for JavaScript files
// app.use((req, res, next) => {
//   if (req.url.endsWith('.js')) {
//     res.type('application/javascript');
//   }
//   next();
// });

// // Set view engine to EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src', 'views'));

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Schemas
// //PRODUCTS
// const productSchema = new mongoose.Schema({
//   product_name: String,
//   description: String,
//   brand: String,
//   condition: String,
//   price: Number,
//   location: String,
//   image: String,
//   userId: mongoose.Schema.Types.ObjectId,
//   approvalStatus: { type: String, default: 'pending' }
// });


// //USERS
// const userSchema = new mongoose.Schema({
//   firstName: String,
//   middleName: String,
//   lastName: String,
//   gender: String,
//   dateOfBirth: Date,
//   maritalStatus: String,
//   occupation: String,
//   status: String,
//   bio: String,
//   email: { type: String, unique: true },
//   homeAddress: String,
//   officeAddress: String,
//   homePhone: String,
//   mobilePhone: String,
//   officePhone: String,
//   username: { type: String, unique: true },
//   password: String,
//   createdAt: { type: Date, default: Date.now },
//   isAdmin: { type: Boolean, default: false }
// });


// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/') // Make sure this directory exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
// });

// const upload = multer({ storage: storage });

// // Indices
// productSchema.index({ product_name: 'text', description: 'text', brand: 'text' });
// userSchema.index({ username: 1, email: 1 });

// // User password hashing middleware
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// // Models
// const Product = mongoose.model('Product', productSchema, 'products');
// const User = mongoose.model('User', userSchema);
// module.exports = User;

// // Middleware to pass user information to templates
// app.use((req, res, next) => {
//   res.locals.user = req.session.user || null;
//   res.locals.isLoggedIn = !!req.session.user;
//   next();
// });

// // Middleware to ensure user is authenticated
// function ensureAuthenticated(req, res, next) {
//   if (req.session && req.session.user) {
//     return next();
//   }
//   res.status(401).json({ message: 'Unauthorized' });
// }

// // Middleware to ensure the user is an admin
// function ensureAdmin(req, res, next) {
//   console.log('Session user:', req.session.user);
//   const adminEmail = 'abedusamuel01@gmail.com';
//   if (req.session.user && req.session.user.email === adminEmail) {
//     console.log('Admin access granted');
//     return next();
//   }
//   console.log('Admin access denied');
//   res.status(403).send('Access denied');
// }



// // ROUTES

// // Serve HTML files home route
// app.get('/', (req, res) => {
//   res.render('index', { isLoggedIn: req.session.user ? true : false }, (err, html) => {
//     if (err) {
//       console.error('Error rendering index:', err);
//       return res.status(500).send('Error rendering index page');
//     }
//     res.send(html);
//   });
// });

// //Authentication Route
// // Signup route
// app.post('/api/signup', [
//   body('firstName').notEmpty().withMessage('First name is required'),
//   body('lastName').notEmpty().withMessage('Last name is required'),
//   body('username').notEmpty().withMessage('Username is required'),
//   body('email').isEmail().withMessage('Invalid email address'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//   body('confirmPassword').custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error('Passwords do not match');
//     }
//     return true;
//   })
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { firstName, lastName, middleName, username, email, password } = req.body;

//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       if (existingUser.email === email) {
//         return res.status(400).json({ field: 'email', message: 'Email already in use' });
//       }
//       if (existingUser.username === username) {
//         return res.status(400).json({ field: 'username', message: 'Username already taken' });
//       }
//     }

//     const newUser = new User({
//       firstName,
//       lastName,
//       middleName,
//       username,
//       email,
//       password
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully', redirect: '/login' });
//   } catch (error) {
//     console.error('Error in signup:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login route
// app.post('/api/login', [
//   body('username').notEmpty().withMessage('Username is required'),
//   body('password').notEmpty().withMessage('Password is required')
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ $or: [{ email: username }, { username: username }] });

//     if (!user) {
//       return res.status(400).json({ field: 'username', message: 'Invalid username or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ field: 'password', message: 'Invalid username or password' });
//     }

//     req.session.user = {
//       id: user._id,
//       username: user.username,
//        email: user.email,
//       isAdmin: user.isAdmin 
//     };

//     res.status(200).json({ message: 'Login successful', redirect: '/' });
//   } catch (error) {
//     console.error('Error in login:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Logout route
// app.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       return res.status(500).send('Error logging out');
//     }
//     res.redirect('/');
//   });
// });


// //Products Route
// //submit product details route
// app.post('/api/submit-product', ensureAuthenticated, async (req, res) => {
//   try {
//       const productData = req.body;
//       productData.userId = req.user.id; // Assuming you have user info in req.user
//       productData.approvalStatus = 'pending';

//       const newProduct = new Product(productData);
//       await newProduct.save();

//       res.json({ success: true, message: 'Product submitted for approval' });
//   } catch (error) {
//       console.error('Error submitting product:', error);
//       res.status(500).json({ success: false, message: 'Error submitting product' });
//   }
// });

// // Search suggestions route
// app.get('/api/search-suggestions', async (req, res) => {
//   console.log('Search suggestions route hit');
//   const query = req.query.query;
//   if (!query) {
//     console.log('No query parameter provided');
//     return res.status(400).json({ error: 'Query parameter is required' });
//   }

//   try {
//     console.log(`Fetching suggestions for query: ${query}`);
//     const products = await Product.find({ 
//       product_name: { $regex: new RegExp(query, 'i') } 
//     }).limit(10);
//     const productNames = products.map(product => product.product_name);

//     console.log('Products found:', products);
//     console.log('Suggestions found:', productNames);

//     res.json(productNames);
//   } catch (error) {
//     console.error('Error fetching suggestions:', error);
//     res.status(500).json({ error: 'Error fetching suggestions' });
//   }
// });

// // Search results route
// app.get('/search-results', async (req, res) => {
//   const query = req.query.query || '';
//   const products = await Product.find(
//     { $text: { $search: query } },
//     { score: { $meta: "textScore" } }
//   ).sort({ score: { $meta: "textScore" } }).limit(40);
//   res.render('search-results', { products, query });
// });

// // Route to get products by brand
// app.get('/brand/:brandName', async (req, res) => {
//   const brandName = req.params.brandName;
//   const products = await Product.find({ brand: brandName });
//   res.render('brands', { products, brandName });
// });

// // Brand products route
// app.get('/api/products', async (req, res) => {
//   const { brand } = req.query;
//   const products = await Product.find({ brand }).lean();
//   res.json(products);
// });

// // Search products route with pagination
// app.get('/api/search-products', async (req, res) => {
//   const { query, page = 1, limit = 40 } = req.query;
//   const skip = (page - 1) * limit;

//   try {
//     const searchQuery = { $text: { $search: query } };
//     let matchingProducts = await Product.find(searchQuery)
//       .sort({ score: { $meta: "textScore" } })
//       .lean();

//     let allProducts = matchingProducts;
//     if (matchingProducts.length < limit) {
//       const additionalProducts = await Product.find({ _id: { $nin: matchingProducts.map(p => p._id) } })
//         .lean();
//       allProducts = allProducts.concat(additionalProducts);
//     }

//     const totalProducts = allProducts.length;
//     const totalPages = Math.ceil(totalProducts / limit);
//     const paginatedProducts = allProducts.slice(skip, skip + limit);

//     let relatedProducts = [];
//     if (paginatedProducts.length > 0) {
//       const mainProduct = paginatedProducts[0];
//       relatedProducts = await Product.find({
//         $and: [
//           { _id: { $ne: mainProduct._id } },
//           {
//             $or: [
//               { brand: mainProduct.brand },
//               { product_name: new RegExp(mainProduct.product_name.split(' ')[0], 'i') }
//             ]
//           }
//         ]
//       }).limit(5).lean();
//     }

//     res.json({
//       products: paginatedProducts,
//       relatedProducts,
//       pagination: {
//         currentPage: parseInt(page),
//         totalPages,
//         totalProducts
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Individual product route
// app.get('/product/:id', async (req, res) => {
//   const product = await Product.findById(req.params.id).lean();
//   if (!product) {
//     return res.status(404).send('Product not found');
//   }
//   res.render('productpage', { product });
// });

// //Admin route
// // Check session route for debugging
// app.get('/check-session', (req, res) => {
//   res.json(req.session);
// });

// // Admin approval route
// app.get('/admin/approve-products', ensureAdmin, async (req, res) => {
//   try {
//     const pendingProducts = await Product.find({ approvalStatus: 'pending' });
//     res.render('admin-approval', { pendingProducts });
//   } catch (error) {
//     console.error('Error fetching pending products:', error);
//     res.status(500).send('Server error');
//   }
// });


// // Admin denial route 
// app.post('/api/admin/update-product-status', async (req, res) => {
//     const { productId, status } = req.body;
    
//     try {
//         const pendingProduct = await PendingProduct.findById(productId);
        
//         if (status === 'approved') {
//             // Move to approved products collection
//             const approvedProduct = new ApprovedProduct(pendingProduct.toObject());
//             await approvedProduct.save();
//             await PendingProduct.findByIdAndDelete(productId);
//         } else if (status === 'denied') {
//             // Optionally notify the user or just delete
//             await PendingProduct.findByIdAndDelete(productId);
//         }
        
//         res.redirect('/admin/product-approval');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

// //Users Route
// // Route to get profile page
// app.get('/profile', ensureAuthenticated, async (req, res) => {
//   try {
//     const user = await User.findById(req.session.user.id);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     res.render('profile', { user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// // User profile data updating route
// app.post('/api/user/profile', ensureAuthenticated, upload.single('profilePicture'), async (req, res) => {
//   try {
//     const userId = req.session.user.id; 
//     const updatedData = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     Object.keys(updatedData).forEach(key => {
//       user[key] = updatedData[key];
//     });

//     await user.save();

//     res.status(200).json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// //SELL SEQUENCE
// app.post('/submit-sell-form', async (req, res) => {
//   console.log('Form submission received');
//   try {
//     const formData = req.body;
//     console.log('Form data:', formData);

//     const newProduct = new Product(formData);
//     await newProduct.save();

//     res.redirect('/publish');
//   } catch (error) {
//     console.error('Error processing form submission:', error);
//     res.status(500).send('Server error');
//   }
// });

// // Define routes for specific pages
// const pages = ['login', 'sell', 'productpage', 'signup', 'new_password', 'password_recovery', 'notification', 'brands', 'forgetpassword', 'messages', 'profile', 'publish', 'link', 'settings', 'listings', 'admin-approval'];

// pages.forEach(page => {
//   app.get(`/${page}`, (req, res) => {
//     res.render(page, { user: req.session.user });
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).send("Sorry, that resource doesn't exist!");
// });
 
// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error stack:', err.stack);
//   console.error('Error message:', err.message);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
const passportConfig = require('./src/config/passportConfig');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static('public/favicon.ico'));

// Set up session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  }
}));

app.use((req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.status(204).end(); // No Content
  } else {
    next();
  }
});

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Middleware to pass authentication status to templates
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

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

// Routes
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', adminRoutes);

// Render the main pages
const pages = ['login', 'sell', 'productpage', 'signup', 'new_password', 'password_recovery', 'notification', 'brands', 'forgetpassword', 'messages', 'profile', 'publish', 'link', 'settings', 'listings'];

pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.render(page, { user: req.session.user, isLoggedIn: req.session.isLoggedIn || false });
  });
});

// Serve HTML files home route
app.get('/', (req, res) => {
  res.render('index', { isLoggedIn: req.session.isLoggedIn || false });
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});


// 404 handler
app.use((req, res) => {
  res.status(404).send("Sorry, that resource doesn't exist!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  console.error('Error message:', err.message);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});