var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
  const payload = {};
  if (req.user) {
    payload.user = req.user;
  } 
  console.log("Call to /user");
  console.log("req.user: ", req.user);
  res.json(payload);
});

module.exports = router;
