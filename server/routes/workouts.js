const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const User = require('../models/User');
const auth = require('../middleware/auth');

//=================================
//             Workouts
//=================================

// @route   POST workouts/postWorkout
// @desc    post a workout
// @access  private
router.post('/postWorkout', auth, (req, res) => {
  let exercisesData = {};

  // put exercise information from request into Workout collection
  exercisesData.userId = req.user._id;

  exercisesData.exercises = req.body.map((exercise) => {
    return {
      name: exercise.name,
      info: exercise.info
    };
  });

  const workout = new Workout(exercisesData);
  workout.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      doc,
      msg: 'Workout successfully uploaded!'
    });
  });
});

// @route   GET workouts/getLogs
// @desc    get all logs
// @access  private
router.get('/getLogs', auth, (req, res) => {
  Workout.find({ userId: req.user._id })
    .sort({ createdAt: 'desc' })
    .exec((err, workouts) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, err, msg: 'failed to get logs' });
      return res.status(200).json({ success: true, workouts });
    });
});

// @route   DELETE workouts/deleteWorkout
// @desc    delete a workout
// @access  private
router.post('/deleteWorkout', auth, (req, res) => {
  Workout.findOneAndDelete({
    _id: req.body.workoutId
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false });
    res.status(200).json({ success: true, doc, msg: 'Workout deleted!' });
  });
});

module.exports = router;
