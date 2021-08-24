const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");
const Folder = sequelize.define(
  "Folder",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    acsses: {
      type: DataTypes.STRING,
      defaultValue: "private",
      allowNull: false,
    },
    Favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    OpenMe: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

const File = require("./File");

Folder.afterDestroy(async (folderdata, options) => {
  // const hashedPassword = await hashPassword(user.password);
  // user.password = hashedPassword;
  if (folderdata.OpenMe == null) {
    File.findAll({ where: { FolderId: folderdata.id } }).then((fileArray) => {
      fileArray.forEach((file) => {
        file.destroy().then(() => {});
      });
    });
    Folder.findAll({ where: { OpenMe: folderdata.id } }).then(
      (foldersArray) => {
        foldersArray.forEach((folder) => {
          folder.destroy();
        });
      }
    );
  }
});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
Folder.sync({});

module.exports = Folder;
