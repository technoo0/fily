const express = require("express");
const router = express.Router();
var File = require("../models/File");
const Folder = require("../models/Folder");
const { isAuth } = require("../middlewares/Auth/CheckAuth");
const { Op } = require("sequelize");
const CheckIfFolderNameExits = require("../utils/CheckIfFolderNameExits");

//Delet Folder

router.post("/deletfolder", isAuth, (req, res) => {
  Folder.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((File) => {
      if (File) {
        console.log(File);
        File.destroy().then(() => {
          res.json({ msg: "OK" });
        });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

//Rename File

router.post("/Renamefolder", isAuth, (req, res) => {
  Folder.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((File) => {
      if (File) {
        CheckIfFolderNameExits(File.parentId, req.body.name).then((gg) => {
          if (gg) {
            res.status(400);
            res.json({ msg: "name already exits" });
          } else {
            console.log(File);
            File.name = req.body.name;
            File.save().then(() => {
              res.json({ msg: "OK" });
            });
          }
        });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

//Move File

router.post("/Movefolder", isAuth, (req, res) => {
  Folder.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((folder) => {
      if (folder) {
        CheckIfFolderNameExits(folder.parentId, req.body.name).then((gg) => {
          if (gg) {
            res.status(400);
            res.json({ msg: "name already exits" });
          } else {
            console.log(folder);
            folder.parentId = req.body.folderId;
            folder.save().then(() => {
              res.json({ msg: "OK" });
            });
          }
        });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

//Create ShortCut

router.post("/Copyfolder", isAuth, (req, res) => {
  Folder.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((myFile) => {
      if (myFile) {
        //TODO :add shortcut logic
        console.log(myFile);
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

router.post("/AddToFav", isAuth, (req, res) => {
  Folder.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((myFolder) => {
      if (myFolder) {
        myFolder.Favorite = true;
        myFolder.save().then(() => {
          res.json({ msg: "OK" });
        });
      } else {
        console.log(e);
        res.status(404);
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

router.post("/RemoveFromFav", isAuth, (req, res) => {
  Folder.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((myFolder) => {
      if (myFolder) {
        myFolder.Favorite = false;
        myFolder.save().then(() => {
          res.json({ msg: "OK" });
        });
      } else {
        console.log(e);
        res.status(404);
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

module.exports = router;
