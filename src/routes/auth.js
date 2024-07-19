const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');// Assuming you'll move your schemas to separate model files
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, middleName, username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already taken' });
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

    res.status(201).json({ message: 'User created successfully', redirect: '/' });
  } catch (error) {
    console.error('Error in signup:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;