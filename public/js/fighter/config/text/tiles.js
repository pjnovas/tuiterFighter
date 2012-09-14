
var fighter = fighter || {};
fighter.config = fighter.config || {};
fighter.config.text = fighter.config.text || {};

fighter.config.text.tiles = (function() {
	
	var sizes = fighter.config.text.sizes;
		tiles = {};

	tiles.hitNbo = [];
	for (var i=0; i <= 9; i++){
		tiles.hitNbo.push({
			x: i * sizes.hitNbo.width,
			y: 0
		});
	}

	tiles.hits = {
		x: 600,
		y: 0
	};

	return tiles;

})();