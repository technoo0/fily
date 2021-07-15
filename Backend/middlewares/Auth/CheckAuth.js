module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("good to go ");
    next();
  } else {
    res.status(401).json({ msg: "Please Login" });
  }
};
