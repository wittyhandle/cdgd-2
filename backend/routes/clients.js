const express = require("express");
const isAuthenticated = require("../middleware/auth");
const Client = require("../models/Client");

const router = express.Router();

router.get(
  "/:limit/:offset/:order/:direction",
  isAuthenticated,
  (req, res, next) => {
    const countCall = Client.getClientCount();

    const { limit, offset, order, direction } = req.params;
    const clientCall = Client.getClients(
      Number(limit),
      Number(offset),
      order,
      direction
    );

    Promise.all([countCall, clientCall])
      .then(values => {
        const clients = { count: values[0][0].i, items: values[1] };
        res.json({
          success: true,
          clients
        });
      })
      .catch(next);
  }
);

router.post("/new", isAuthenticated, (req, res, next) => {
  const { client } = req.body;
  Client.create(client)
    .then(r => {
      res.json({ success: true, id: r[0] });
    })
    .catch(next);
});

module.exports = router;
