const express = require("express");
const router = express.Router();

var path = require("path");
var multer = require("multer");
var absolutePath = path.resolve("./uploads/");
var upload = multer({ dest: absolutePath });
var File = require("../models/File");
const { isAuth } = require("../middlewares/Auth/CheckAuth");

router.post("/file", isAuth, upload.single("file"), (req, res) => {
  console.log(req.file, req.body.acsses);
  File.create({
    name: req.file.originalname,
    path: req.file.path,
    type: req.file.mimetype,
    size: req.file.size,
    ownerId: req.user.id,
    FolderId: req.body.FolderId,
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

module.exports = router;
