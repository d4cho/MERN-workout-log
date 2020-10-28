const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const Dislike = require('../models/Dislike');
const auth = require('../middleware/auth');

//=================================
//             Like & Dislike
//=================================

// @route   POST likes/getLikes
// @desc    get number of likes
// @access  public
router.post('/getLikes', (req, res) => {
  let findBy = {};
  if (req.body.postId) {
    findBy = { postId: req.body.postId };
  } else {
    findBy = { commentId: req.body.commentId };
  }

  Like.find(findBy).exec((err, likes) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, likes });
  });
});

// @route   POST likes/getDislikes
// @desc    get number of dislikes
// @access  public
router.post('/getDislikes', (req, res) => {
  let findBy = {};
  if (req.body.postId) {
    findBy = { postId: req.body.postId };
  } else {
    findBy = { commentId: req.body.commentId };
  }

  Dislike.find(findBy).exec((err, dislikes) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, dislikes });
  });
});

// @route   POST likes/uplike
// @desc    up like count
// @access  public
router.post('/uplike', (req, res) => {
  let variables = {};
  if (req.body.postId) {
    variables = { postId: req.body.postId, userId: req.body.userId };
  } else {
    variables = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const like = new Like(variables);
  like.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });

    // in case dislike is already clicked by user, need to remove from dislike
    Dislike.findOneAndDelete(variables).exec((err, dislikeResult) => {
      if (err) return res.status(400).json({ success: false, err });

      Like.find({ _id: doc._id })
        .populate('postId')
        .exec((err, likeInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, likeInfo });
        });

      // return res.status(200).json({ success: true, likeInfo });
    });
  });
});

// @route   POST likes/downlike
// @desc    down like count
// @access  public
router.post('/downlike', (req, res) => {
  let variables = {};
  if (req.body.postId) {
    variables = { postId: req.body.postId, userId: req.body.userId };
  } else {
    variables = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Like.findOneAndDelete(variables).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// @route   POST likes/updislike
// @desc    up like count
// @access  public
router.post('/updislike', (req, res) => {
  let variables = {};
  if (req.body.postId) {
    variables = { postId: req.body.postId, userId: req.body.userId };
  } else {
    variables = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const dislike = new Dislike(variables);
  dislike.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });

    // in case like is already clicked by user, need to remove from like
    Like.findOneAndDelete(variables).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });
});

// @route   POST likes/downdislike
// @desc    down like count
// @access  public
router.post('/downdislike', (req, res) => {
  let variables = {};
  if (req.body.postId) {
    variables = { postId: req.body.postId, userId: req.body.userId };
  } else {
    variables = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Dislike.findOneAndDelete(variables).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
