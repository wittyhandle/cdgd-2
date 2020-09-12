const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const pino = require("pino");
const expressPino = require("express-pino-logger");

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const expressLogger = expressPino({ logger });

const users = require("./routes/users");
const clients = require("./routes/clients");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressLogger);

app.use("/api/v1/users", users);
app.use("/api/v1/clients", clients);

// our own error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({
    success: false,
    message: err.message
  });
});

module.exports = app;
