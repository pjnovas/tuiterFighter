
var fighter = fighter || {};
fighter.config = fighter.config || {};
fighter.config.clock = fighter.config.clock || {};

fighter.config.clock.tiles = (function() {
	
	var sizes = fighter.config.clock.sizes;
	tiles = {};

	tiles.bars = [];
	for (var i=2; i <= 6; i++){
		tiles.bars.push({
			x: i * sizes.sphere.width,
			y: 0
		});
	}

	tiles.bg = {
		x: 0,
		y: 0
	};

	tiles.front = {
		x: 100,
		y: 0
	};

	tiles.numbersY = [];
	for (var i=0; i <= 9; i++){
		tiles.numbersY.push({
			x: i * sizes.number.width,
			y: 100
		});
	}

	tiles.numbersR = [];
	for (var i=0; i <= 9; i++){
		tiles.numbersR.push({
			x: i * sizes.number.width,
			y: 100 + sizes.number.height
		});
	}

	tiles.timeY = {
		x: 415,
		y: 105
	};

	tiles.timeR = {
		x: 415,
		y: 155
	};

	tiles.legend = {
		x: 500,
		y: 100
	};

	return tiles;

})();