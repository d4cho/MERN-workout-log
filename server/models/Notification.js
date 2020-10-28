const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = mongoose.Schema(
  {
    notificationFromUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    notificationToUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    },
    likeId: {
      type: Schema.Types.ObjectId,
      ref: 'Like'
    },
    dislikeId: {
      type: Schema.Types.ObjectId,
      ref: 'Dislike'
    },
    followedByUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    seenByUser: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
