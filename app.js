/**
 * Module dependencies.
 */
 
var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var cookie = require('cookie');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var couchbase = require('couchbase');

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
 
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(function( req, res, next) {
    res.set('X-Powered-By', 'Node Chat');
    next();
  });
  app.use(app.router);
});
 
app.configure('development', function(){
  app.use(express.errorHandler());
});
 
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/users/:uid', user.detail); 

var db = new couchbase.Connection({host: 'localhost:8091', bucket: 'default'});

 
console.log("Express server listening on port 3000");