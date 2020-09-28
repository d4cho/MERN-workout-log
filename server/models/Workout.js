const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = mongoose.Schema(
  {
    userId: {
      type: String
    },
    exercises: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
