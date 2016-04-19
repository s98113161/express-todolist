var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var users= {Mary:{id:1,username:"Mary",password:777888},John:{id:2,username:"John",password:888777}};

passport.use(new LocalStrategy(
  function(username, password, done) {
	var user =users[username];
	console.log(user);
	if(user==null){
		console.log("Incorrect username.");
		 return done(null, false, { message: 'Incorrect username.' });
	}
      if (user.password!=password) {
		console.log("Incorrect password.");
        return done(null, false, { message: 'Incorrect password.' });
      }
	   return done(null, user);
  }
));
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;	
  next(err);
});
// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = process.env.PORT || '8888';
app.listen(port);
console.log('The server is create on port ' + port);
module.exports = app;
