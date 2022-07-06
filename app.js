var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const AuthInterceptor = require('./services/AuthInterceptor');

var playerAuthRouter = require('./routes/playerAuth');
var playerRouter = require('./routes/player');
var leaderboardRouter = require('./routes/leaderboard');
const DatabaseService = require('./services/DatabaseService');

var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//load database connector and instantiate schema
DatabaseService.instance()

app.use('/api/player', playerAuthRouter); // auth not required
app.use(AuthInterceptor.intercept); // will intercept requests to routes below and checks for valid auth
app.use('/api/player', playerRouter) // needs auth
app.use('/api/leaderboard', leaderboardRouter) // needs auth

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
