let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');

let users = require('./routes/users');
let admin = require('./routes/admin');

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/users', users);
app.use('/api/v1/admin', admin);

// our own error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        success: false,
        error: err.message
    });
});

module.exports = app;
