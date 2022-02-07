const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");

const LocalUser = sequelize.define(
  "LocalUser",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    PasswordRetry: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    IsLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    LockedUntil: {
      type: DataTypes.DATE,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
LocalUser.sync();

module.exports = LocalUser;
