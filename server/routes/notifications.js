const express = require('express');
const router = express.Router();

const Notification = require('../models/Notification');
const auth = require('../middleware/auth');
const { json } = require('body-parser');

//=================================
//             Notification
//=================================

// @route   POST posts/createNotification
// @desc    create a notification
// @access  public
router.post('/createNotification', (req, res) => {
  let dataToSubmit = {
    notificationFromUserId: req.body.notificationFromUserId,
    notificationToUserId: req.body.notificationToUserId
  };

  if (req.body.postId) {
    dataToSubmit.postId = req.body.postId;
  } else if (req.body.commentId) {
    dataToSubmit.commentId = req.body.commentId;
  } else if (req.body.likeId) {
    dataToSubmit.likeId = req.body.likeId;
  } else if (req.body.dislikeId) {
    dataToSubmit.dislikeId = req.body.dislikeId;
  }

  const notification = new Notification(dataToSubmit);

  notification.save((err, notification) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      notification
    });
  });
});

module.exports = router;
