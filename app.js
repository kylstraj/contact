var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var expressSession = require("express-session");
var sessionSecret = require("./private/config.js").sessionSecret;
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");

var mongoose = require("mongoose");
var dbConnectionString = require("./private/config.js").dbConnectionString;
mongoose.connect(dbConnectionString);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

var api = require('./routes/api');
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var userRoute = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// configure passport authentication
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', index);
app.use('/login', login);
app.use('/user', userRoute);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
