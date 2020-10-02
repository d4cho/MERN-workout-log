const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    userId: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    category: {
      type: Number,
      default: 1
    },
    views: {
      type: Number,
      default: 0
    },
    images: {
      type: Array,
      default: []
    },
    videoFilePath: {
      type: String
    }
  },
  { timestamps: true }
);

// this part is to enable search by text in .find()
// need to create text index
postSchema.index({
  title: 'text',
  description: 'text'
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
