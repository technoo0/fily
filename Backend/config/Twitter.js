const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const User = require("../models/user");
const { Op } = require("sequelize");
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.BACKEND_URL + "/auth/twitter/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({
        where: {
          [Op.and]: [{ id: profile.id }, { strategy: "twitter" }],
        },
      })
        .then((user) => {
          if (!user) {
            User.create({
              Name: profile.displayName,
              email: "twitter.com/" + profile.username,
              id: profile.id,
              strategy: "twitter",
            }).then((user) => {
              return cb(null, user);
            });
          } else {
            return cb(null, user);
          } //the email not regestred
        })
        .catch((err) => {
          cb(err);
          console.log("rrrrrrrrrr");
        });
      console.log(profile);
      cb(null, profile);
    }
  )
);
