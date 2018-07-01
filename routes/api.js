var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/user/:username', function(req, res, next) {
  User.findOne({username: req.params.username}, function(err, user) {
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

router.post('/user/:username/update/:fieldName', function(req, res, next) {
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
  User.findOneAndUpdate(
    {username: req.params.username},
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

router.post('/user/:username/add_contact/:contactUsername', function(req, res, next) {
  const { username, contactUsername } = req.params;
  User.findOne(
    {username: contactUsername},
    function (err, contactUser) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (contactUser) {
        User.findOneAndUpdate(
          {username},
          {$push: {contacts: contactUser._id}},
          {new: true},
          function (err, user) {
            if (err) {
              console.error(err);
              return next(err);
            }
            if (user) {
              const { contacts } = user;
              const payload = { contacts, name: user.fullName };
              return res.json(payload);
            } else {
              return res.json({message: `Couldn't find ${username}`});
            }
          });
      } else {
        return res.json({message: `Couldn't find ${contactUsername}`});
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

router.get('/contact/:requester/:requestee', function(req, res, next) {
  const { requester, requestee } = req.params;
  User.findOne(
    {username: requester},
    function(err, user) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (user) {
        const { contacts } = user;
        User.findOne({username: requestee}, function(err, contact) {
          if (err) {
            console.error(err);
            return next(err);
          }
          if (contact) {
            let payload = {};
            if (contacts.indexOf(contact._id) >= 0) {
              const { address, email, phone } = contact;
              payload = {
                address,
                email,
                name: contact.fullName,
                phone,
              };
            } else {
              payload = {message: `${requestee} isn't one of ${requester}'s contacts`}
            }
            res.json(payload);
          } else {
            res.json({message: `Couldn't find ${requestee}`});
          }
        });
      } else {
        res.json({message: `Couldn't find ${requester}`});
      }
    });
});


module.exports = router;
