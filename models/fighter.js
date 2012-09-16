
var events = require('events'),
	Fight = require('./fight.js'),
	Clock = require('./clock.js'),
  Tuiter = require("tuiter"),
  tu = new Tuiter(require('./twitterKey.json')),
  fightStates = require('./fightStates.js');

var fightClock = null,
	waitClock = null,
	fights = [],
	currentFight = null,
	currentState = fightStates.idle;

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
	  	breakTime = (options && options.breakTime) || 180000; //3 min

	  waitClock = new Clock(breakTime);
	  fightClock = new Clock(fightTime);

	  fightClock.on('tick', function(seconds){
	  	exports.emit('clockTick', seconds);
	  });

	  waitClock.on('tick', function(seconds){
	  	exports.emit('clockTick', seconds);
	  });

	  fightClock.on('timeup', function(){
	  	exports.emit('clockTick', 0);
	  	currentFight.stop();
	  });

	  waitClock.on('timeup', function(){
	  	//TODO: store the fight - currentFight
			finalizeFight();
	  });

	  return this;
};

function finalizeFight(){
	currentFight = null;
	fights.shift();

	if (fights.length > 0) {
		runFight();
	}
	else {
		currentState = fightStates.idle;
	}
}

exports.addFight = function(keywords){

	var f = new Fight({
		tuitter: tu,
		keywords: keywords
	});

	fights.push(f);

	if (fights.length === 1)
		runFight();
};

exports.currentState = function(){
	var birds;

	if (currentFight){
		birds = currentFight.getBirds();
	}

	return {
		state: currentState,
		birds: birds,
		time: fightClock.getSeconds()
	};
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
		currentState = fightStates.endFight;

		var status = getFightState(currentState, currentFight.getBirds());
  	
  	exports.emit('fightEnd', status);
  	if (fights.length > 0) {
  		currentState = fightStates.waiting;
  	}
  	else currentState = fightStates.idle;

		setTimeout(function(){
			if (fights.length > 1) {
				exports.emit('waiting', getFightState(fightStates.waiting, {}));
				waitClock.start();
			} else {
				finalizeFight();
			} 
		}, 10000);
	});
	
	currentFight.on('tweet', function(status){
  	exports.emit('tweet', status);
	});

	currentState = fightStates.startFight;
	exports.emit('clockTick', 99);
	exports.emit('fightStart', getFightState(currentState, currentFight.getBirds()));

	currentState = fightStates.fighting;

	setTimeout(function(){
		currentFight.start();
		fightClock.start();
	}, 5000);
}
