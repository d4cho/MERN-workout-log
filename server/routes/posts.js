const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

//=================================
//             Posts
//=================================

// @route   POST workouts/postWorkout
// @desc    post a workout
// @access  private
router.post('/createPost', auth, (req, res) => {
  const { title, description, category, images, videos } = req.body;

  let dataToSubmit = {
    userId: req.user._id,
    title,
    description,
    category,
    images,
    videoFilePath: videos[0]
  };

  const post = new Post(dataToSubmit);

  post.save((err, post) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      post,
      msg: 'Post successfully uploaded!'
    });
  });
});

module.exports = router;
