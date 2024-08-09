const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
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
};


exports.login = async (req, res) => {
  const { username: identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ message: 'Username/Email and password are required' });
  }
  try {
    let user;
    if (identifier.includes('@')) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ username: identifier });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    // Set session variables
    req.session.userId = user._id;
    req.session.isLoggedIn = true;
    console.log('User logged in successfully:', user);
    res.status(200).json({ success: true, message: 'Login successful', redirect: '/' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.logout = (req, res) => {
  console.log('Logout function called');
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    console.log('Session destroyed successfully');
    res.clearCookie('connect.sid'); // Clear the session cookie
    console.log('Sending logout response');
    res.json({ success: true, message: 'Logged out successfully', redirect: '/login' });
  });
};

exports.renderLoginPage = (req, res) => {
  res.render('login', { isLoggedIn: false });
};

exports.handleLogoutRedirect = (req, res) => {
  res.redirect('/login');
};

// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.session.user._id);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     res.render('profile', { user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// };

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('profile', { user, isLoggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// exports.updateUserProfile = async (req, res) => {
//   try {
//     const userId = req.session.user._id;
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
// };

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const updatedData = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Object.keys(updatedData).forEach(key => {
      user[key] = updatedData[key];
    });

    await user.save();

    // Optionally, update the session user information
    req.session.user = user;

    // Render the profile page with updated information
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
