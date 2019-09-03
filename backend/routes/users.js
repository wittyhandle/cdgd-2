let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();

router.post('/authenticate', function(req, res, next) {

  const USERS = [
    {username: 'Mike', password: 'secret'}
  ];

  let user = USERS.find(u => u.username === req.body.username && u.password === req.body.password);
  if (!user) {
    res.status('401').json({success: false, message: 'Invalid Credentials'});
  } else {

    const token = jwt.sign({ data: user.username }, 'secret', { expiresIn: '1h' });

    res.json({success: true, data: {message: 'Successful Login', token}});
  }
});

module.exports = router;
