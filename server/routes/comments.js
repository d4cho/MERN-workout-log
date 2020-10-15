const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

//=================================
//             Comments
//=================================

// @route   POST comments/getComments
// @desc    create a comment
// @access  private
router.post('/getComments', (req, res) => {
  console.log(req.body.replyToCommentId);

  let findParameters = {
    postId: req.body.postId
  };

  if (req.body.replyToCommentId) {
    findParameters = {
      replyToCommentId: req.body.replyToCommentId
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

// @route   POST comments/createComment
// @desc    create a comment
// @access  private
router.post('/createComment', auth, (req, res) => {
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
    return res.status(200).json({ success: true, comment });
  });
});

module.exports = router;
