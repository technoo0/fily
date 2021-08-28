const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", passport.authenticate("twitter"));

router.get(
  "/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("https://www.fily.tech");
  }
);

module.exports = router;
