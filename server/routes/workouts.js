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

  exercisesData.exercises = req.body.exercises.map((exercise) => {
    return {
      exerciseName: exercise.name,
      exerciseInfo: exercise.info
    };
  });

  const workout = new Workout(exercisesData);
  workout.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.json({ success: true, doc });
  });
});

module.exports = router;
