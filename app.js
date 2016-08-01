var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var requestIp = require('request-ip');

var routes = require('./routes/index');
var admins = require('./routes/admins');
var questions = require('./routes/questions');
var models = require('./models')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestIp.mw())

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.use(function(req, res, next) {
  if (req.session && req.session.admin) {
    models.Admin.findOne({ email: req.session.admin.email })
    .then(function(admin) {
      if (admin) {
        req.admin = admin;
        delete req.admin.password;
        req.session.admin = admin;
        res.locals.admin = admin;
      }
      next();
    });
  } else {
    next();
  }
});

// get client ip address
app.use(function(req, res, next) {
  req.ip = req.clientIp;
  next();
});

app.use('/', routes);
app.use('/admins', admins);
app.use('/questions', questions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('home/error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;
