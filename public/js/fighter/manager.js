
var fighter = fighter || {};

fighter.manager = (function() {
	var cfg,
		canvasId,
		lastState,
		currState;

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

		clockTick: function(time){
			if (currState && currState === fighter.fightStates.waiting)
				console.log('Waiting clock tick ' + time);
			else fighter.match.time(time);
		},

		update: function(fightState){
			var states = fighter.fightStates;
			
			currState = fightState.state;
				
			switch(currState){
				case states.idle:
					fighter.match.set(states.idle);
					break;
				case states.waiting:
					fighter.match.set(states.waiting);

					console.log('----- waiting -----');

					break;
				case states.startFight:
					fighter.match.reset();

					fighter.match.words(fightState.birds.left.word, fightState.birds.right.word);
					fighter.stage.showControls(true);

					fighter.splash.run('ready', function(){
						
						fighter.match.life(fightState.birds.left.life, fightState.birds.right.life);
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

					fighter.match.words(fightState.birds.left.word, fightState.birds.right.word);
					fighter.match.life(fightState.birds.left.life, fightState.birds.right.life);
				  
					fighter.match.set(states.fighting);

					break;
				case states.tweet:
					var from = 'left';
					if (fightState.birds.right.hit)
						from = 'right';

					fighter.splash.run('tweet', {
						from: from,
						tweets: fightState.birds[from].tweets,
						word: fightState.birds[from].word
					}, function(){});
					
					fighter.match.punch(from);
					fighter.match.life(fightState.birds.left.life, fightState.birds.right.life);

					break;
				case states.endFight:

					fighter.match.life(fightState.birds.left.life, fightState.birds.right.life);
					
					if (fighter.clock.getTime() === 0){

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

					fighter.match.set(states.endFight);

					break;
				default: 
					throw new Error('Expected: fight state'); 
					break;
			}
		}

	};

})();
