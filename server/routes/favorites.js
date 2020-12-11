const express = require('express');
const router = express.Router();

const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth');

//=================================
//             Favorites
//=================================

// @route   GET favorites/favorites/check
// @desc    check if the post is already favorited
// @access  private
// router.post('/checkIfFavorite', auth, (req, res) => {
//   Favorite.find({ postId: req.body.postId, userId: req.body.userId }).exec(
//     (err, favorite) => {
//       if (err) return res.status(400).json({ success: false, err });

//       //check if post is favorited or not
//       let result = false; // not favorited
//       if (favorite.length !== 0) {
//         result = true; // favorited
//       }

//       res.status(200).json({ success: true, favorited: result });
//     }
//   );
// });

router.get('/favorites/check', auth, (req, res) => {
  Favorite.find({ postId: req.query.postId, userId: req.query.userId }).exec(
    (err, favorite) => {
      if (err) return res.status(400).json({ success: false, err });

      //check if post is favorited or not
      let result = false; // not favorited
      if (favorite.length !== 0) {
        result = true; // favorited
      }

      res.status(200).json({ success: true, favorited: result });
    }
  );
});

// @route   POST favorites/favorites
// @desc    add a post to favorites
// @access  private
router.post('/favorites', auth, (req, res) => {
  const { userId, postId, userBy } = req.body;

  let dataToSubmit = {
    userId: req.user._id,
    postWriterId: userBy,
    postId
  };

  const favorite = new Favorite(dataToSubmit);

  favorite.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
});

// @route   POST favorites/removeFromFavorite
// @desc    remove a post from favorites list
// @access  private
// router.post('/removeFromFavorites', auth, (req, res) => {
//   Favorite.findOneAndDelete({
//     postId: req.body.postId,
//     userId: req.body.userId
//   }).exec((err, doc) => {
//     if (err) return res.status(400).json({ success: false, err });
//     return res.status(200).json({ success: true });
//   });
// });

router.delete('/favorites', auth, (req, res) => {
  console.log('here');
  Favorite.findOneAndDelete({
    postId: req.query.postId,
    userId: req.query.userId
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// @route   POST favorites/favorites
// @desc    get favorite posts list
// @access  private
router.get('/favorites', auth, (req, res) => {
  Favorite.find({ userId: req.query.userId })
    .populate('postId')
    .populate('postWriterId')
    .exec((err, favorites) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, favorites });
    });
});

module.exports = router;
