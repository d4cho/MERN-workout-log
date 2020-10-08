const express = require('express');
const router = express.Router();

const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth');
const { json } = require('body-parser');

//=================================
//             Favorites
//=================================

// @route   POST favorites/checkIfFavorite
// @desc    check if the post is already favorited
// @access  private
router.post('/checkIfFavorite', auth, (req, res) => {
  Favorite.find({ postId: req.body.postId, userId: req.body.userId }).exec(
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

// @route   POST favorites/addToFavorites
// @desc    add a post to favorites
// @access  private
router.post('/addToFavorites', auth, (req, res) => {
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
router.post('/removeFromFavorites', auth, (req, res) => {
  Favorite.findOneAndDelete({
    postId: req.body.postId,
    userId: req.body.userId
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// @route   POST favorites/getFavorites
// @desc    get favorite posts list
// @access  private
router.post('/getFavorites', auth, (req, res) => {
  Favorite.find({ userId: req.body.userId })
    .populate('postId')
    .populate('postWriterId')
    .exec((err, favorites) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, favorites });
    });
});

module.exports = router;
