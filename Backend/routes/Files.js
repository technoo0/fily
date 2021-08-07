const express = require("express");
const router = express.Router();
var multer = require("multer");
var File = require("../models/File");
const { isAuth } = require("../middlewares/Auth/CheckAuth");
var path = require("path");
var absolutePath = path.resolve("./uploads/");

var upload = multer({ dest: absolutePath });

router.post("/upload", isAuth, upload.single("file"), (req, res) => {
  console.log(req.file, req.body.acsses);
  File.create({
    name: req.file.originalname,
    path: req.file.path,
    type: req.file.mimetype,
    size: req.file.size,
    ownerId: req.user.id,
    ownerPath: req.body.path,
    acsses: req.body.acsses,
  })
    .then((file) => {
      console.log(file);
      res.json(file.id);
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

router.get("/download", (req, res) => {
  const file = path.resolve("./uploads/1ff11a9074c77981c84b3bfbf46778f0.jpg");
  console.log(file);
  res.download(file); // Set disposition and send it.
});

module.exports = router;
