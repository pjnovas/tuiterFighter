
var fighter = fighter || {};

fighter.HitManager = function(options){

  var opts = options || {},
    resName = 'text',
    cText = fighter.config.text;

  var attrs = {
    y: opts.attrs.top || 0,
    x: opts.attrs.left || 0,
    width: opts.attrs.width || cText.sizes.hitNbo.width,
    height: opts.attrs.height || cText.sizes.hitNbo.height,
    legendSpace: 50,
    nboSpace: -30,
    hy: cText.tiles.hitNbo[0].y,
    side: opts.side || 'left'
  };

  var hits = 0,
    timeout = 2000,
    timer = null,
    hitsNbos = [];

  var firstPunch = false,
    danger = false,
    msgShowing = false;

  function showSplash(phrase, color){
    msgShowing = true;
    var color = color || 'blue';

    fighter.splash.run('hit', {
      phrase: phrase,
      side: attrs.side,
      color: color
    }, function(){
      msgShowing = false;
    });
    
  }

  this.update = function(){
    var nbo = cText.tiles.hitNbo;
    hitsNbos = [];

    if (firstPunch){
      showSplash('First Attack!', 'yellow');
      firstPunch = false;
    }

    if(danger){
      showSplash('Danger!', 'red'); 
      danger = false;
    }

    if (hits > 1){

      if (hits > 99){
        hitsNbos.push(nbo[parseInt(hits.toString().charAt(2), 10)].x);
      }
      if (hits > 9){
        hitsNbos.push(nbo[parseInt(hits.toString().charAt(1), 10)].x);
      }
      hitsNbos.push(nbo[parseInt(hits.toString().charAt(0), 10)].x);

      if (!msgShowing){
        var rnd = Math.round(Math.random());

        switch(hits){
          case 2:
          case 5:
            if (rnd)
              showSplash('Yes!');
            else showSplash('Good!');
            break;
          case 10:
          case 15:
            if (rnd)
              showSplash('Cool!');
            else showSplash('Great!');
            break;
          case 20:
          case 25:
            if (rnd)
              showSplash('Stylish!');
            else showSplash('Viewtiful!');
            break;
          case 30:
          case 35:
          case 40:
            if (rnd)
              showSplash('Excelent!');
            else showSplash('Wooooow!');
            break;
          case 45:
          case 50:
            showSplash('Tuiterous!');
            break;
        }
      }
    }
  };

  this.draw = function(){
    var ctx, image, w, h;

    if (hitsNbos.length > 0){

      ctx = fighter.match.context();
      image = fighter.repository[resName];
      w = cText.sizes.hitNbo.width;
      h = cText.sizes.hitNbo.height;

      for (var i=hitsNbos.length-1; i>=0 ; i--){
        ctx.drawImage(image, hitsNbos[i], attrs.hy, w, h, attrs.x + (i * attrs.nboSpace), attrs.y, w, h);
      }

      ctx.drawImage(image, cText.tiles.hits.x, cText.tiles.hits.y, w, h, attrs.x + attrs.legendSpace, attrs.y, w, h);
    }
  };

  this.punch = function(){
    hits++;

    clearTimeout(timer);
    timer = setTimeout(function(){
      hits = 0;
    }, timeout);
  };

  this.firstPunch = function(){
    firstPunch = true;
  };

  this.danger = function(){
    danger = true;
  };

  this.reset = function(){
    hits = 0;
  };

  this.clear = function(){
    hits = 0;
    timeout = 2000;
    timer = null;
    hitsNbos = [];

    firstPunch = false;
    danger = false;
    msgShowing = false;
  }
};
