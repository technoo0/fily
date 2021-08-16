import File from "../../models/File";
import Folder from "../../models/Folder";
const { Op } = require("sequelize");

module.exports = (req, res, next) => {
  Folder.findOne({
    where: {
      [Op.and]: [{ id: req.body.folderId }, { ownerId: req.user.id }],
    },
  }).then((folder) => {
    if (folder) {
      next();
    } else {
      res.status(404);
      res.json({ msg: "Folder Not Found" });
    }
  });
};
