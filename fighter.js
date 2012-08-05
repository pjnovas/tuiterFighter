
var events = require('events'),
	Fight = require('./fight.js'),
	Clock = require('./clock.js'),
  Tuiter = require("tuiter"),
  tu = new Tuiter(require('./twitterKey.json'));

var fightClock = null,
	waitClock = null,
	fights = [],
	currentFight = null;

var exports = module.exports = new events.EventEmitter();

exports.init = function(options){

	 	var fightTime = (options && options.fightTime) || 300000, //5 min
	  	breakTime = (options && options.breakTime) || 180000, //3 min

	  waitClock = new Clock(breakTime);
	  fightClock = new Clock(fightTime);

	  fightClock.on('tick', function(status){
	  	status.label = 'Fighting';
	  	exports.emit('clockTick', status);
	  });

	  waitClock.on('tick', function(status){
	  	status.label = 'Waiting';
	  	exports.emit('clockTick', status);
	  });

	  fightClock.on('timeup', function(){
	  	currentFight.stop();
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
	currentFight.start();
	exports.emit('fight', currentFight);

	fightClock.start();
}
