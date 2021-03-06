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

//var db = new couchbase.Connection({host: 'localhost:8091', bucket: 'default'});

var userDetail = function (uai) {

  var db = new couchbase.Connection({host: 'localhost:8091', bucket: 'default'}, 
    function(err){ 
      console.log('couchbase connection error '+ err);
    });

console.log(db);

  var userData = false;
  
  userData = db.get(uai, function(err, result) {
    console.log(result);
    return userData = result;
  });

  return userData;
};

userDetail(1393859147127001);


io.sockets.on('connection', function (client) {
  console.log('conection etablished');
   
   client.on('message', function(err, msg){
      console.log('client message');
      console.log(err);
      io.sockets.emit('message', err);
      client.broadcast.emit('message', err);
    });
    
   /*
   client.emit('welcome', function(data) {
    console.log('client welcome');
    data['message'] = "Welcome to Node Chat Box.";
    return data;
   });
  */
  client.on('auth', function(data){
      console.log('uai >>> '+ data.uai);
      if(data.uai != '' && data.uai > 0) {
        
        userData = userDetail(data.uai);
        if(userData) {
          console.log('auth_success');
          console.log(userData);
          var responseData = {'message': 'success'};
          io.sockets.emit('auth_response', responseData);
        }
        /*
        db.get(data.uai, function(err, result) {
          console.log(result);
          var responseData = {'message': 'success'};
          io.sockets.emit('auth_response', responseData);
        });
        */  
      }

  });
  client.on('welcome', function(data) {
    console.log("welcome user");
      //io.sockets.emit('message', "Welcome to node chat.");
  });

});


console.log("Express server listening on port 3000");
