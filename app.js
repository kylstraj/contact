var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var uuid = require('uuid/v4');
var session = require("express-session");
var sessionSecret = require("./private/config.js").sessionSecret;
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
var utilRoute = require('./routes/util');
var pwd = require('./private/pwd');

var auth = require('./middleware/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  domain: '/',
  httpOnly: false,
  secret: sessionSecret,
}));
app.use(function(req, res, next) {
  req.user = req.session.user;
  next();
});

app.use('/home', index);
app.use('/login', login);
app.use('/user', userRoute);
app.use('/api', api);
app.use('/util', utilRoute);

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
