let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();

const EXPIRATION = '10m';
const SECRET = 'secret';

router.post('/authenticate', function(req, res, next) {

  const USERS = [
    {username: 'Mike', password: 'secret'}
  ];

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

module.exports = router;
