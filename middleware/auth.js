var User = require('../models/user');
var pwd = require('../private/pwd');

module.exports = function(req, res, next) {
  const { user } = req;
  if (user) return next();
  else {
    const { credentials } = req.body;
    const { username, password } = credentials;
    User.findOne({username}, function(err, user) {
      if (err || !user) {
        return res.json({error: 'No user is logged in'});
      }
      req.user = user;
      return next();
    });
  }
};
