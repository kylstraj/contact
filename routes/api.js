var express = require('express');
var router = express.Router();
var User = require('../models/user');
var pwd = require('../private/pwd');
var auth = require('../middleware/auth');
var printSession = require('../middleware/printSession');

router.post('/user', auth, function(req, res, next) {
  const { user } = req;
  const { address, email, phone } = req.user;
  const payload = {
    address,
    email,
    name: user.fullName,
    phone,
  };
  return res.json(payload);
});

router.post('/user/:username/update/:fieldName', auth, function(req, res, next) {
  if (!req.body)
    return next(req);
  const { value } = req.body;
  const { fieldName, username } = req.params;
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
    { username },
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

router.post('/user/share_info/:contactUsername', auth, function(req, res, next) {
  const { contactUsername } = req.params;
  User.findOneAndUpdate(
    {username: contactUsername},
    {$push: {contacts: req.user._id}},
    function (err, friend) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (friend) {
        res.json(
          {success: `${req.user.username} shared contact info with ${contactUsername}`}
        );
      } else {
        res.json(
          {error: `Couldn't find ${contactUsername}`}
        );
      }
    });
});

router.post('/user/contacts', auth, function(req, res, next) {
  const { user } = req;
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

router.post('/user/contacts/verbose', printSession, auth, function(req, res, next) {
  const { user } = req;
  const { contacts } = user;
  User.find({_id: {$in: contacts}}, function(err, friends) {
    if (err) {
      console.error(err);
      return next(err);
    }
    const payload = { contacts: friends.map(friend => ({
      address: friend.address,
      email: friend.email,
      name: friend.fullName,
      phone: friend.phone,
      username: friend.username,
    })) };
    res.json(payload);
  });
});


router.post('/user/contact/:requestee', auth, function(req, res, next) {
  const { requestee } = req.params;
  const { user } = req;
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
          username,
        };
      } else {
        payload = {error: `${requestee} isn't one of ${user.username}'s contacts`}
      }
      res.json(payload);
    } else {
      res.json({error: `Couldn't find ${requestee}`});
    }
  });
});

router.post('/user/contact/:requestee/:fieldName', auth, function(req, res, next) {
  const { requestee, fieldName } = req.params;
  const { user } = req;
  const { contacts } = user;
  const validFields = [
    'address',
    'email',
    'phone',
  ];
  if (validFields.indexOf(fieldName) < 0) {
    return res.json({error: `${fieldName} is not a valid field`});
  }
  User.findOne({username: requestee}, function(err, contact) {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (contact) {
      let payload = {};
      if (contacts.indexOf(contact._id) >= 0) {
        payload[fieldName] = contact[fieldName];
      } else {
        payload = {error: `${requestee} isn't one of ${user.username}'s contacts`}
      }
      res.json(payload);
    } else {
      res.json({error: `Couldn't find ${requestee}`});
    }
  });
});

router.post('/user/logout', auth, function(req, res, next) {
  const tempUser = req.user;
  req.session.user = undefined;
  req.user = undefined;
  return res.json({message: `logged out ${tempUser.username}`});
});

router.post('/search_users/:name', function(req, res, next) {
  const { name } = req.params;
  const nameRegEx = new RegExp(name, 'i');
  User.find({ fullName: nameRegEx }, 'fullName username', function(err, users) {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (users) {
      const payload = users.map(user =>
        ({
          name: user.fullName,
          username: user.username,
        }));
      return res.json(payload);
    } else {
      return res.json([]);
    }
  });
});

router.post('/new_user', function(req, res, next) {
  const { username, password, name, email, phone, address } = req.body;
  User.findOne({ username }, function (err, user) {
    if (err) {
      console.error(err);
      return next(err);
    } else if (user) {
      return res.json({ error: 'That username already exists' });
    } else {
      let user = new User({ 
        username, 
        passwordHash: pwd.hash(password), 
        fullName: name,
        email, 
        phone, 
        address 
      });
      user.save(err => {
        if (err) {
          console.error(err);
          return next(err);
        }
      });
      return res.json({ username, name, email, phone, address });
    }
  });
});

module.exports = router;
