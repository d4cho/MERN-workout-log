const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    token: {
      type: String
    },
    tokenExp: {
      type: Number
    }
  },
  { timestamps: true }
);

// create a hashed password for user
userSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    console.log('password changed');
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

// create instance method to verify password on login
userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

// create instance method to generate token on login
userSchema.methods.generateToken = function (callback) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), 'secret');
  let oneHour = moment().add(1, 'hour').valueOf();

  user.token = token;
  user.tokenExp = oneHour;
  user.save((err, user) => {
    if (err) return callback(err);
    return callback(null, user);
  });
};

// create static function in model to authenticate by token
userSchema.statics.findByToken = function (token, callback) {
  let user = this;

  jwt.verify(token, 'secret', function (err, decoded) {
    user.findOne({ _id: decoded, token }, (err, user) => {
      if (err) return callback(err);
      return callback(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
