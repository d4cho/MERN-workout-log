const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    postId: {
      type: String
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  },
  { timestamps: true }
);

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = Dislike;
