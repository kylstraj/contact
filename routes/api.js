var express = require('express');
var router = express.Router();
var Invitation = require('../models/invitation');
var Relationship = require('../models/relationship');
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

router.post('/user/relationship/:otherUsername', auth, function(req, res, next) {
  const { username } = req.user;
  const { otherUsername } = req.params;
  Relationship.findByUsers(
    username, 
    otherUsername,
    function (err, rship) {
      if (err) {
        console.error(err);
        return next(err);
      } else {
        return res.json({relationship: rship});
      }
    });
});

router.post('/user/share_info/:otherUsername', auth, function(req, res, next) {
  const { username, _id } = req.user;
  const { otherUsername } = req.params;
  Relationship.findByUsers(
    username,
    otherUsername,
    function (err, rship) {
      if (err) {
        console.error(err);
        return next(err);
      } else if (rship) {
        rship.firstPerson.username === username
          ? rship.secondPerson.canSeeInfo = true
          : rship.firstPerson.canSeeInfo = true;
        rship.save(err => {
          if (err) {
            console.error(err);
            return next(err);
          }
        });
        return res.json({relationship: rship});
      } else {
        User.findOne({username: otherUsername}, function (err, other) {
          if (err) {
            console.error(err);
            return next(err);
          } else if (!other) {
            return res.json({error: `Couldn't find user ${otherUsername}`});
          } else {
            let rship = new Relationship({
              firstPerson: {
                id: _id,
                username,
                canSeeInfo: false,
              },
              secondPerson: {
                id: other._id,
                username: otherUsername,
                canSeeInfo: true,
              },
              isReciprocal: false,
            });
            rship.save(function (err) {
              if (err) {
                console.error(err);
                return next(err);
              } else {
                return res.json(rship);
              }
            });
          }
        });
      }
    });
});

router.post('/user/contacts/verbose', auth, function(req, res, next) {
  const { username } = req.user;
  User.findOne({ username }, function (err, user) {
    if (err) {
      console.error(err);
      return next(err);
    } else if (!user) {
      return res.json({error: 'You are not logged in'});
    }
    Relationship.find({_id: {$in: user.relationships}}, function(err, rships) {
      if (err) {
        console.error(err);
        return next(err);
      } else {
        const contacts = rships
          .filter(rship => rship.canSeeOther(username))
          .map(rship => rship.findOtherUsername(username));
        const sharees = rships
          .filter(rship => rship.canBeSeenByOther(username))
          .map(rship => rship.findOtherUsername(username));
        User.find({username: {$in: contacts}}, function(err, others) {
          if (err) {
            console.error(err);
            return next(err);
          }
          const payload = {
            contacts: others.map(other => ({
              name: other.fullName,
              username: other.username,
              address: other.address,
              email: other.email,
              phone: other.phone})),
            sharees,
          };
          return res.json(payload);
        });
      }
    });
  });
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

router.post('/user/invitations', auth, function(req, res, next) {
  const { user } = req;
  const { type } = req.params;
  Invitation.find({_id: {$in: user.invitations.made}}, function (err, made) {
    if (err) {
      console.error(err);
      return next(err);
    } else {
      Invitation.find({_id: {$in: user.invitations.received}}, function (err, received) {
        if (err) {
          console.error(err);
          return next(err);
        } else {
          return res.json({made, received});
        }
      });
    }
  });
});




router.post('/user/invitations/:type', auth, function(req, res, next) {
  const { user } = req;
  const { type } = req.params;
  Invitation.find({_id: {$in: user.invitations[type]}}, function (err, invs) {
    if (err) {
      console.error(err);
      return next(err);
    } else {
      return res.json(invs);
    }
  });
});
router.post('/user/accept', auth, function(req, res, next) {
  const { inviter, invId } = req.query;
  const { user } = req;
  if (!(inviter || invId))
    return res.json({error: 'Must provide either inviter or invId as a query param'});
  else if (inviter) {
    Invitation.findOne(
      {'inviter.username': inviter, 'invitee.username': user.username}, 
      function (err, inv) {
        if (err) {
          console.error(err);
          return next(err);
        } else if (!inv) {
          return res.json(
            {error: `User ${user.username} has no open invitations from user ${inviter}`}
          );
        } else {
          console.log(inv);
          inv.accept(err => {
            if (err) {
              console.error(err);
              return next(err);
            }
            return res.json({accepted: inv._id});
          });
        }
      });
  } else {
    Invitation.findOne(
      {_id: invId, 'invitee.username': user.username},
      function (err, inv) {
        if (err) {
          console.error(err);
          return next(err);
        } else if (!inv) {
          return res.json(
            {error: `Invitation with id ${invId} is not one of ${user.username}'s invitations`}
          );
        } else {
          inv.accept(err => {
            if (err) {
              console.error(err);
              return next(err);
            }
            return res.json({accepted: inv._id});
          });
        }
      });
  }
});

router.post('/user/reject', auth, function(req, res, next) {
  const { inviter, invId } = req.query;
  const { user } = req;
  if (!(inviter || invId))
    return res.json({error: 'Must provide either inviter or invId as a query param'});
  else if (inviter) {
    Invitation.findOne(
      {'inviter.username': inviter, 'invitee.username': user.username}, 
      function (err, inv) {
        if (err) {
          console.error(err);
          return next(err);
        } else if (!inv) {
          return res.json(
            {error: `User ${user.username} has no open invitations from user ${inviter}`}
          );
        } else {
          console.log(inv);
          inv.reject(err => {
            if (err) {
              console.error(err);
              return next(err);
            }
            return res.json({rejected: inv._id});
          });
        }
      });
  } else {
    Invitation.findOne(
      {_id: invId, 'invitee.username': user.username},
      function (err, inv) {
        if (err) {
          console.error(err);
          return next(err);
        } else if (!inv) {
          return res.json(
            {error: `Invitation with id ${invId} is not one of ${user.username}'s invitations`}
          );
        } else {
          inv.reject(err => {
            if (err) {
              console.error(err);
              return next(err);
            }
            return res.json({rejected: inv._id});
          });
        }
      });
  }
});

module.exports = router;
