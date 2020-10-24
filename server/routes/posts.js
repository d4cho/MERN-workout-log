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

// @route   POST posts/deletePost
// @desc    delete a post from server
// @access  private
router.post('/deletePost', auth, (req, res) => {
  Post.findByIdAndDelete({ _id: req.body.postId }).exec((err, doc) => {
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

// @route   GET posts/post_by_id
// @desc    get a post from server
// @access  public
router.get('/post_by_postId', (req, res) => {
  let postId = req.query.postId;

  Post.find({ _id: { $in: postId } })
    .populate('writer', '-password -token -tokenExp')
    .exec((err, post) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, post });
    });
});

// @route   POST posts/increaseView
// @desc    get a post from server
// @access  public
router.post('/increaseView', (req, res) => {
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
