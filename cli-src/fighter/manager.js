
var fighter = fighter || {};

fighter.manager = (function() {
  var cfg,
    canvasId,
    lastState,
    currState,
    currQueue,
    isLocked = false;

  var events = {
    ready: function(){}
  };

  var load = function(){
    var sprites = cfg.resources.sprites;

    //TODO: make scenaries dynamic
    var scenary = cfg.resources.scenaries[0];

    fighter.splash.create();

    fighter.splash.run('bigcover', { 
      action: 'show'
    });

    fighter.repository.addResources({
      'bird': sprites.bird,
      'frustum': scenary.floor,
      'text': sprites.hits,
      'clock': sprites.clock
    }).on('error', function(err){
      console.log(err);
    }).on('report', function(prg){
      
      fighter.splash.run('bigcover', { 
        action: 'update', 
        percentage: prg
      });

    }).on('complete', function(){
      $('#fighter-ctn').css('background', 'url(../img/bg.png)');
      fighter.match.init(canvasId);
      
      $('<div id="queueTitle">' + 
          '<span class="tfights">Fights</span>' +
          '<span class="tqueue">Queue</span>' +
        '</div>').appendTo('#fighter-ctn');

      fighter.splash.run('bigcover', { action: 'hide'}, function(){
        events.ready();  
      });
    }).load();
  };

  var manageGO = function(disabled, why){
    var txtLeft = $('#wordLeft'), 
      txtRight = $('#wordRight'),
      lockedMsg = 'LOCKED',
      emptyMsg = 'Must fill with a word!';

    function onGoClick(e){
      var wLeft = $.trim(txtLeft.val()),
        wRight = $.trim(txtRight.val()),
        l = wLeft.toLowerCase(),
        r = wRight.toLowerCase();

      if (!isLocked){

        if (!wLeft.length){
          txtLeft.addClass('error').attr('title', emptyMsg);
          return;
        }

        if (!wRight.length){
          txtRight.addClass('error').attr('title', emptyMsg);
          return;
        }

        if (l === r){
          txtLeft.add(txtRight).addClass('error')
            .attr('title', 'The same words wont be fun, huh?');
          return; 
        }

        for (var i=0; i< currQueue.length; i++){
          var q = currQueue[i],
            q0 = q[0].toLowerCase(),
            q1 = q[1].toLowerCase();

          if ((q0 === l || q1 === l) && (q0 === r || q1 === r)) {
            txtLeft.add(txtRight).addClass('error')
              .attr('title', 'That fight is already on the queue!');
            return;
          }
        }
        
        $.ajax({
          type: "POST",
          url: "/fight",
          dataType: "json",
          data: {left: wLeft, right: wRight}
        }).done(function(data) { 
          isLocked = true;
          manageGO(true, "You just added a fight, wait 30 seconds to add another one");

          setTimeout(function(){
            isLocked = false;
            checkQueue();
          }, 30000);
        }).fail(function(err) { 
          console.log(err);
        });
        
        txtLeft.val('');
        txtRight.val('');
      }
    }

    if (disabled || isLocked) {
      $('#go').off('click').hide();
      
      txtLeft.add(txtRight)
        .addClass('locked')
        .removeClass('error')
        .val(lockedMsg)
        .attr('readonly', true)
        .attr('title', why);
    }
    else {
      $('#go').off('click').on('click', onGoClick).show();
      
      txtLeft.add(txtRight)
        .removeClass('locked')
        .removeClass('error')
        .val('')
        .attr('readonly', false)
        .attr('title', '');
    }
  };

  var checkQueue = function(){
    if(currQueue.length >= cfg.maxQueue){
      manageGO(true, 'Figths Queue is full, wait for current fight to end');
    }
    else manageGO(false);
  };

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
      if (currState && currState === fighter.fightStates.waiting) {
        if (time < 0) time = 0;
        $('.waitingSecs').text(time);
      }
      else fighter.match.time(time);
    },

    updateQueue: function(queue){
      var olQueue = $('#fightQueue');

      currQueue = queue;

      if (olQueue.length === 0){
        olQueue = $('<ol id="fightQueue"></ol>').appendTo('#fighter-ctn');
      }
      else $('li', olQueue).remove();

      for(var i=1; i<queue.length; i++){
        var li = $('<li>' +
            '<span class="left"></span>' +
            '<span class="right"></span>' +
          '</li>').appendTo(olQueue);
        
        $('span.left', li).text(queue[i][0]);
        $('span.right', li).text(queue[i][1]);
      }

      checkQueue();
    },

    update: function(fightState){
      var states = fighter.fightStates;
      
      currState = fightState.state;
        
      switch(currState){
        case states.idle:
          fighter.match.set(states.idle);
          break;
        case states.waiting:
          fighter.stage.hideControls(false);
          fighter.splash.run('win', { action: 'hide'});

          fighter.match.set(states.waiting);

          break;
        case states.startFight:
          fighter.match.reset();

          fighter.splash.run('waiting', { action: 'hide'});
          fighter.splash.run('cover', { action: 'hide'});

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
                fighter.match.winTimesUp('left', 'right', fightState.birds.left.word);
              }
              else fighter.match.winTimesUp('right', 'left', fightState.birds.right.word);
            });
          }
          else {
            if (fightState.birds.left.life === 0){
              fighter.match.winPunch('right', fightState.birds.right.word);
            }
            else fighter.match.winPunch('left', fightState.birds.left.word);
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
