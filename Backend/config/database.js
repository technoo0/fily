const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASS,
  {
    host: process.env.DATABASEHOST || "localhost",
    port: process.env.DATABASEPORT || null,
    dialect: "postgres",
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connect();

module.exports = sequelize;
