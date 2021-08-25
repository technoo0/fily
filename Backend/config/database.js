const { Sequelize } = require("sequelize");
let sequelize;
if (process.env.NODE_ENV == "production") {
  console.log("we are production -*-*-*-*-**-*-*-*-*");
  try {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: true,
      },
    });
  } catch (e) {
    console.log(e);
  }
} else {
  try {
    sequelize = new Sequelize(
      process.env.DATABASE,
      process.env.DATABASE_USERNAME,
      process.env.DATABASE_PASS,
      {
        host: process.env.DATABASEHOST || "localhost",
        port: process.env.DATABASEPORT || null,
        dialect: "postgres",

        ssl: true,
      }
    );
  } catch (e) {
    console.log(e);
  }
}

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
