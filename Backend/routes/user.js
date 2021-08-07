const express = require("express");
const passport = require("passport");
const router = express.Router();
const Eamil = require("../Email/sendEmailTo");
const registerCb = require("../middlewares/Auth/register");
const LoginMW = require("../middlewares/Auth/login");
const UpdateMW = require("../middlewares/Auth/UpdateData");
const { isAuth } = require("../middlewares/Auth/CheckAuth");
const {
  SendForgetEmail,
  ResetPassword,
} = require("../middlewares/Auth/Forget");
router.post("/login", LoginMW, (req, res, next) => {
  console.log(req.body);
  res.json({ msg: "OK" });
});

router.post("/register", registerCb, (req, res, next) => {
  res.json({ msg: "OK" });
});

router.post("/ForgetPass", SendForgetEmail, (req, res, next) => {
  res.json({ msg: "OK" });
});
router.post("/ResetPass", ResetPassword, (req, res, next) => {
  res.json({ msg: "OK" });
});

router.post("/logout", (req, res, next) => {
  req.logout();
  res.json({ msg: "You are loged out" });
});
router.get("/sendemail", (req, res, next) => {
  Eamil()
    .then((u) => {
      console.log(u);
      res.json({ msg: "email sens" });
    })
    .catch((e) => {
      console.log(e);
      res.json({ msg: "email not sens" });
    });
});

router.post("/updateData", isAuth, UpdateMW, (req, res, next) => {
  console.log(req.body);
  res.json({ msg: "OK" });
});

module.exports = router;
