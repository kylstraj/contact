var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Relationship = require ('../models/relationship');
var Invitation = require('../models/invitation');
var auth = require('../middleware/auth');

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

router.post('/invite/:inviteeUsername', auth, function(req, res, next) {
  const { inviteeUsername } = req.params;
  const { reciprocal } = req.query;
  const inviter = req.user;
  User.findOne({username: inviteeUsername}, function (err, invitee) {
    if (err) {
      console.error(err);
      return next(err);
    } else if (!invitee) {
      return res.json({error: `Couldn't find user ${inviteeUsername}`});
    } else {
      let inv = new Invitation({
        inviter: {
          username: inviter.username,
          id: inviter.id,
        },
        invitee: {
          username: inviteeUsername,
          id: invitee.id,
        },
        isReciprocal: reciprocal || false,
        accepted: false,
        rejected: false,
      });
      inv.save(err => {
        if (err) {
          console.error(err);
          return next(err);
        } else {
          return res.json(inv);
        }
      });
    }
  });
});

module.exports = router;
