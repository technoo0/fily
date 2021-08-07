const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");
const LocalUser = require("./LocalUser");
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    strategy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UID: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
sequelize.sync();

module.exports = User;
