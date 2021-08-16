const File = require("../models/File");

const { Op } = require("sequelize");

module.exports = async (FolderId, Name) => {
  try {
    const res = await File.findOne({
      where: {
        [Op.and]: [{ name: Name }, { FolderId: FolderId }],
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
