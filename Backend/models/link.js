const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");
const Link = sequelize.define(
  "Link",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },

    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    acsses: {
      type: DataTypes.STRING,
      defaultValue: "public",
      allowNull: false,
    },
    FileId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
Link.sync({});

module.exports = Link;
