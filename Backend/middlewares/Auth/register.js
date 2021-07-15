const { genpassword } = require("../../config/password");
const User = require("../../models/user");
const { Op } = require("sequelize");
const { uuid } = require("uuidv4");
module.exports = (req, res, next) => {
  User.findOne({
    where: {
      [Op.and]: [{ email: req.body.email }, { strategy: "local" }],
    },
  }).then((user) => {
    if (user) {
      res.status(400);
      return res.json({ error: "Email" });
    } else {
      const { salt, hash } = genpassword(req.body.password);
      User.create({
        Name: req.body.Name,
        email: req.body.email,
        salt: salt,
        hash: hash,
        strategy: "local",
        id: uuid(),
      }).then((user) => {
        console.log(user);
        next();
      });
    }
  });
};
