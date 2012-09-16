
var fighter = fighter || {};

fighter.stage = (function(){
	var birdL, birdR;

  var createLifeBars = function(){

  	function create(side){
  		var statusBar = $('<div>').addClass('statusBar').addClass(side);
  		var lifeCtn = $('<div>').addClass('life-ctn');
  		var life = $('<div>').addClass('life');
  		var lifeMin = $('<div>').addClass('life-min');
  		var glass = $('<div>').addClass('glass');

  		var word = $('<div>').addClass('word').append($('<div>'));

  		lifeCtn.append(life).append(lifeMin).append(glass);
  		statusBar.append(lifeCtn).append(word).appendTo('#fighter-ctn').addClass('hidden');
  	}

  	create('left');
  	create('right');
  };

  var createBirds = function(){
    var left = 175,
      top = 200;

    birdL = new fighter.Bird({
      resourceTiles: 'bird',
      dir: 1,
      attrs: {
        top: top,
        left: left,
        width: 250,
        height: 250
      }
    });

    birdR = new fighter.Bird({
      resourceTiles: 'bird',
      dir: -1,
      attrs: {
        top: top,
        left: left + 200,
        width: 250,
        height: 250
      }
    });

    birdL.setOponent(birdR);
    birdR.setOponent(birdL);

  };

	return {
		create: function(){
			createLifeBars();
			createBirds();
			fighter.clock.init(350, -100, 20, false);
		},

	  update: function(){
	    birdL.update();
	    birdR.update();
	    fighter.clock.update();
	  },
	  
	  draw: function(){
	    var ctx = fighter.match.context();

	    ctx.drawImage(fighter.repository['frustum'], 0, 0, 800, 80, 0, 390, 800, 80); 
      
	    birdL.draw();
	    birdR.draw();
	    fighter.clock.draw();
	  },

	  birds: {
	  	left: function(){
	  		return birdL;
	  	},
	  	right: function(){
	  		return birdR;
	  	}
	  },

	  showControls: function(animated){
  		fighter.clock.show(animated);
      $('.statusBar').removeClass('hidden');
	  },

    hideControls: function(animated){
      fighter.clock.hide(animated);
      $('.statusBar').addClass('hidden');
    }
	  
	};

})();


