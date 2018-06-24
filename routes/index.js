var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  const payload = {};
  User.find(function(err, users) {
    if (err) {
      console.error(err);
      return next(err);
    }
    payload.users = users;
    console.log("Users: ", users);
    res.json(payload);
  });
});

module.exports = router;
