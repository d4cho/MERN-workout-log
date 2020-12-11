const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { json } = require('body-parser');

//=================================
//             Posts
//=================================

// @route   POST posts/post
// @desc    create a post
// @access  private
router.post('/post', auth, (req, res) => {
  const { title, description, category, images, videos } = req.body;

  const followers = req.user.followers;

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
      followers,
      msg: 'Post successfully uploaded!'
    });
  });
});

// @route   DELETE posts/post/:postId
// @desc    delete a post from server
// @access  private
router.delete('/post/:postId', auth, (req, res) => {
  Post.findByIdAndDelete({ _id: req.params.postId }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
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

  // to find by most viewed
  let sortBy = [['createdAt', -1]];
  if (req.body.sortBy === 'popular') {
    sortBy = [['views', -1]];
  } else if (req.body.sortBy === 'oldest') {
    sortBy = [['createdAt', 1]];
  }

  // to find posts by userId
  // for posts in my profile page
  let findById = {};
  if (req.body.profilePageUserId) {
    findById = { userId: req.body.profilePageUserId };
  }

  if (searchTerm) {
    Post.find(findById)
      .find(filterResult)
      .find({ $text: { $search: searchTerm } })
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      // -password, etc, is to leave out those field on populate
      .populate('writer', '-password -token -tokenExp')
      .exec((err, posts) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, posts });
      });
  } else {
    Post.find(findById)
      .find(filterResult)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .populate('writer', '-password -token -tokenExp')
      .exec((err, posts) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, posts });
      });
  }
});

// @route   GET posts/post/:postId
// @desc    get a post from server
// @access  public
router.get('/post/:postId', (req, res) => {
  let postId = req.params.postId;

  Post.find({ _id: { $in: postId } })
    .populate('writer', '-password -token -tokenExp')
    .exec((err, post) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, post });
    });
});

// @route   PUT posts/increaseView
// @desc    increase post view by 1
// @access  public
router.put('/post', (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    { $inc: { views: req.body.incViewByOne } },
    { new: true },
    (err, post) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, post });
    }
  );
});

module.exports = router;
