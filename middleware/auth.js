var User = require('../models/user');
var pwd = require('../private/pwd');

module.exports = function(req, res, next) {
  const { username, password } = req.body.credentials;
  User.findOne({username: username}, function(err, user) {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (user) {
      if (pwd.verify(password, user.passwordHash)) {
        res.locals.user = user;
        return next(null, req);
      } else {
        return res.json({error: "Wrong password"});
      }
    } else {
      return res.json({error: `Couldn't find ${username}`});
    }
  });
};
