const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const EXPIRATION = '30m';
const SECRET = 'secret';

router.get('/:limit/:offset/:order/:direction', isAuthenticated, (req, res, next) => {
  
  const countCall = User.getUserCount();
  
  const { limit, offset, order, direction } = req.params;
  const userCall = User.getUsers(Number(limit), Number(offset), order, direction);
  
  Promise.all([countCall, userCall]).then((values) => {
    const users = { count: values[0][0]['u'], items: values[1] };
    res.json({
      success: true,
      users
    });
  }).catch(next);
  
});

router.post('/authenticate', (req, res, next) => {

  const { username, password } = req.body;

  User.getPasswordByUsername(username).then(passwordHash => (
      passwordHash[0] && bcrypt.compare(password, passwordHash[0].password)
  )).then(matched => {
    if (matched) {
      const token = jwt.sign({ username: username }, SECRET, { expiresIn: EXPIRATION });

      User.getUserByUsername(username).then(user => {
        res.json({
          success: true,
          token,
          message: 'Successful Login',
          user: user[0]
        });
      });

    } else {
      res.status('401').json({success: false, message: 'Invalid Credentials'});
    }
  })
  .catch(next);

});

router.get('/verify/:token', (req, res, next) => {

  try {
    
    

    const token = req.params.token;
    console.log('and this is the token', token, '!');
    
    let decoded = jwt.verify(token, SECRET);

    res.json({success: true, data: {message: 'Valid token', decoded}});

  } catch(err)  {
    res.status('401').json({success: false, message: 'JWT token has expired'});
  }

});

router.get('/unique/:username', isAuthenticated, (req, res, next) => {

  User.getUserCountByUsername(req.params.username).then(count => {
    res.json({
      success: true,
      data: { unique: count[0]['u'] === 0 }});
  }).catch(next);
});

router.post('/new', isAuthenticated, (req, res, next) => {

  const {user} = req.body;

  bcrypt.hash(user.password, 15).then(hash => {

    user.password = hash;

    User.create(user).then(r => {
      res.json({success: true, id: r[0]});
    }).catch(next);

  });
});

module.exports = router;
