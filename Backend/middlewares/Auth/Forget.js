const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { use } = require("../../routes/user");
const SendEmailTo = require("../../Email/sendEmailTo");
const { genpassword } = require("../../config/password");
const { Op } = require("sequelize");
const LocalUser = require("../../models/LocalUser");

const SendForgetEmail = (req, res, next) => {
  User.findOne({
    where: {
      [Op.and]: [{ email: req.body.email }, { strategy: "local" }],
    },
  }).then((user) => {
    if (user) {
      const scret = process.env.JWT_SECRET + user.hash;
      const payload = {
        email: user.email,
        id: user.id,
      };
      const token = jwt.sign(payload, scret, { expiresIn: "10m" });
      const link = `http://localhost:3000/ResetPassword/${user.id}/${token}`;
      SendEmailTo(user.email, link)
        .then(() => {
          next();
        })
        .catch((e) => {
          res.status(501);
          return res.json({ error: "SomeThing Worg" });
        });
    } else {
      res.status(404);
      return res.json({ error: "Email Not registered" });
    }
  });
};

const ResetPassword = (req, res, next) => {
  User.findOne({
    where: {
      [Op.and]: [{ id: req.body.id }, { strategy: "local" }],
    },
  })
    .then((user) => {
      if (user) {
        const secret = process.env.JWT_SECRET + user.hash;
        try {
          const payload = jwt.verify(req.body.token, secret);
          if (payload) {
            const { salt, hash } = genpassword(req.body.password);
            LocalUser.update(
              { salt: salt, hash: hash },
              { where: { id: req.body.id } }
            )
              .then(() => {
                next();
              })
              .catch((e) => {
                res.status(400);
                return res.json({ error: e.message });
              });
          }
        } catch (e) {
          res.status(400);
          return res.json({ error: e.message });
        }
      } else {
        res.status(404);
        return res.json({ error: "id not found" });
      }
    })
    .catch((e) => {
      res.status(500);
      return res.json({ error: "error" });
    });
};

module.exports = {
  SendForgetEmail,
  ResetPassword,
};
