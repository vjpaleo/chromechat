
/**
 * Module dependencies.
 */
var chatter = require('chatter');
var cookie = require('cookie');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var couchbase = require('couchbase');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(function( req, res, next) {

	res.set('X-Powered-By', 'Node Chat');
	next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var io = require('socket.io');
//var app = connect().use(connect.static('public')).listen(3000);
var chat_room = io.listen(app);

//app.get('/', routes.index);
//app.get('/users', user.list);
//app.get('/users/:uid', user.detail);


var db = new couchbase.Connection({host: 'localhost:8091', bucket: 'default'});


//chatter.set_sockets(chat_room.sockets);

chat_room.sockets.on('connection', function (socket) {

  var parsed = cookie.parse(socket.handshake.headers.cookie);
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