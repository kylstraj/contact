var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/user/:userId', function(req, res, next) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (user) {
      const { address, email, phone } = user;
      const payload = {
        address,
        email,
        name: user.fullName,
        phone,
      };
      return res.json(payload);
    } else {
      return res.json({});
    }
  });
});

router.post('/user/:userId/update/:fieldName', function(req, res, next) {
  if (!req.body)
    return next(req);
  const { value } = req.body;
  const { fieldName } = req.params;
  const validFields = [
    'address',
    'email',
    'phone',
  ];
  if (validFields.indexOf(fieldName) < 0) {
    return res.json({error: `${fieldName} is not a valid field`});
  }
  let update = {};
  update[fieldName] = value;
  User.findByIdAndUpdate(
    req.params.userId,
    update,
    {new: true},
    function(err, user) {
      if (err) {
        consle.log("Call to User.findByIdAndUpdate errored");
        console.log(err);
        return next(err);
      }
      if (user) {
        const { address, email, phone } = user;
        const payload = {
          address,
          email,
          name: user.fullName,
          phone,
        };
        return res.json(payload);
      } else {
        return res.json({});
      }
    });
});

router.post('/addContact/:subjectUsername/:objectUsername', function(req, res, next) {
  User.findOne(
    {username: req.params.objectUsername},
    function (err, objectUser) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (objectUser) {
        User.findOneAndUpdate(
          {username: req.params.subjectUsername},
          {$push: {contacts: objectUser.id}},
          {new: true},
          function (err, subjectUser) {
            if (err) {
              console.error(err);
              return next(err);
            }
            if (subjectUser) {
              const { contacts } = subjectUser;
              const payload = { contacts, name: subjectUser.fullName };
              return res.json(payload);
            } else {
              return res.json({message: `Couldn't find ${req.params.subjectUsername}`});
            }
          });
      } else {
        return res.json({message: `Couldn't find ${req.params.objectUsername}`});
      }
    });
});

router.get('/user/:username/contacts', function(req, res, next) {
  User.findOne(
    {username: req.params.username},
    function(err, user) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (user) {
        const { contacts } = user;
        User.find({_id: {$in: contacts}}, function(err, friends) {
          if (err) {
            console.error(err);
            return next(err);
          }
          const payload = { contacts: friends.map(friend => friend.username) };
          res.json(payload);
        });
      } else {
        return res.json({ message: `Couldn't find ${req.params.username}` });
      }
    });
});

module.exports = router;
