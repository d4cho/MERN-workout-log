const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema(
  {
    userId: {
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
    }
  },
  { timestamps: true }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
