
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var config = require('./config.js');

var app = express();

// all environments
app.set('port', config.bindPort || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.csrf());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// handle 404
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

routes(app);

http.createServer(app).listen(app.get('port'), config.bindAddress, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
