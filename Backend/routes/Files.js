const express = require("express");
const router = express.Router();

var File = require("../models/File");
const { isAuth } = require("../middlewares/Auth/CheckAuth");

const { Op } = require("sequelize");

const Folder = require("../models/Folder");

// router.get("/download", (req, res) => {
//   const file = path.resolve("./uploads/1ff11a9074c77981c84b3bfbf46778f0.jpg");
//   console.log(file);
//   res.download(file); // Set disposition and send it.
// });

router.get("/MainFolderId", isAuth, (req, res) => {
  Folder.findOne({
    where: {
      [Op.and]: [{ parent: true }, { ownerId: req.user.id }, { name: "Home" }],
    },
  })
    .then((folder) => {
      if (folder) {
        res.json({ msg: folder.id });
      } else {
        res.status(404);
        res.json({ msg: "error folder not found" });
      }
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

router.get("/FavoriteFolders", isAuth, (req, res) => {
  Folder.findAll({
    attributes: ["id", "acsses", "createdAt", "name", "updatedAt", "Favorite"],
    where: {
      [Op.and]: [{ Favorite: true }, { ownerId: req.user.id }],
    },
  })
    .then((folders) => {
      if (folders) {
        res.json({ files: folders });
      } else {
        res.status(404);
        res.json({ msg: "error folder not found" });
      }
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

router.get("/FavoriteFiles", isAuth, (req, res) => {
  File.findAll({
    attributes: [
      "id",
      "acsses",
      "createdAt",
      "name",
      "size",
      "type",
      "updatedAt",
      "Favorite",
    ],
    where: {
      [Op.and]: [{ Favorite: true }, { ownerId: req.user.id }],
    },
  })
    .then((folders) => {
      if (folders) {
        res.json({ files: folders });
      } else {
        res.status(404);
        res.json({ msg: "error folder not found" });
      }
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

router.get("/recentlyadded", isAuth, (req, res) => {
  File.findAll({
    attributes: [
      "id",
      "acsses",
      "createdAt",
      "name",
      "size",
      "type",
      "updatedAt",
      "Favorite",
    ],
    where: {
      ownerId: req.user.id,
    },
    order: [["createdAt", "DESC"]],
    limit: 5,
  })
    .then((files) => {
      res.json({ files: files });
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

router.get("/files/:folderid", isAuth, (req, res) => {
  var folderid = req.params.folderid;
  File.findAll({
    attributes: [
      "id",
      "acsses",
      "createdAt",
      "name",
      "size",
      "type",
      "updatedAt",
      "Favorite",
    ],
    where: {
      [Op.and]: [{ FolderId: folderid }, { ownerId: req.user.id }],
    },
  })
    .then((files) => {
      res.json({ files: files, mainId: folderid });
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

router.get("/folders/:folderid", isAuth, (req, res) => {
  var folderid = req.params.folderid;
  Folder.findAll({
    attributes: ["id", "acsses", "createdAt", "name", "updatedAt", "Favorite"],
    where: {
      [Op.and]: [{ parentId: folderid }, { ownerId: req.user.id }],
    },
  })
    .then((files) => {
      res.json({ files: files });
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

router.get("/folderdata/:folderid", isAuth, (req, res) => {
  var folderid = req.params.folderid;
  Folder.findOne({
    attributes: ["id", "acsses", "createdAt", "name", "updatedAt", "Favorite"],
    where: {
      [Op.and]: [{ id: folderid }, { ownerId: req.user.id }],
    },
  })
    .then((files) => {
      res.json({ msg: files });
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

module.exports = router;
