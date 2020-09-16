const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

//=================================
//             Users
//=================================

// @route   GET users/auth
// @desc    Authenticate user
// @access  Private
router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    username: req.user.username,
    image: req.user.image
  });
});

// @route   POST users/register
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation to check all required fields are entered
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Validation to check if email is already registered
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      username,
      email,
      password
    });

    newUser.save((err, user) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, user: user });
    });
  });
});

// @route   POST users/login
// @desc    Login existing user
// @access  Public
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    // If user with email is not found...
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: 'User not found. Verify email' });

    // If user is found but password is incorrect...
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res
          .status(400)
          .json({ success: false, msg: 'Incorrect password' });

      // user is found and password is correct, generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('x_auth_exp', user.tokenExp);
        res.cookie('x_auth', user.token).status(200).json({
          success: true,
          userId: user._id
        });
      });
    });
  });
});

// @route   GET users/logout
// @desc    Logout existing user
// @access  Private
router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '', tokenExp: '' },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true, user: user });
    }
  );
});

module.exports = router;
