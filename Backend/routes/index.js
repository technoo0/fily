const express = require("express");
const { isAuth } = require("../middlewares/Auth/CheckAuth");
const router = express.Router();

router.get("/", isAuth, (req, res, next) => {
  res.json({ msg: "OK", user: req.user });
});

module.exports = router;
