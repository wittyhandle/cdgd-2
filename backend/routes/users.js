let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let isAuthenticated = require('../middleware/auth');
let user = require('../models/User');

const EXPIRATION = '30m';
const SECRET = 'secret';

const USERS = [
  {username: 'Mike', password: 'secret'}
];

router.get('/', (req, res, next) => {

  user.getUsers().then(users => {
    res.json({
      success: true,
      users
    });
  }).catch(next);

});

router.post('/authenticate', function(req, res, next) {

  let user = USERS.find(u => u.username === req.body.username && u.password === req.body.password);
  if (!user) {
    res.status('401').json({success: false, message: 'Invalid Credentials'});
  } else {

    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: EXPIRATION });

    res.json({
      success: true,
      token,
      message: 'Successful Login',
      username: user.username
    });
  }
});

router.get('/verify/:token', function (req, res, next) {

  try {

    const token = req.params.token;
    let decoded = jwt.verify(token, SECRET);

    res.json({success: true, data: {message: 'Valid token', decoded}});

  } catch(err)  {
    res.status('401').json({success: false, message: 'JWT token has expired'});
  }

});

router.get('/unique/:username', isAuthenticated, (req, res, next) => {

  user.getUserByUsername(req.params.username).then(count => {
    res.json({
      success: true,
      data: { unique: count[0]['u'] === 0 }});
  }).catch(next);
});

router.post('/new', isAuthenticated, (req, res, next) => {

  const {user: newUser} = req.body;
  user.createUser(newUser).then(r => {
    res.json({success: true, id: r[0]});
  }).catch(next);

});

module.exports = router;
