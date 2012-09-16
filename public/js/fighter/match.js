
var fighter = fighter || {};

fighter.match = (function(){
  var requestAnimId = 0,
    canvas,
    ctx,
    canvasBuffer,
    bufferCtx;

  var update = function(){
    fighter.stage.update();
  };
  
  var draw = function(){
    bufferCtx.clearRect(0, 0, canvas.width, canvas.height);

    fighter.stage.draw();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasBuffer, 0, 0);
  };

  var startLoop = function(){
    stopLoop();

    var loop = function(){
      update();
      draw();
      requestAnimId = window.requestAnimationFrame(loop);
    };

    loop();
  };

  var stopLoop = function(){
    if (requestAnimId)
      window.cancelAnimationFrame(requestAnimId);

    requestAnimId = 0;
  };

  return {
    context: function(){
      return bufferCtx;
    },

    init: function(canvasId){
      canvas = document.getElementById(canvasId);
      if(!canvas) throw "There is no canvas with id " + canvasId;
      
      canvasBuffer = document.createElement('canvas');
      canvasBuffer.width = canvas.width;
      canvasBuffer.height = canvas.height;
      
      if (canvas.getContext){
        ctx = canvas.getContext('2d');
        bufferCtx = canvasBuffer.getContext('2d');
      } 
      else throw "canvas is not supported!";

      fighter.stage.create();

      return this;
    },
    
    reset: function(){
      fighter.splash.create();
      fighter.stage.create();
    },

    begin: function(){
      startLoop();

      fighter.clock.start();
      fighter.stage.birds.left().getAngry();
      fighter.stage.birds.right().getAngry();

      return this;
    },
    
    end: function(){

      fighter.clock.stop();

      //TODO: run winner & wainting

      setTimeout(stopLoop, 3000);
      return this;
    },

    set: function(state){
      //todo: manage waiting
      var states = fighter.fightStates;

      function setIdle(){
        if (!requestAnimId)
            startLoop();

        fighter.stage.birds.left().beIdle();
        fighter.stage.birds.right().beIdle();
        
        fighter.splash.create();
        
        setTimeout(stopLoop, 3000);
      }

      switch(state){
        case states.idle:
        case states.waiting:
          setIdle();
          break;
        case states.fighting:
          if (!requestAnimId)
            startLoop();

          fighter.stage.showControls(false);
          fighter.clock.start();
          fighter.stage.birds.left().beAngry();
          fighter.stage.birds.right().beAngry();
          break;
      }

      return this;
    },

    words: function(left, right){
      fighter.stage.birds.left().name(left);
      fighter.stage.birds.right().name(right);
    },

    punch: function(from){
      fighter.stage.birds[from]().hit();
    },

    life: function(left, right){
      fighter.stage.birds.left().life(left);
      fighter.stage.birds.right().life(right);
    },

    tie: function(){

      fighter.stage.birds.left().calmDown();
      fighter.stage.birds.right().calmDown();

      /*
      fighter.splash.run('tie', function(){

        setTimeout(function(){
          fighter.match.end();
        },3000);

      });
      */
    },

    timesUp: function(callback){

      fighter.clock.stop();
      fighter.splash.run('timesup', callback);
    },

    winTimesUp: function(won, loose){

      fighter.stage.birds[loose]().flyAway();        
      fighter.stage.birds[won]().calmDown();

      setTimeout(function(){
        fighter.match.end();
      },3000);
    },

    winPunch: function(who){

      fighter.stage.birds[who]().finalPunch(function(){
        fighter.clock.stop();

        fighter.splash.run('knockout', function(){
        
          fighter.stage.birds[who]().finishFinalPunch(function(){
            fighter.match.end();
          }); 
        });
      });
    },

    time: function(seconds){
      fighter.clock.setTime(seconds);
    }

  };

})();
