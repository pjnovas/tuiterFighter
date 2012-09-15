
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
  fightTime: 99000, //99 seconds
  breakTime: 30000 //30 secs
}).on('fight', function(state){

  io.sockets.emit("change", state);

  var currFight = fighter.getCurrentFight();
  currFight.on('tweet', function(_state){
    if (!currFight.stopped)
      io.sockets.emit("change", _state);
  });

}).on('clockTick', function(state){
  io.sockets.emit("change", state);
});

var fighterConfig = {
  resources: {
    scenaries: [{
      name: 'forest',
      bg: 'img/bg.png',
      floor: 'img/frustum.png'
    }],
    sprites: {
      bird: 'img/bird-tiles.png',
      hits: 'img/text.png',
      clock: 'img/clock.png'
    }
  }
};

// WebSocket Events

io.sockets.on('connection', function (socket) {

  socket.emit('start', fighterConfig);

  socket.on('addFight', function (keywords) {
    fighter.addFight(keywords);
  });

});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

/*
process.on("uncaughtException", function (err) { 
  console.log('>>>>>> Unhandled Exception Ocurred: ' + err);
});
*/

