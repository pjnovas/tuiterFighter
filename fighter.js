
var events = require('events'),
	Fight = require('./fight.js'),
	Clock = require('./clock.js'),
  Tuiter = require("tuiter"),
  tu = new Tuiter(require('./twitterKey.json')),
  fightStates = require('./fightStates.js');

var fightClock = null,
	waitClock = null,
	fights = [],
	currentFight = null;

var exports = module.exports = new events.EventEmitter();

function getFightState(_state, _birds, _time){
	
	return {
		state: _state,
		birds: _birds,
		clock: {
			time: _time
		}
	};
}

exports.init = function(options){

	 	var fightTime = (options && options.fightTime) || 300000, //5 min
	  	breakTime = (options && options.breakTime) || 180000, //3 min

	  waitClock = new Clock(breakTime);
	  fightClock = new Clock(fightTime);

	  fightClock.on('tick', function(seconds){
			var status = getFightState(fightStates.fighting, currentFight.getBirds(), seconds);
	  	exports.emit('clockTick', status);
	  });

	  waitClock.on('tick', function(status){
	  	var status = getFightState(fightStates.waiting, {}, seconds);
	  	exports.emit('clockTick', status);
	  });

	  fightClock.on('timeup', function(){
	  	currentFight.stop();

	  	var status = getFightState(fightStates.endFight, currentFight.getBirds(), 0);
	  	exports.emit('clockTick', status);

	  	if (!waitClock)
	  		waitClock = new Clock(breakTime);

	  	waitClock.start();
	  });

	  waitClock.on('timeup', function(){
	  	//TODO: store the fight

	  	currentFight = null;
	  	fights.shift();

	  	if (fights.length > 0) {
				runFight();
			}
	  });

	  return this;
};

exports.addFight = function(keywords){

	var f = new Fight({
		tuitter: tu,
		keywords: keywords
	});

	fights.push(f);

	if (fights.length === 1)
		runFight();
};

exports.getCurrentFight = function(){
	return currentFight;
};

exports.getQueueFights = function(){
	var queue = [];
	for (var i = 1; i < fights.length; i++){
		queue.push({
			keywords: fights[i].keys
		});
	}
	return queue;
};

function runFight() {
	currentFight = fights[0];

	currentFight.on('finish', function(){
		fightClock.stop();
		var status = getFightState(fightStates.endFight, currentFight.getBirds(), fightClock.getSeconds());
  	exports.emit('clockTick', status);

		currentFight = null;
  	fights.shift();

  	if (fights.length > 0) {
			runFight();
		}

  	if (!waitClock)
	  		waitClock = new Clock(30000);

  	waitClock.start();
	});
	
	exports.emit('fight', getFightState(fightStates.startFight, currentFight.getBirds(), 99));

	setTimeout(function(){
		currentFight.start();
		fightClock.start();
	}, 5000);
}
