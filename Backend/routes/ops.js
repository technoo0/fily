const express = require("express");
const router = express.Router();
var File = require("../models/File");
const Folder = require("../models/Folder");
const { isAuth } = require("../middlewares/Auth/CheckAuth");
const { Op } = require("sequelize");
const CheckIfNameExits = require("../utils/CheckifNameExits");
const folderOps = require("./folderOps");
//Folder
router.post("/CreateFolder", isAuth, (req, res) => {
  Folder.findOne({
    where: {
      [Op.and]: [
        { parentId: req.body.ParentId },
        { ownerId: req.user.id },
        { name: req.body.name },
      ],
    },
  })
    .then((folders) => {
      if (folders) {
        console.log(folders);
        res.status(400);
        res.json({ msg: "name error" });
      } else {
        Folder.create({
          name: req.body.name,
          parentId: req.body.ParentId,
          ownerId: req.user.id,
        })
          .then((Folder) => {
            console.log(Folder);
            res.json({ id: Folder.id });
          })
          .catch((e) => {
            console.log(e);
            res.status(400);
          });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

router.use("/folder", folderOps);

//File Ops

//Delet File

router.post("/deletfile", isAuth, (req, res) => {
  File.findOne({
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

router.post("/Renamefile", isAuth, (req, res) => {
  File.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((File) => {
      if (File) {
        CheckIfNameExits(File.FolderId, req.body.name).then((gg) => {
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

router.post("/Movefile", isAuth, (req, res) => {
  File.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((File) => {
      CheckIfNameExits(File.FolderId, req.body.name).then((gg) => {
        if (File) {
          if (gg) {
            res.status(400);
            res.json({ msg: "name already exits" });
          } else {
            console.log(File);
            File.FolderId = req.body.folderId;
            File.save().then(() => {
              res.json({ msg: "OK" });
            });
          }
        }
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

//Create ShortCut

router.post("/Copyfile", isAuth, (req, res) => {
  File.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((myFile) => {
      if (myFile) {
        console.log(myFile);
        File.create({
          name: myFile.name,
          path: myFile.path,
          type: myFile.type,
          size: myFile.size,
          ownerId: req.user.id,
          FolderId: req.body.folderId,
          acsses: myFile.acsses,
        })
          .then((newFile) => {
            res.json({ msg: "OK" });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

router.post("/AddToFav", isAuth, (req, res) => {
  File.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((myFile) => {
      if (myFile) {
        myFile.Favorite = true;
        myFile.save().then(() => {
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
  File.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { ownerId: req.user.id }],
    },
  })
    .then((myFile) => {
      if (myFile) {
        myFile.Favorite = false;
        myFile.save().then(() => {
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
