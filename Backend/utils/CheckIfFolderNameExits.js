const Folder = require("../models/Folder");

const { Op } = require("sequelize");

module.exports = async (FolderId, Name) => {
  try {
    const res = await Folder.findOne({
      where: {
        [Op.and]: [{ name: Name }, { parentId: FolderId }],
      },
    });
    if (res) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};
