const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const { comparePassword } = require("./password");

const StrategyCb = (email, password, cd) => {
  console.log("loging in ...");
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return cd(null, false, { message: "That email is not registered" });
      } //the email not regestred

      const IsValid = comparePassword(password, user.hash, user.salt);

      if (IsValid) {
        User.update({ PasswordRetry: 0 }, { where: { email: email } });
        console.log("user is loged in ");
        return cd(null, user);
      } else {
        if (user.PasswordRetry == 6) {
          return cd(null, false, { message: "Too Many Password Retrys" });
        } else {
          User.increment("PasswordRetry", { by: 1, where: { email: email } });

          return cd(null, false, { message: "Password incorrect" });
        }
      }
    })
    .catch((err) => {
      cd(err);
      console.log("rrrrrrrrrr");
    });
};

const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  StrategyCb
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findOne({ where: { id: userId } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
