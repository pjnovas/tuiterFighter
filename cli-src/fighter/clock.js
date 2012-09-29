var fighter = fighter || {};

fighter.clock = (function(){
  var fromY,
    toY,
    cY,
    x,
    isRuning = false,
    times = 0,
    timesToWait = 3,
    showing = false,
    hiding = false, 
    vel = 10,

    tileFrontIdx = 0,
    tileBackIdx = 3,

    timetl = fighter.config.clock.tiles.timeY;
    seconds = 0,
    nboSpace = -25,
    nbos = [];

  return {
    init: function(_x, fy, ty, visible){
      x = _x;
      fromY = fy;
      toY = ty;
      cY = (visible) ? toY : fromY;
    },

    show: function(animated){
      
      if (animated){
        cY = fromY;
        showing = true;
        hiding = false;
      }
      else cY = toY;
    },

    hide: function(animated){
      
      if (animated){
        cY = toY;
        showing = false;
        hiding = true;
      }
      else cY = fromY;
    },

    start: function(){
      isRuning = true;
    },

    stop: function(){
      isRuning = false;
    },

    update: function(){

      if (hiding){
        cY -= vel;
        if (cY <= fromY) {
          cY = fromY;
          hiding = false;
        }
      }
      else if (showing){
        cY += vel;
        if (cY >= toY) {
          cY = toY;
          showing = false;
        }
      }
      else if (isRuning){

        var tiles = fighter.config.clock.tiles,
          nums = tiles.numbersY;
          
        timetl = tiles.timeY;

        if (seconds < 15) {
          nums = tiles.numbersR;
          timetl = tiles.timeR;
        }

        nbos = [];

        if (seconds >= 0){

          if (seconds > 9){
            nbos.push({
              x: nums[parseInt(seconds.toString().charAt(1), 10)].x,
              y: nums[parseInt(seconds.toString().charAt(1), 10)].y
            });
          }

          nbos.push({
            x: nums[parseInt(seconds.toString().charAt(0), 10)].x,
            y: nums[parseInt(seconds.toString().charAt(0), 10)].y
          });

          if (seconds <= 9){
            nbos.push({
              x: nums[0].x,
              y: nums[0].y
            }); 
          }
        }    

        times++;
        if (times > timesToWait){
          times = 0;

          tileFrontIdx++;
          if (tileFrontIdx > 4)
            tileFrontIdx = 0;

          tileBackIdx--;
          if (tileBackIdx < 0)
            tileBackIdx = 4;
        }
      }   
    },
    
    draw: function(){
      var ctx = fighter.match.context(),
        sizes = fighter.config.clock.sizes,
        sphereW = sizes.sphere.width,
        sphereH = sizes.sphere.height,
        image = fighter.repository['clock'],
        tiles = fighter.config.clock.tiles,
        tF = tiles.bars[tileFrontIdx],
        tB = tiles.bars[tileBackIdx],
        bg = tiles.bg,
        front = tiles.front,
        nw = sizes.number.width,
        nh = sizes.number.height;

      //back lines
      ctx.drawImage(image, tB.x, tB.y, sphereW, sphereH, x, cY, sphereW, sphereH);

      //bg
      ctx.drawImage(image, bg.x, bg.y, sphereW, sphereH, x, cY, sphereW, sphereH);

      //front lines
      ctx.drawImage(image, tF.x, tF.y, sphereW, sphereH, x, cY, sphereW, sphereH);

      //front horz
      ctx.drawImage(image, front.x, front.y, sphereW, sphereH, x, cY, sphereW, sphereH);

      //time
      ctx.drawImage(image, timetl.x, timetl.y, sizes.time.width, sizes.time.height, x+28, cY, sizes.time.width, sizes.time.height);

      //legend
      ctx.drawImage(image, tiles.legend.x, tiles.legend.y, sizes.legend.width, sizes.legend.height, x, cY+62, sizes.legend.width, sizes.legend.height);

      for (var i=nbos.length-1; i>=0 ; i--){
        ctx.drawImage(image, nbos[i].x, nbos[i].y, nw, nh, x+42 + (i * nboSpace), cY + 20, nw, nh);
      }

    },

    setTime: function(number){
      seconds = number;
    },

    getTime: function(){
      return seconds;
    }
  };

})();