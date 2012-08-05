
var events = require('events'),
	Fight = require('./fight.js'),
  Tuiter = require("tuiter"),
  tu = new Tuiter(require('./twitterKey.json'));

var fightTime = 300000, //5 min
	breakTime = 180000, //2 min
	fights = [],
	currentFight = null;

var exports = module.exports = new events.EventEmitter();

exports.init = function(options){

	 	fightTime = (options && options.fightTime) || fightTime;
	  breakTime = (options && options.breakTime) || breakTime;

	  return this;
};

exports.addFight = function(keywords){

	var f = new Fight({
		tuitter: tu,
		keywords: keywords,
		fightTime: fightTime
	});

	fights.push(f);

	if (fights.length === 1)
		nextFight();
};

exports.getCurrentFight = function(){
	return currentFight;
};

function nextFight() {
	currentFight = fights[0];
	currentFight.start();
	
	exports.emit('fight', currentFight);
	
	currentFight.on('finish', function(){
		setTimeout(function(){
			//TODO: store the fight
			fights.shift();	
			nextFight();
		}, breakTime);

	});
}
