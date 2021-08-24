const express = require("express");
const router = express.Router();
var File = require("../models/File");
var Link = require("../models/link");
const Folder = require("../models/Folder");
const { isAuth } = require("../middlewares/Auth/CheckAuth");
const { Op } = require("sequelize");

router.post("/GetFileData", (req, res) => {
  Link.findOne({
    where: { id: req.body.id },
  }).then((linkdata) => {
    if (linkdata) {
      File.findOne({
        attributes: ["id", "createdAt", "name", "size", "type", "updatedAt"],
        where: {
          [Op.and]: [{ id: linkdata.FileId }, { acsses: "public" }],
        },
      })
        .then((myFile) => {
          //   console.log(myFile);
          if (myFile) {
            res.json({ file: myFile });
          } else {
            // console.log("ss");
            res.status(404);
            res.json({ error: "not Found" });
          }
        })
        .catch((e) => {
          console.log(e);
          res.status(400);
        });
    } else {
      res.status(404);
      res.json({ error: "not Found" });
    }
  });
});

router.get("/DownloadFile/:id", (req, res) => {
  var id = req.params.id;
  Link.findOne({
    where: { id: id },
  }).then((linkdata) => {
    if (linkdata) {
      File.findOne({
        where: {
          [Op.and]: [{ id: linkdata.FileId }, { acsses: "public" }],
        },
      })
        .then((myFile) => {
          //   console.log(myFile);
          if (myFile) {
            res.download(myFile.path, myFile.name);
          } else {
            // console.log("ss");
            res.status(404);
            res.json({ error: "not Found" });
          }
        })
        .catch((e) => {
          console.log(e);
          res.status(400);
        });
    } else {
      res.status(404);
      res.json({ error: "not Found" });
    }
  });
});

module.exports = router;
