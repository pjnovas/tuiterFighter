
var events = require('events'),
	Fight = require('./fight.js'),
	Clock = require('./clock.js'),
  Tuiter = require("tuiter"),
  fightStates = require('./fightStates.js');

var loggly = require('loggly');
var config = {
  subdomain: "pjnovas",
  auth: {
    username: "pjnovas",
    password: "nBm0g1f1!"
  },
  json: true
};
var client = loggly.createClient(config);

var 
	tu = null;
	fightClock = null,
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
	tu = new Tuiter(options.twKey || {});

	client.getInput('tuiterfighter', function (err, input) {
    input.log('Fighter starting');
  });

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
		finalizeFight();
  });

  client.getInput('tuiterfighter', function (err, input) {
    input.log('Fighter configured');
  });

  return this;
};

function finalizeFight(){
	//TODO: store the fight - currentFight

	client.getInput('tuiterfighter', function (err, input) {
    input.log('Fight Finalized');
  });

	currentFight = null;
	fights.shift();

	if (fights.length > 0) {
		runFight();
	}
	else {
		currentState = fightStates.idle;

		client.getInput('tuiterfighter', function (err, input) {
	    input.log('FightState is idle');
	  });
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

	client.getInput('tuiterfighter', function (err, input) {
    input.log('Fight Added - ' + keywords);
  });
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
	if (fights.length > 1){
		for (var i = 0; i < fights.length; i++){
			queue.push(fights[i].keys);
		}
	}
	return queue;
};

function runFight() {
	currentFight = fights[0];

	currentFight.on('finish', function(){

		fightClock.stop();
		currentState = fightStates.endFight;

		client.getInput('tuiterfighter', function (err, input) {
	    input.log('FightState is endFight');
	  });

		var status = getFightState(currentState, currentFight.getBirds());
  	
  	exports.emit('fightEnd', status);
  	if (fights.length > 1) {
  		currentState = fightStates.waiting;

  		client.getInput('tuiterfighter', function (err, input) {
		    input.log('FightState is waiting');
		  });
  	}
  	else {
  		currentState = fightStates.idle;

  		client.getInput('tuiterfighter', function (err, input) {
		    input.log('FightState is idle');
		  });
		}
  	
		setTimeout(function(){
			if (fights.length > 1) {
				exports.emit('waiting', getFightState(fightStates.waiting, {}));
				waitClock.start();

				client.getInput('tuiterfighter', function (err, input) {
			    input.log('FightState is waiting');
			  });

			} else {
				finalizeFight();
			} 
		}, 10000);
	});
	
	currentFight.on('tweet', function(status){
  	exports.emit('tweet', status);
	});

	currentState = fightStates.startFight;

	client.getInput('tuiterfighter', function (err, input) {
    input.log('FightState is startFight');
  });
	
	exports.emit('clockTick', 99);
	exports.emit('fightStart', getFightState(currentState, currentFight.getBirds()));
	exports.emit('clockTick', 99);	

	currentState = fightStates.fighting;

	client.getInput('tuiterfighter', function (err, input) {
    input.log('FightState is fighting');
  });

	setTimeout(function(){
		client.getInput('tuiterfighter', function (err, input) {
	    input.log('Fight starting');
	  }); 

		currentFight.start();
		fightClock.start();
	}, 5000);
}
