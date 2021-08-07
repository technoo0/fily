const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const LocalUser = require("../models/LocalUser");
const { comparePassword } = require("./password");
const { Op, where } = require("sequelize");
const moment = require("moment");
const StrategyCb = (email, password, cd) => {
  console.log("loging in ...");
  User.findOne({
    where: { [Op.and]: [{ email: email }, { strategy: "local" }] },
  })
    .then((user) => {
      if (!user) {
        return cd(null, false, { message: "That email is not registered" });
      } //the email not regestred
      LocalUser.findOne({ where: { id: user.id } }).then((Luser) => {
        if (Luser.IsLocked) {
          if (
            moment(Luser.LockedUntil).isAfter(moment.utc().format(), "second")
          ) {
            return cd(null, false, {
              message: `You are Locked untill ${Luser.LockedUntil}`,
            });
          } else {
            LocalUser.update(
              {
                IsLocked: false,
                LockedUntil: null,
              },
              { where: { id: user.id } }
            );
          }
        }
        const IsValid = comparePassword(password, Luser.hash, Luser.salt);

        if (IsValid) {
          LocalUser.update({ PasswordRetry: 0 }, { where: { id: user.id } });
          console.log("user is loged in ");
          return cd(null, user);
        } else {
          if (Luser.PasswordRetry == 3) {
            LocalUser.update(
              {
                IsLocked: true,
                LockedUntil: moment.utc().add(5, "m").format(),
                PasswordRetry: 0,
              },
              { where: { id: user.id } }
            );
            return cd(null, false, { message: "Too Many Password Retrys" });
          } else {
            LocalUser.increment("PasswordRetry", {
              by: 1,
              where: { id: user.id },
            });

            return cd(null, false, { message: "Password incorrect" });
          }
        }
      });
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
