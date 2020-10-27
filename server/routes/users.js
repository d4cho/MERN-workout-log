const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const multer = require('multer');

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
    image: req.user.image,
    weight: req.user.weight,
    squat: req.user.squat,
    bench: req.user.bench,
    deadlift: req.user.deadlift
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
      return res.status(200).json({ success: true });
    }
  );
});

// @route   POST users/setStats
// @desc    set user stats
// @access  private
router.post('/setStats', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.userId },
    {
      weight: req.body.weight,
      squat: req.body.squat,
      bench: req.body.bench,
      deadlift: req.body.deadlift,
      image: req.body.image
    },
    { new: true },
    (err, user) => {
      let stats = {
        weight: user.weight,
        squat: user.squat,
        bench: user.bench,
        deadlift: user.deadlift,
        image: user.image
      };

      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true, stats });
    }
  );
});

// @route   GET users/getStats
// @desc    Get user stats from database
// @access  Public
router.get('/getStats', (req, res) => {
  User.findOne({ _id: req.query.userId })
    .select('-password -token -tokenExp') // to exclude from response
    .exec((err, user) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, user });
    });
});

// to upload images:
let storage = multer.diskStorage({
  // where files will be saved
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // how file names will be saved as
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png' || ext !== '.mp4') {
      return cb(
        res.status(400).end('Only .jpg, .png, or .mp4 files are allowed'),
        false
      );
    }
    cb(null, true);
  }
});

let upload = multer({ storage: storage }).single('file');

// @route   Post users/uploadImage
// @desc    post an image
// @access  Public
router.post('/uploadFile', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ succes: false, err });
    return res.json({
      success: true,
      file: res.req.file.path,
      filename: res.req.file.filename
    });
  });
});

// @route   Post users/follow
// @desc    follow a user
// @access  private
router.post('/follow', auth, (req, res) => {
  // Update profile owners followers list
  User.findOneAndUpdate(
    { _id: req.body.profileOwnerUserId },
    {
      followers: req.body.followersList
    },
    { new: true },
    (err, profileUser) => {
      if (err) return res.json({ success: false, err });
      // return res.status(200).json({ success: true, user });

      // Update users following list
      let newFollowingList = [];
      let oldFollowingList = req.user.following;
      if (oldFollowingList.includes(req.body.profileOwnerUserId)) {
        newFollowingList = oldFollowingList.filter(
          (userId) => userId !== req.body.profileOwnerUserId
        );
      } else {
        newFollowingList = oldFollowingList.concat(req.body.profileOwnerUserId);
      }
      User.findOneAndUpdate(
        { _id: req.user._id },
        { following: newFollowingList },
        { new: true },
        (err, user) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, profileUser });
        }
      );
    }
  );
});

// @route   POST users/getStats
// @desc    Get user profile info from database
// @access  Public
router.post('/getUserProfileInfo', (req, res) => {
  User.findOne({ _id: req.body.userId })
    .select('-password -token -tokenExp') // to exclude from response
    .exec((err, user) => {
      console.log(user);
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, user });
    });
});

module.exports = router;
