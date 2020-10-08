const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    postWriterId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  },
  { timestamps: true }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
