const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:4000/auth/twitter/callback",
    },
    function (token, tokenSecret, profile, cb) {
      //   User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      console.log(profile);
      cb(null, profile);
    }
  )
);
