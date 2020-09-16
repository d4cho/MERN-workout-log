const User = require('../models/User');

// authentication middlware
let auth = (req, res, next) => {
  // get token from cookie
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    // this will be sent as request if using auth middleware
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = auth;
