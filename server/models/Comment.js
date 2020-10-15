const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: String
    },
    replyToCommentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
