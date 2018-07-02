var express = require('express');
var router = express.Router();
var User = require('../models/user');
var pwd = require('../private/pwd');

router.post('/user', function(req, res, next) {
  console.log(res.locals.user);
  const { address, email, phone } = res.locals.user;
  const payload = {
    address,
    email,
    name: res.locals.user.fullName,
    phone,
  };
  return res.json(payload);
});

router.post('/user/update/:fieldName', function(req, res, next) {
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
    res.locals.user._id,
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

router.post('/user/share_info/:contactUsername', function(req, res, next) {
  const { contactUsername } = req.params;
  User.findOneAndUpdate(
    {username: contactUsername},
    {$push: {contacts: res.locals.user._id}},
    function (err, friend) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (friend) {
        res.json(
          {success: `${res.locals.user.username} shared contact info with ${contactUsername}`}
        );
      } else {
        res.json(
          {error: `Couldn't find ${contactUsername}`}
        );
      }
    });
});
  /*
  User.findOne(
    {username: contactUsername},
    function (err, contactUser) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (contactUser) {
        User.findByIdAndUpdate(
          res.locals.user._id,
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
              return res.json({message: `Couldn't find ${res.locals.user.username}`});
            }
          });
      } else {
        return res.json({message: `Couldn't find ${contactUsername}`});
      }
    });
    */

router.post('/user/contacts', function(req, res, next) {
  const { user } = res.locals;
  const { contacts } = user;
  User.find({_id: {$in: contacts}}, function(err, friends) {
    if (err) {
      console.error(err);
      return next(err);
    }
    const payload = { contacts: friends.map(friend => friend.username) };
    res.json(payload);
  });
});

router.post('/user/contact/:requestee', function(req, res, next) {
  const { requestee } = req.params;
  const { user } = res.locals;
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
        payload = {message: `${requestee} isn't one of ${user.username}'s contacts`}
      }
      res.json(payload);
    } else {
      res.json({message: `Couldn't find ${requestee}`});
    }
  });
});

module.exports = router;
