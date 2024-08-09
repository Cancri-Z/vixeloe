const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
  gender: String,
  dateOfBirth: Date,
  maritalStatus: String,
  occupation: String,
  status: String,
  bio: String,
  email: { type: String, required: true, unique: true },
  homeAddress: String,
  officeAddress: String,
  homePhone: String,
  mobilePhone: String,
  officePhone: String,
  username: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false }
});

userSchema.index({ username: 1, email: 1 });

// Pre-save hook to hash the password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;