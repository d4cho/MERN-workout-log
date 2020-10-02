const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { json } = require('body-parser');

//=================================
//             Posts
//=================================

// @route   POST posts/createPost
// @desc    create a post
// @access  private
router.post('/createPost', auth, (req, res) => {
  const { title, description, category, images, videos } = req.body;

  let dataToSubmit = {
    writer: req.user._id,
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

// @route   POST posts/getPosts
// @desc    get posts from server
// @access  public
router.post('/getPosts', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  // to find by search term
  let searchTerm = req.body.search;

  // to find by filter
  let filterResult = {};
  if (req.body.filter) {
    filterResult = { category: req.body.filter };
  }

  if (searchTerm) {
    Post.find(filterResult)
      .find({ $text: { $search: searchTerm } })
      .sort([['createdAt', -1]])
      .skip(skip)
      .limit(limit)
      .populate('writer')
      .exec((err, posts) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, posts });
      });
  } else {
    Post.find(filterResult)
      .sort([['createdAt', -1]])
      .skip(skip)
      .limit(limit)
      .populate('writer')
      .exec((err, posts) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, posts });
      });
  }
});

module.exports = router;
