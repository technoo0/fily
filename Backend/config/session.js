const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./database");
const mysession = session({
  secret: "keyboard cat",
  store: new SequelizeStore({
    db: sequelize,
  }),
  saveUninitialized: true,
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  proxy: true, // if you do SSL outside of node.
});

sequelize.sync();

module.exports = mysession;
