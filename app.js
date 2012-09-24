
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socketIO = require('socket.io')
  , fighter = require('./models/fighter.js')
  , useragent = require('useragent')
  , twitterKey = null;

require('useragent/features');

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
  twitterKey = require('./models/twitterKeyDev');
});

app.configure('production', function(){
  app.use(express.errorHandler());
  twitterKey = require('./models/twitterKey');
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

app.get('/', function(req, res) {
  var uAgent = req.headers['user-agent'];

  if (!uAgent || !uAgent.trim().length) {
    res.send(403, 'you need a browser to see the fights');
    return;
  }

  var agent = useragent.parse(uAgent);
  var ua = useragent.is(uAgent);
  if ((ua.ie && agent.satisfies('<9'))
    || (ua.firefox && agent.satisfies('<12'))
    || (ua.chrome && agent.satisfies('<20'))
    //|| (ua.safari && agent.satisfies('<531'))
    || (ua.opera && agent.satisfies('<12'))) {
    res.redirect('/ancient');
    return;
  }

  res.render('index', { title: "Tuiter Fighter!" });
});

app.get('/ancient', function(req, res) {
  res.render('ancient', { title: "Tuiter Fighter! - Ancient", layout: false });
});

app.post('/fight', function(req, res) {
  var uAgent = req.headers['user-agent'];
  var left = req.body.left;
  var right = req.body.right;

  if (!uAgent || !uAgent.trim().length){
    res.send(403, 'you need a browser to see the fights');
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

  if (left.indexOf('(') >= 0 || left.indexOf(')') >= 0) {
    res.send(400, "Characters '(' or ')' are not allowed");
    return; 
  }

  if (right.indexOf('(') >= 0 || right.indexOf(')') >= 0) {
    res.send(400, "Characters '(' or ')' are not allowed");
    return; 
  }

  if (left === right){
    res.send(400, 'The same words wont be fun, huh?');
    return; 
  }

  var queue = fighter.getQueueFights();

  if (queue.length < fighterConfig.maxQueue){
    fighter.addFight([left, right]);
    io.sockets.emit("queueUpdated", fighter.getQueueFights());
  
    res.send({});
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
  twKey: twitterKey,
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
  socket.emit('start', {
    config: fighterConfig,
    current: fighter.currentState(),
    queue: fighter.getQueueFights()
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});

process.on("uncaughtException", function (err) { 
  console.log('>>>>>> Unhandled Exception Ocurred <<<<<<<<');
  console.dir(err);
});


