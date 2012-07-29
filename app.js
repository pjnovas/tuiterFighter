
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socketIO = require('socket.io')
  , fighter = require('./fighter.js');

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

// SocketIO Init

var io = socketIO.listen(app, {
  "log level": 1
});

// Fighter

fighter.init({
  fightTime: 300000, //5 min
  breakTime: 180000 //2 min
}).on('fight', function(fight){

  io.sockets.emit("start", fight.keywords);

  fight.on('tweet', function (keyword){
    io.sockets.emit("tweet", keyword);
  });

  fight.on('clockTick', function (clock){
    io.sockets.emit("tick", clock);
  });

  fight.on('finish', function (winner){
    io.sockets.emit("finish", winner);
  });
});

// WebSocket Events

io.sockets.on('connection', function (socket) {

  var currFight = fighter.getCurrentFight();
  if (currFight) 
    socket.emit('start', currFight.keywords);

  socket.on('addFight', function (keywords) {
    fighter.addFight(keywords);
  });

});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

process.on("uncaughtException", function (err) { 
  console.log('>>>>>> Unhandled Exception Ocurred: ' + err);
});



