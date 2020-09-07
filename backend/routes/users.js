const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const bcrypt = require("bcrypt");
const isAuthenticated = require("../middleware/auth");
const User = require("../models/User");

const EXPIRATION = "300m";
const SECRET = "secret";

router.get(
  "/:limit/:offset/:order/:direction",
  isAuthenticated,
  (req, res, next) => {
    const countCall = User.getUserCount();

    const { limit, offset, order, direction } = req.params;
    const userCall = User.getUsers(
      Number(limit),
      Number(offset),
      order,
      direction
    );

    Promise.all([countCall, userCall])
      .then(values => {
        const users = { count: values[0][0].u, items: values[1] };
        res.json({
          success: true,
          users
        });
      })
      .catch(next);
  }
);

router.post("/authenticate", (req, res, next) => {
  const { username, password } = req.body;

  User.getPasswordByUsername(username)
    .then(
      passwordHash =>
        passwordHash[0] && bcrypt.compare(password, passwordHash[0].password)
    )
    .then(matched => {
      if (matched) {
        const token = jwt.sign({ username }, SECRET, {
          expiresIn: EXPIRATION
        });

        User.getUserByUsername(username).then(user => {
          res.json({
            success: true,
            token,
            message: "Successful Login",
            user: user[0]
          });
        });
      } else {
        res
          .status("401")
          .json({ success: false, message: "Invalid Credentials" });
      }
    })
    .catch(next);
});

router.get("/unique/:username", isAuthenticated, (req, res, next) => {
  User.getUserCountByUsername(req.params.username)
    .then(count => {
      res.json({
        success: true,
        data: { unique: count[0].u === 0 }
      });
    })
    .catch(next);
});

router.post("/new", isAuthenticated, (req, res, next) => {
  const { user } = req.body;

  bcrypt.hash(user.password, 15).then(hash => {
    user.password = hash;

    User.create(user)
      .then(r => {
        res.json({ success: true, id: r[0] });
      })
      .catch(next);
  });
});

router.delete("/bulk", isAuthenticated, (req, res, next) => {
  const { toDelete } = req.body;
  User.deleteUsers(toDelete)
    .then(() => {
      res.json({
        success: true,
        id: Number(req.params.id)
      });
    })
    .catch(next);
});

router.put("/update/:username", isAuthenticated, (req, res, next) => {
  const { user } = req.body;
  User.updateUser(req.params.username, user)
    .then(() => {
      res.json({
        success: true,
        username: req.params.username
      });
    })
    .catch(next);
});

router.put("/change-password", isAuthenticated, (req, res, next) => {
  const { username, oldPassword, newPassword } = req.body;
  User.getPasswordByUsername(username)
    .then(
      passwordHash =>
        passwordHash[0] && bcrypt.compare(oldPassword, passwordHash[0].password)
    )
    .then(matched => {
      if (matched) {
        bcrypt.hash(newPassword, 15).then(hash => {
          User.updateUser(username, { password: hash })
            .then(() => {
              res.json({
                success: true,
                message: "Password changed"
              });
            })
            .catch(next);
        });
      } else {
        res.json({
          success: false,
          message: "Old password is incorrect"
        });
      }
    })
    .catch(next);
});

module.exports = router;
