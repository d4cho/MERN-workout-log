const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

//=================================
//             Comments
//=================================

// @route   GET comments/comment
// @desc    get comments
// @access  private
router.get('/comments', (req, res) => {
  let findParameters = {
    postId: req.query.postId
  };

  if (req.query.replyToCommentId) {
    findParameters = {
      replyToCommentId: req.query.replyToCommentId
    };
  }
  Comment.find(findParameters)
    .sort([['createdAt', -1]])
    .populate('writer')
    .populate('replyToCommentId')
    .exec((err, comments) => {
      if (err) return req.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, comments });
    });
});

// @route   POST comments/comments
// @desc    create a comment
// @access  private
router.post('/comments', auth, (req, res) => {
  let dataToSubmit = {
    postId: req.body.postId,
    writer: req.user._id,
    content: req.body.content
  };

  if (req.body.replyToCommentId) {
    dataToSubmit = {
      replyToCommentId: req.body.replyToCommentId,
      writer: req.user._id,
      content: req.body.content
    };
  }

  const comment = new Comment(dataToSubmit);

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });

    Post.find({ _id: req.body.postId })
      .select('writer')
      .exec((err, writerOfPost) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, comment, writerOfPost });
      });
  });
});

module.exports = router;
