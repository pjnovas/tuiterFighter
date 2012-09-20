
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socketIO = require('socket.io')
  , fighter = require('./models/fighter.js');

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

app.post('/fight', function(req, res){
  var userAgent = req.headers['user-agent'];
  var left = req.body.left;
  var right = req.body.right;

  if (!userAgent.trim().length)
    res.send(403); //forbiden

  console.dir(userAgent);
  console.dir(left);
  console.dir(right);

  res.send(200, {});
});

// SocketIO Init
var io = socketIO.listen(app, {
  "log level": 1
});

// Fighter

var emitChange = function(state){
  io.sockets.emit("change", state);
}

fighter.init({
  fightTime: 99000, //99 seconds
  breakTime: 11000 //11 seconds
})
.on('fightStart', function(state){
  io.sockets.emit("queueUpdated", fighter.getQueueFights());
  emitChange(state);
})
.on('tweet', emitChange)
.on('fightEnd', emitChange)
.on('waiting', emitChange)
.on('clockTick', function(time){
  io.sockets.emit("clockTick", time);
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
  },
  maxQueue: 15
};

// WebSocket Events

io.sockets.on('connection', function (socket) {

  socket.emit('start', {
    config: fighterConfig,
    current: fighter.currentState(),
    queue: fighter.getQueueFights()
  });

/*
  socket.on('addFight', function (keys) {
    var queue = fighter.getQueueFights();

    if (queue.length < fighterConfig.maxQueue){
      fighter.addFight([keys[0], keys[1]]);
      io.sockets.emit("queueUpdated", fighter.getQueueFights());
    }
  });
*/
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

/*
process.on("uncaughtException", function (err) { 
  console.log('>>>>>> Unhandled Exception Ocurred: ' + err);
});
*/

