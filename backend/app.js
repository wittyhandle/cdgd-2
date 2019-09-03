let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');

let users = require('./routes/users');

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/users', users);

module.exports = app;
