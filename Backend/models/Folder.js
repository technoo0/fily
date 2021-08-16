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
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
Folder.sync();

module.exports = Folder;
