const express = require('express');
const router = express.Router();

const Notification = require('../models/Notification');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { json } = require('body-parser');

//=================================
//             Notification
//=================================

// @route   POST notifications/createNotification
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
  } else if (req.body.followedByUserId) {
    dataToSubmit.followedByUserId = req.body.followedByUserId;
  }

  const notification = new Notification(dataToSubmit);

  notification.save((err, notification) => {
    if (err) return res.json({ success: false, err });

    // need to update User notifications array
    User.findOneAndUpdate(
      { _id: req.body.notificationToUserId },
      { $push: { notifications: notification._id } },
      { new: true },
      (err, user) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.json({ success: true, notification });
      }
    );
  });
});

// @route   POST notifications/getNotifications
// @desc    get a notification
// @access  private
// router.post('/getNotifications', auth, (req, res) => {
//   Notification.findOne({ _id: req.body.notificationId })
//     .populate('notificationFromUserId')
//     .exec((err, notification) => {
//       if (err) return res.status(400).json({ success: false, err });
//       return res.status(200).json({ success: true, notification });
//     });
// });

// @route   POST notifications/updateNotificationSeen
// @desc    update notification seen
// @access  private
router.post('/updateNotificationSeen', auth, (req, res) => {
  Notification.findOneAndUpdate(
    { _id: req.body.notificationId },
    { seenByUser: true },
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    }
  );
});

// @route   POST notifications/removeNotification
// @desc    remove a notification
// @access  private
router.post('/removeNotification', auth, (req, res) => {
  // delete notification
  Notification.findByIdAndDelete({ _id: req.body.notificationId }).exec(
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });

      // update notification list for user
      User.findOneAndUpdate(
        { _id: req.user._id },
        // $pull operator used to delete ObjectId from array (mongoose)
        { $pull: { notifications: req.body.notificationId } },
        (err, user) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true });
        }
      );
    }
  );
});

module.exports = router;
