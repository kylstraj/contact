var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Relationship = require ('../models/relationship');

router.get('/new_relationship/:uidOne/:uidTwo', function(req, res, next) {
  const { uidOne, uidTwo } = req.params;
  const rship = new Relationship({
    firstPerson: {
      id: uidOne,
      canSeeInfo: true,
    },
    secondPerson: {
      id: uidTwo,
      canSeeInfo: true,
    },
    isReciprocal: true,
  });
  rship.save(err => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.json(rship);
  });
});

module.exports = router;
