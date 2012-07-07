
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socketIO = require('socket.io')
  , god = require('./godfile.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

var io = socketIO.listen(app);
io.sockets.on('connection', function (socket) {
  socket.on('newSearch', function (data) {
  	console.log(data);
    
   god.goAhead(data, emitIt);
  });
});

function emitIt(keyword, data){
	io.sockets.emit("tweet", { keyword: keyword, data: data});
}

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});





