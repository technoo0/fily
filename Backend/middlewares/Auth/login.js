const passport = require("passport");
module.exports = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(404).json(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return next();
    });
  })(req, res, next);
};
