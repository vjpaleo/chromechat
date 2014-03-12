/**
 * Module dependencies.
 */
 
var express = require('express');
var routes = require('./routes');
var http = require('http');
var chatter = require('chatter');
var cookie = require('cookie');
var user = require('./routes/user');
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


io.sockets.on('connection', function (socket) {

  var parsed = cookie.parse(socket.handshake.headers.cookie);
  console.log(parsed);
  /*
  joomla.auth_cookies(parsed, function  (j_user) {
    if (j_user.username === "") {
      chatter.failure(socket);
    } else {
      chatter.connect_chatter({
        socket: socket,
        all_sockets: chat_room.sockets,
        username: j_user.username
      });
    }
  });
  */

});
 
console.log("Express server listening on port 3000");