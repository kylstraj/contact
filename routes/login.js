var express = require('express');
var router = express.Router();
var pwd = require('../private/pwd');
var printSession = require('../middleware/printSession');
var User = require('../models/user');

router.post('/', printSession, function(req, res, next) {
  const { username, password } = req.body;
  User.findOne({ username }, function(err, user) {
    if (err) {
      console.error(err);
      return next(err);
    } else if (!user) {
      return res.json({error: 'User not found.'});
    } else if (!pwd.verify(password, user.passwordHash)) {
      return res.json({error: 'Invalid password.'});
    }
    req.session.user = user;
    const { address, contacts, email, phone, fullName } = user;
    const payload = {
      address,
      contacts,
      email,
      name: fullName,
      phone,
    };
    return res.json(payload);
  });
}, printSession);

module.exports = router;
