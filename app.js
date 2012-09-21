
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

// SocketIO Init
var io = socketIO.listen(app, {
  "log level": 1
});

// Routes

app.get('/', function(req, res){
  res.render('index', { title: "Tuiter Fighter!" })
});

app.post('/fight', function(req, res){
  var userAgent = req.headers['user-agent'];
  var left = req.body.left;
  var right = req.body.right;

  if (!userAgent || !userAgent.trim().length){
    res.send(403); //forbiden without user-agent
    return;
  }

  if (!left.length){
    res.send(400, "Must fill with a word");
    return;
  }

  if (!right.length){
    res.send(400, "Must fill with a word");
    return;
  }

  if (left === right){
    res.send(400, 'The same words wont be fun, huh?');
    return; 
  }

  console.log(userAgent);

  var queue = fighter.getQueueFights();

  if (queue.length < fighterConfig.maxQueue){
    fighter.addFight([left, right]);
    io.sockets.emit("queueUpdated", fighter.getQueueFights());
  
    res.send(200);
  }
  else {
    res.send(403, 'The fights queue is full, wait some time');  
  }
  
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

// WebSocket Events

io.sockets.on('connection', function (socket) {
  console.dir(socket);
  
  socket.emit('start', {
    config: fighterConfig,
    current: fighter.currentState(),
    queue: fighter.getQueueFights()
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

