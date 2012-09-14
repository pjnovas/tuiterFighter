
/* Begin -- Given by Server */ 
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
	}
};

/*
var fight = {
	state: fighter.fightStates.waiting,
	birds: {
		left: {
			word: 'Word A',
			life: 100,
			state: fighter.birdStates.calm
		},
		right: {
			word: 'Word B',
			life: 100,
			state: fighter.birdStates.calm
		}
	},
	clock: {
		state: fighter.clockStates.stoped,
		time: 99
	}
};
*/

/* End -- Given by Server */


$(function(){

	fighter.manager.on('ready', function(){
		console.log('READY!');

		//call server to get current state
		runDemo();
		//simulate_StartFight();
	}).load('canvasFight', fighterConfig);

});

var fight;

function runDemo(){
	
	//set IDLE state - nothing to do, all clean

	fight = {
		state: fighter.fightStates.idle
	};

	fighter.manager.update(fight);

	//simulate a fight added in 2 seconds 
	setTimeout(simulate_NextFight, 2000);

}

function simulate_NextFight(){

	//set next fight to start in 5 seconds (state = waiting)
	var timeIn =  5000;

	fight = {
		state: fighter.fightStates.waiting,
		nextIn: timeIn,
		birds: {
			left: {
				word: 'Word A'
			},
			right: {
				word: 'Word B'
			},
			clock: {
				time: 99
			}
		}
	};

	fighter.manager.update(fight);

	setTimeout(simulate_StartFight, timeIn);
}

function simulate_StartFight(){

	//set start a fight (state = startFight)

	fight = {
		state: fighter.fightStates.startFight,
		birds: {
			left: {
				word: 'Word A',
				life: 100
			},
			right: {
				word: 'Word B',
				life: 100
			}
		},
		clock: {
			time: 99
		}
	};

	fighter.manager.update(fight);

	setTimeout(simulate_clockTick, 3000);
	setTimeout(simulate_Tweets, 5000);
}

function simulate_Tweets(){

	//set state in tweet randomly (state = tweet)

	var birdsLife= {
		left: 100,
		right: 100
	};

	function tweet(which, oposite){
		if (fight.state != fighter.fightStates.endFight){
			fight.state = fighter.fightStates.tweet;

			fight.birds[which].life = birdsLife[which];
			fight.birds[which].hit = true;

			birdsLife[oposite] -= 2;
			fight.birds[oposite].life = birdsLife[oposite];
			fight.birds[oposite].hit = false;

			fighter.manager.update(fight);

			if (fight.birds[oposite].life <= 0){
				fight.state = fighter.fightStates.endFight;
				clearTimeout(tickClock);

				fight.birds[which].hit = false;
				fight.birds[oposite].life = 0;

				fighter.manager.update(fight);
			}
		}
  }

	function makeATweet(){
  	var rndWhich = (Math.floor((Math.random()*10)+1) > 5) ? 'left':'right';
  	var oposite = (rndWhich === 'left') ? 'right': 'left';
  	var rndWait = Math.floor((Math.random()*2000));

  	setTimeout(function(){
  		tweet(rndWhich, oposite);
  		if (fight.state != fighter.fightStates.endFight){
	  		makeATweet();
	  	}
  	}, rndWait);

  }

  makeATweet();
}

var tickClock;
function simulate_clockTick(){
	fight.clock.time = 99;

	clearInterval(tickClock);
	tickClock = setInterval(function(){
  	fight.clock = fight.clock || {};
  	fight.clock.time--;

  	if (fight.clock.time < 0){
  		fight.state = fighter.fightStates.endFight;

  		fight.clock.time = 0;
			fighter.clock.setTime(0);

			fighter.manager.update(fight);
			clearInterval(tickClock);
		}
		else fighter.clock.setTime(fight.clock.time);

  }, 1000);
}
