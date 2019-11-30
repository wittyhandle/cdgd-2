const express = require("express");
const isAuthenticated = require("../middleware/auth");
const Client = require("../models/Client");

const router = express.Router();

router.post("/new", isAuthenticated, (req, res, next) => {
  const { client } = req.body;
  Client.create(client)
    .then(r => {
      res.json({ success: true, id: r[0] });
    })
    .catch(next);
});

module.exports = router;
