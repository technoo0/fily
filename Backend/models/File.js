const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");
const File = sequelize.define(
  "File",
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
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FolderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acsses: {
      type: DataTypes.STRING,
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
File.sync();

module.exports = File;
