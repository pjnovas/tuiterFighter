
var fighter = fighter || {};

fighter.splash = (function(){

	var init = {
		ready: function(){
			var word = 'Ready!';
			
			$('div.ready').remove();

			var divReady = $('<div>').addClass('ready');

			for (var i=0; i<word.length; i++){
				$('<span>')
					.addClass('A')
					.addClass('x' + i)
					.text(word.charAt(i))
					.appendTo(divReady);
			}

			divReady.appendTo('#fighter-ctn');
		},

		fight: function(){
			var word = 'Fight!';

			$('div.fight').remove();
			
			$('<div>')
				.addClass('fight')
				.addClass('A')
				.text(word)
				.appendTo('#fighter-ctn');
		},

		knockout: function(){
			var word = 'K.O.';

			$('div.ko').remove();
			
			$('<div>')
				.addClass('ko')
				.text(word)
				.appendTo('#fighter-ctn');
		},

		timesup: function(){
			var word = "Time's Up!";

			$('div.timesup').remove();
			
			$('<div>')
				.addClass('timesup')
				.text(word)
				.appendTo('#fighter-ctn');
		},

		hit: function(){
			$('div.hitLegend').remove();
			
			$('<div>')
				.addClass('hitLegend')
				.addClass('left')
				.addClass('hide')
				.appendTo('#fighter-ctn');

			$('<div>')
				.addClass('hitLegend')
				.addClass('right')
				.addClass('hide')
				.appendTo('#fighter-ctn');
		}
	};

	var screens = {

		ready: function(callback){
			var letterIdx = 0,
				spansReady = $('div.ready span'),
				tmrReady;

			function hide(){
				spansReady.addClass('C');
			}

			function run(){
				if (letterIdx > 5){
		  		clearInterval(tmrReady);
		  		if (callback) callback();
		  		setTimeout(hide, 1100);
		  	}

		  	spansReady.eq(letterIdx).removeClass('A').addClass('B');
		  	letterIdx++;
			}

		  tmrReady = setInterval(run, 300);
		},

		fight: function(callback){
			var divFight = $('div.fight');
			divFight.addClass('B');

			function hide(){
				divFight.removeClass('B');
				if (callback) callback();
			}

			setTimeout(hide, 1100);
		},

		knockout: function(callback){
			$('div.ko').addClass('show');

			setTimeout(function(){
				$('div.ko').removeClass('show');
				setTimeout(callback, 500);
			}, 2000);
		},
		
		timesup: function(callback){
			$('div.timesup').addClass('show');

			setTimeout(function(){
				$('div.timesup').removeClass('show');
				setTimeout(callback, 500);
			}, 2000);
		},

		hit: function(callback, options){
			var div = $('div.hitLegend.' + options.side),
				color = options.color || 'blue';

			div.text(options.phrase).removeClass('hide').addClass('show').addClass(color);

			setTimeout(function(){
				div.removeClass('show').addClass('hide').removeClass(color);
				if (callback) callback();
			}, 2000);
		}
	};

	return {

		create: function(){
			init.ready();
			init.fight();
			init.hit();
			init.knockout();
			init.timesup();
		},

		run: function(screen, options, callback){
			if (screens[screen]){
				if (!callback) callback = options;
				screens[screen](callback, options);
			}
			else throw new Error("Screen '" + screen + "' Not Found!");

			return this;
		}

	};

})();
