
var fighter = fighter || {};

fighter.manager = (function() {
	var cfg,
		canvasId,
		lastState;

	var events = {
		ready: function(){}
	};

	var load = function(){
		var sprites = cfg.resources.sprites;

		//TODO: make scenaries dynamic
		var scenary = cfg.resources.scenaries[0];

		fighter.splash.create();

		fighter.repository.addResources({
      'bird': sprites.bird,
      'frustum': scenary.floor,
      'text': sprites.hits,
      'clock': sprites.clock
  	}).on('error', function(err){
  		console.log(err);
  	}).on('report', function(prg){
			console.log(prg + '%');
  	}).on('complete', function(){
  		fighter.match.init(canvasId);
  		events.ready();
  	}).load();
	}

	return {
		on: function(eventName, callback){
			if (events[eventName])
				events[eventName] = callback;

			return this;
		},

		load: function(_canvasId, config){
			canvasId = _canvasId;
			cfg = config;
			load();

			return this;
		},

		update: function(fightState){
			var currState = fightState.state,
				states = fighter.fightStates;

			fighter.match.set(currState);

			switch(currState){
				case states.idle:
					fighter.match.set(states.idle);
					break;
				case states.waiting:
					fighter.match.set(states.waiting);

					console.log(fightState.birds.left.word + 
						' vs ' + 
						fightState.birds.right.word + 
						' in ' + 
						fightState.nextIn + 
						' seconds');

					break;
				case states.startFight:

					fighter.match.words(fightState.birds.left.word, fightState.birds.right.word);
					fighter.stage.showControls(true);

					fighter.splash.run('ready', function(){
						
						fighter.match.life(fightState.birds.left.life, fightState.birds.right.life);
						fighter.match.time(fightState.clock.time);
						fighter.match.begin();

						setTimeout(function(){
							
							fighter.splash.run('fight', function(){

								fightState.state = fighter.fightStates.fighting;
								fighter.manager.update(fightState);
							});

						}, 1000);
					});				  

					break;
				case states.fighting:

					fighter.match.words(fightState.birds.left.word, fightState.birds.right.name);
					fighter.match.life(fightState.birds.left.life, fightState.birds.right.life);
				  fighter.match.time(fightState.clock.time);

					fighter.match.set(states.fighting);

					break;
				case states.tweet:
					var from = 'left';
					if (fightState.birds.right.hit)
						from = 'right';

					fighter.match.punch(from);
					fighter.match.life(fightState.birds.left.life, fightState.birds.right.life);
					
					break;
				case states.endFight:

					fighter.match.life(fightState.birds.left.life, fightState.birds.right.life);
					fighter.match.time(fightState.clock.time);

					if (fightState.clock.time === 0){

						fighter.match.timesUp(function(){
							if (fightState.birds.left.life === fightState.birds.right.life){
								fighter.match.tie();
							}
							else if (fightState.birds.left.life > fightState.birds.right.life){
								fighter.match.winTimesUp('left', 'right');
							}
							else fighter.match.winTimesUp('right', 'left');
						});
					}
					else {
						if (fightState.birds.left.life === 0){
							fighter.match.winPunch('right');
						}
						else fighter.match.winPunch('left');
					}

					break;
				default: 
					throw new Error('Expected: fight state'); 
					break;
			}
		}

	};

})();
