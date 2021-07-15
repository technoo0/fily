const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");

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
    salt: {
      type: DataTypes.STRING,
    },
    hash: {
      type: DataTypes.STRING,
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
    PasswordRetry: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
