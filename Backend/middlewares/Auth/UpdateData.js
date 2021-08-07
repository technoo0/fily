// {
//     Name: 'marwan foudass',
//     Email: 'marwanmf20s50@gmail.com',
//     Password: '012.3456asD'
//   }
const { genpassword } = require("../../config/password");
const User = require("../../models/user");
const { Op } = require("sequelize");
const LocalUser = require("../../models/LocalUser");

module.exports = (req, res, next) => {
  console.log(req.user.id);
  const UpdatePassword = () => {
    const { salt, hash } = genpassword(req.body.Password);
    LocalUser.update({ salt: salt, hash: hash }, { where: { id: req.user.id } })
      .then(() => {
        next();
      })
      .catch((e) => {
        res.status(400);
        return res.json({ error: e.message });
      });
  };

  if (req.body.Email) {
    User.findOne({
      where: {
        [Op.and]: [{ email: req.body.Email }, { strategy: "local" }],
      },
    })
      .then((user) => {
        if (user) {
          res.status(400);
          return res.json({ error: "Email" });
        } else {
          if (req.body.Name) {
            User.update(
              { Name: req.body.Name, email: req.body.Email },
              { where: { id: req.user.id } }
            )
              .then(() => {
                if (req.body.Password) {
                  UpdatePassword();
                } else {
                  next();
                }
              })
              .catch((e) => {
                res.status(400);
                return res.json({ error: e.message });
              });
          } else {
            User.update(
              { email: req.body.Email },
              { where: { id: req.user.id } }
            )
              .then(() => {
                if (req.body.Password) {
                  UpdatePassword();
                } else {
                  next();
                }
              })
              .catch((e) => {
                res.status(400);
                return res.json({ error: e.message });
              });
          }
        }
      })
      .catch((e) => {
        es.status(400);
        return res.json({ error: e.message });
      });
  } else {
    if (req.body.Name) {
      User.update({ Name: req.body.Name }, { where: { id: req.user.id } })
        .then(() => {
          if (req.body.Password) {
            UpdatePassword();
          } else {
            next();
          }
        })
        .catch((e) => {
          res.status(400);
          return res.json({ error: e.message });
        });
    } else {
      if (req.body.Password) {
        UpdatePassword();
      } else {
        next();
      }
    }
  }
};
