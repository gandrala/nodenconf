var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Add ncof library
var nconf = require("nconf");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// This always take presedence, almost final
/*
nconf.overrides({
	"http":{
		"port":9000
	}
});
*/
// with this option you can pass the port with -p parameter
//binn/www -p 8080
nconf.argv({
	"p":{
		"alias":"http:port",
		"description":"The port to listen on"
	}
});

// with this you can pass the port with http__port=8080
nconf.env("__");

// with this you can read the port from a config file.
/*
#config file should contain the following information
{
	"http":{
		"port":8000
	}
}
*/
nconf.file("nconf.json");

// If nothing is provided then default will get executed
nconf.defaults({
	"http":{
		"port":3000
	}
});

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

app.use('/', routes);
app.use('/users', users);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
