let express = require('express');
let router = express.Router();
let isAuthenticated = require('../middleware/auth');

router.get('/works', isAuthenticated, function(req, res, next) {

    const works = [{id: 1, name: 'work 1'}, {id: 2, name: 'work 2'}];

    res.json({
        success: true,
        works
    });
});

module.exports = router;
