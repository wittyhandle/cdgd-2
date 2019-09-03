let express = require('express');
let router = express.Router();

router.post('/authenticate', function(req, res, next) {

  const USERS = [
    {username: 'Mike', password: 'secret'}
  ];

  let user = USERS.find(u => u.username === req.body.username && u.password === req.body.password);
  if (!user) {
    res.status('401').json({success: false, message: 'Invalid Credentials'});
  } else {
    res.json({success: true, message: 'Successful Login'});
  }
});

module.exports = router;
