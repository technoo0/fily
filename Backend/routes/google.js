const express = require("express");
const router = express.Router();
const passport = require("passport");
const { combineTableNames } = require("sequelize/types/lib/utils");
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("https://www.fily.tech");
  }
);
module.exports = router;
