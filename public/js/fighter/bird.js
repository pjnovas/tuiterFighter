
var fighter = fighter || {};

fighter.Bird = function(options){
  
  var opts = options || {},

    attrs = {
      y: opts.attrs.top || 0,
      x: opts.attrs.left || 0,
      width: opts.attrs.width || 50,
      height: opts.attrs.height || 50,
      dir: opts.dir || 1
    },

    resourceTiles = opts.resourceTiles,
    side = (attrs.dir > 0)? 'left': 'right',

    punchs = 0,
    oponent = null,
    life = 0,
    statusBar = $('.statusBar.' + side),

    animations = {},
    currentAnimation = 'idle';

  var createAnimations = function(){

    for (var name in fighter.config.bird.animations){
      var animOpts = fighter.config.bird.animations[name];
      animOpts.resName = resourceTiles;
      animations[name] = new fighter.Animation(animOpts);      
    }

  };

  createAnimations();
  
  var hx = (attrs.dir > 0) ? -120 : 300;
  var hitManager = new fighter.HitManager({
    attrs: {
      top: attrs.y + 40,
      left: attrs.x + hx
    },
    side: side
  });

  this.update = function(){
    var cAn = animations[currentAnimation];

    if (cAn){
      if (!cAn.isRunning()) cAn.start();
      else cAn.update();
    }
    else {
      currentAnimation = 'idle';
    }

    hitManager.update();
  };

  this.draw = function(){
    var ctx = fighter.match.context();
    
    if (animations[currentAnimation])
      animations[currentAnimation].draw(attrs.x, attrs.y, attrs.width, attrs.height, attrs.dir);

    hitManager.draw();
  };

  this.name = function(word){
    $('.word div', statusBar).text(word);
  }

  this.setOponent = function(bird){
    oponent = bird;
  };

  this.getAngry = function(){
    
    animations['getAngry'].addEndCallback(function(){
      currentAnimation = 'angry';
    });

    currentAnimation = 'getAngry';
  };

  this.beAngry = function(){
    animations[currentAnimation].kill();
    currentAnimation = 'angry';
  };

  this.beIdle = function(){
    animations[currentAnimation].kill();
    currentAnimation = 'idle';
  };

  this.calmDown = function(callback){
    
    animations['calmDown'].addEndCallback(function(){
      currentAnimation = 'idle';
      if (callback) callback();
    });

    currentAnimation = 'calmDown';
  };

  this.getHit = function(){
    hitManager.reset();

    if(life < 10 && life > 7){
      hitManager.danger();      
    }

    animations['getHit'].addEndCallback(function(){
      currentAnimation = 'angry';
    });

    animations[currentAnimation].kill();
    currentAnimation = 'getHit';
  };

  this.hit = function(){
    var side = 'Right';
    punchs++;

    if (life === 100 && oponent.life() <= 100 && oponent.life() > 97)
      hitManager.firstPunch();      

    hitManager.punch();

    if (punchs % 2 === 0)
      side = 'Left';

    animations['beginHit' + side].addEndCallback(function(){
      currentAnimation = 'endHit' + side;
    });

    animations['endHit' + side].addEndCallback(function(){
      currentAnimation = 'revertHit' + side;
    });

    animations['revertHit' + side].addEndCallback(function(){
      currentAnimation = 'angry';
    });

    animations[currentAnimation].kill();
    currentAnimation = 'beginHit' + side;
    oponent.getHit();
  };

  this.life = function(_life){
    var lifeMin = 100;

    if(_life === undefined) 
      return life;
    else {
      
      life = _life;

      if (life > 100){
        life = 100;
      }

      if (life > 50)
        lifeMin = life + (life * 1.1)/5;
      else if (life > 30)
        lifeMin = life + (life * 1.1)/4;
      else if (life > 10)
        lifeMin = life + (life * 1.1)/3;
      else 
        lifeMin = life + (life * 1.1)/2;
      
      if (lifeMin > 100)
        lifeMin = 100;

      if(life < 0){
        life = 0;
        lifeMin = 0;
      }

      $('.life', statusBar).css('width', life + '%');
      $('.life-min', statusBar).css('width', lifeMin + '%');
    }

    return this;
  };

  this.finalPunch = function(callback){
    var self = this;

    animations['finalPunch'].addEndCallback(function(){
      hitManager.reset();
      currentAnimation = 'frozenFinalPunch';
      callback();
    });

    animations[currentAnimation].kill();
    currentAnimation = 'finalPunch';
    oponent.getFinalPunch();

  };

  this.getFinalPunch = function(){
    hitManager.reset();

    animations['getFinalPunch'].addEndCallback(function(){
      currentAnimation = 'frozenGetFinalPunch';
    });

    animations[currentAnimation].kill();
    currentAnimation = 'getFinalPunch';
  };

  this.finishFinalPunch = function(callback){
    var self = this;

    animations[currentAnimation].kill();
    oponent.finishGetFinalPunch();

    hitManager.reset();
    self.calmDown(callback);
  };

  this.finishGetFinalPunch = function(){
    
    animations['finishGetFinalPunch'].addEndCallback(function(){
      currentAnimation = 'hidden';
    });

    animations[currentAnimation].kill();
    currentAnimation = 'finishGetFinalPunch';
  };

  this.flyAway = function(){
    
    animations['flyAway'].addEndCallback(function(){
      currentAnimation = 'hidden';
    });

    animations[currentAnimation].kill();
    currentAnimation = 'flyAway';
  };
  
  this.test = function(){
    currentAnimation = 'test';
  };
};



