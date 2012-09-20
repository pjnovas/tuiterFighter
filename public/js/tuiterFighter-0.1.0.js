/*! tuiterFighter - v0.1.0 - 2012-09-19
* http://tuiterfighter.com
* Copyright (c) 2012 Pablo Novas; Licensed XXX */


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


var fighter = fighter || {};

fighter.fightStates = fighter.fightStates || {};
fighter.fightStates.idle = 'idle';
fighter.fightStates.waiting = 'waiting';
fighter.fightStates.startFight = 'startFight';
fighter.fightStates.fighting = 'fighting';
fighter.fightStates.tweet = 'tweet';
fighter.fightStates.endFight = 'endFight';


fighter.birdStates = fighter.birdStates || {};
fighter.birdStates.angry = 'angry';
fighter.birdStates.calm = 'calm';
fighter.birdStates.dead = 'dead';

fighter.clockStates = fighter.clockStates || {};
fighter.clockStates.stoped = 'stoped';
fighter.clockStates.runing = 'runing';



var fighter = fighter || {};
fighter.config = fighter.config || {};
fighter.config.bird = fighter.config.bird || {};

fighter.config.bird.sizes = (function() {

  return {
    body: { 
      width: 150,
      height: 200
    },
    leftPunch: {
      width: 300,
      height: 100
    },
    rightPunch: {
      width: 300,
      height: 100
    },
    leftWing: {
      width: 150,
      height: 100
    },
    rightWing: {
      width: 150,
      height: 100
    },
    eye: {
      width: 40,
      height: 30
    },
    beak: {
      width: 40,
      height: 30
    },
    tail: {
      width: 80,
      height: 44
    },
    legs: {
      width: 80,
      height: 60
    },
    fire: {
      width: 90,
      height: 140
    }
  };
  
})();


var fighter = fighter || {};
fighter.config = fighter.config || {};
fighter.config.bird = fighter.config.bird || {};

fighter.config.bird.tiles = (function() {

  return {
    body: [
      { x: 0, y: 0},
      { x: 150, y: 0},
      { x: 300, y: 0},
      { x: 450, y: 0},
      { x: 600, y: 0}
    ],
    leftPunch: [
      { x: 750, y: 100},
      { x: 1050, y: 100}
    ],
    rightPunch: [
      { x: 750, y: 0},
      { x: 1050, y: 0}
    ],
    leftWing: [
      { x: 0, y: 300},
      { x: 150, y: 300},
      { x: 300, y: 300},
      { x: 450, y: 300},
      { x: 600, y: 300},
      { x: 750, y: 300},
      { x: 900, y: 300},
      { x: 1050, y: 300},
      { x: 1200, y: 300}
    ],
    rightWing: [
      { x: 0, y: 200},
      { x: 150, y: 200},
      { x: 300, y: 200},
      { x: 450, y: 200},
      { x: 600, y: 200},
      { x: 750, y: 200},
      { x: 900, y: 200},
      { x: 1050, y: 200},
      { x: 1200, y: 200}
    ],
    legs: [
      { x: 0, y: 400},
      { x: 80, y: 400},
      { x: 160, y: 400},
      { x: 240, y: 400},
      { x: 320, y: 400}
    ],
    tail: [
      { x: 640, y: 400},
      { x: 720, y: 400},
      { x: 800, y: 400},
      { x: 880, y: 400},
      { x: 960, y: 400},
      { x: 1040, y: 400}
    ],
    beak: [
      { x: 400, y: 400},
      { x: 440, y: 400},
      { x: 480, y: 400},
      { x: 520, y: 400},
      { x: 560, y: 400},
      { x: 600, y: 400}
    ],
    eye: [
      { x: 400, y: 430},
      { x: 440, y: 430},
      { x: 480, y: 430},
      { x: 520, y: 430},
      { x: 560, y: 430},
      { x: 600, y: 430}
    ],
    fire: [
      { x: 0, y: 460},
      { x: 90, y: 460},
      { x: 180, y: 460}
    ]
  };

})();


var fighter = fighter || {};
fighter.config = fighter.config || {};
fighter.config.bird = fighter.config.bird || {};

fighter.config.bird.frames = (function() {

  var bTiles = fighter.config.bird.tiles;

  return {
    a: {
      body: {
        tile: bTiles.body[0],
        x: 50,
        y: 20
      },
      leftWing: {
        tile: bTiles.leftWing[0],
        x: 30,
        y: 90
      },
      rightWing: {
        tile: bTiles.rightWing[0],
        x: 30,
        y: 100
      },
      eye: {
        tile: bTiles.eye[0],
        x: 125,
        y: 50
      },
      beak: {
        tile: bTiles.beak[0],
        x: 142,
        y: 72
      },
      tail: {
        tile: bTiles.tail[0],
        x: 20,
        y: 180
      },
      legs: {
        tile: bTiles.legs[0],
        x: 75,
        y: 175
      }
    },
    b: {
      body: {
        tile: bTiles.body[1],
        x: 51,
        y: 12
      },
      leftWing: {
        tile: bTiles.leftWing[1],
        x: 21,
        y: 82
      },
      rightWing: {
        tile: bTiles.rightWing[1],
        x: 21,
        y: 92
      },
      eye: {
        tile: bTiles.eye[1],
        x: 130,
        y: 42
      },
      beak: {
        tile: bTiles.beak[1],
        x: 153,
        y: 64
      },
      tail: {
        tile: bTiles.tail[1],
        x: 20,
        y: 165
      },
      legs: {
        tile: bTiles.legs[1],
        x: 76,
        y: 175
      }
    },
    c: {
      body: {
        tile: bTiles.body[1],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 11,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 11,
        y: 82
      },
      eye: {
        tile: bTiles.eye[2],
        x: 130,
        y: 36
      },
      beak: {
        tile: bTiles.beak[2],
        x: 152,
        y: 60
      },
      tail: {
        tile: bTiles.tail[2],
        x: 26,
        y: 157
      },
      legs: {
        tile: bTiles.legs[2],
        x: 76,
        y: 165
      }
    },
    d: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[3],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[3],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[3],
        x: 145,
        y: 38
      },
      beak: {
        tile: bTiles.beak[3],
        x: 163,
        y: 63
      },
      tail: {
        tile: bTiles.tail[3],
        x: 16,
        y: 157
      },
      legs: {
        tile: bTiles.legs[3],
        x: 76,
        y: 165
      }
    },
    e: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[3],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[3],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    f: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[4],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[4],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[3],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hra: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[1],
        x: 15,
        y: 80
      },
      rightWing: {
        tile: bTiles.rightWing[5],
        x: 25,
        y: 85
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hrb: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 15,
        y: 80
      },
      rightWing: {
        tile: bTiles.rightWing[6],
        x: 75,
        y: 85
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hrc: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[3],
        x: 15,
        y: 80
      },
      rightWing: {
        tile: bTiles.rightWing[7],
        x: 95,
        y: 70
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hrd: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[4],
        x: 15,
        y: 80
      },
      rightWing: {
        tile: bTiles.rightWing[8],
        x: 125,
        y: 30
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hre: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[4],
        x: 15,
        y: 80
      },
      rightPunch: {
        tile: bTiles.rightPunch[0],
        x: -18,
        y: 30
      },
      fire: {
        tile: bTiles.fire[0],
        x: 200,
        y: 0
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hrf: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[4],
        x: 15,
        y: 80
      },
      rightPunch: {
        tile: bTiles.rightPunch[1],
        x: -18,
        y: 30
      },
      fire: {
        tile: bTiles.fire[1],
        x: 200,
        y: 0
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hrg: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[4],
        x: 15,
        y: 80
      },
      rightPunch: {
        tile: bTiles.rightPunch[1],
        x: -18,
        y: 30
      },
      fire: {
        tile: bTiles.fire[2],
        x: 200,
        y: 0
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hla: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[5],
        x: 25,
        y: 85
      },
      rightWing: {
        tile: bTiles.rightWing[1],
        x: 15,
        y: 80
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hlb: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[6],
        x: 75,
        y: 85
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 15,
        y: 80
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hlc: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[7],
        x: 95,
        y: 70
      },
      rightWing: {
        tile: bTiles.rightWing[3],
        x: 15,
        y: 80
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hld: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[8],
        x: 125,
        y: 30      
      },
      rightWing: {
        tile: bTiles.rightWing[4],
        x: 15,
        y: 80
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hle: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftPunch: {
        tile: bTiles.leftPunch[0],
        x: -18,
        y: 30     
      },
      fire: {
        tile: bTiles.fire[0],
        x: 200,
        y: 0
      },
      rightWing: {
        tile: bTiles.rightWing[4],
        x: 15,
        y: 80
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hlf: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftPunch: {
        tile: bTiles.leftPunch[1],
        x: -18,
        y: 30      
      },
      fire: {
        tile: bTiles.fire[1],
        x: 200,
        y: 0
      },
      rightWing: {
        tile: bTiles.rightWing[4],
        x: 15,
        y: 80
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hlg: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[8],
        x: 125,
        y: 30      
      },
      fire: {
        tile: bTiles.fire[2],
        x: 200,
        y: 0
      },
      rightWing: {
        tile: bTiles.rightWing[4],
        x: 15,
        y: 80
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    hurtA: {
      translate: {
        x: 10,
        y: 0
      },
      rotate: {
        angle: -10,
        x: -240,
        y: -150
      },
      body: {
        tile: bTiles.body[3],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 140,
        y: 38
      },
      beak: {
        tile: bTiles.beak[5],
        x: 160,
        y: 60
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 158
      },
      legs: {
        tile: bTiles.legs[3],
        x: 76,
        y: 165
      }
    },
    hurtB: {
      translate: {
        x: 20,
        y: 0
      },
      rotate: {
        angle: -10,
        x: -240,
        y: -150
      },
      body: {
        tile: bTiles.body[4],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 137,
        y: 38
      },
      beak: {
        tile: bTiles.beak[5],
        x: 158,
        y: 60
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 158
      },
      legs: {
        tile: bTiles.legs[3],
        x: 76,
        y: 165
      }
    },



    fpa: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftPunch: {
        tile: bTiles.leftPunch[0],
        x: -18,
        y: 30     
      },
      rightPunch: {
        tile: bTiles.rightPunch[0],
        x: -23,
        y: 40
      },
      fire: {
        tile: bTiles.fire[0],
        x: 200,
        y: 0
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    fpb: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftPunch: {
        tile: bTiles.leftPunch[1],
        x: -18,
        y: 30      
      },
      rightPunch: {
        tile: bTiles.rightPunch[1],
        x: -23,
        y: 40
      },
      fire: {
        tile: bTiles.fire[1],
        x: 200,
        y: 0
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    fpc: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftPunch: {
        tile: bTiles.leftPunch[1],
        x: -18,
        y: 30
      },
      rightPunch: {
        tile: bTiles.rightPunch[1],
        x: -23,
        y: 40
      },
      fire: {
        tile: bTiles.fire[2],
        x: 200,
        y: 0
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },
    fpd: {
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[8],
        x: 125,
        y: 30      
      },
      rightWing: {
        tile: bTiles.rightWing[8],
        x: 120,
        y: 40
      },
      eye: {
        tile: bTiles.eye[4],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[4],
        x: 164,
        y: 63
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[4],
        x: 76,
        y: 165
      }
    },


    gfpa: {
      translate: {
        x: 10,
        y: 10
      },
      rotate: {
        angle: -10,
        x: -240,
        y: -150
      },
      body: {
        tile: bTiles.body[3],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 140,
        y: 38
      },
      beak: {
        tile: bTiles.beak[5],
        x: 160,
        y: 60
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 158
      },
      legs: {
        tile: bTiles.legs[3],
        x: 76,
        y: 165
      }
    },
    gfpb: {
      translate: {
        x: 100,
        y: 50
      },
      rotate: {
        angle: -20,
        x: -250,
        y: -110
      },
      body: {
        tile: bTiles.body[4],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 137,
        y: 38
      },
      beak: {
        tile: bTiles.beak[5],
        x: 158,
        y: 60
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 158
      },
      legs: {
        tile: bTiles.legs[3],
        x: 76,
        y: 165
      }
    },
    gfpc: {
      translate: {
        x: 150,
        y: 80
      },
      rotate: {
        angle: -30,
        x: -280,
        y: -60
      },
      body: {
        tile: bTiles.body[4],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 137,
        y: 38
      },
      beak: {
        tile: bTiles.beak[5],
        x: 158,
        y: 60
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 158
      },
      legs: {
        tile: bTiles.legs[3],
        x: 76,
        y: 165
      }
    },
    gfpd: {
      translate: {
        x: 200,
        y: 120
      },
      rotate: {
        angle: -45,
        x: -320,
        y: 10
      },
      body: {
        tile: bTiles.body[4],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 137,
        y: 38
      },
      beak: {
        tile: bTiles.beak[5],
        x: 158,
        y: 60
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 158
      },
      legs: {
        tile: bTiles.legs[3],
        x: 76,
        y: 165
      }
    },
    gfpe: {
      translate: {
        x: 230,
        y: 190
      },
      rotate: {
        angle: -70,
        x: -320,
        y: 110
      },
      body: {
        tile: bTiles.body[4],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 137,
        y: 38
      },
      beak: {
        tile: bTiles.beak[5],
        x: 158,
        y: 60
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 158
      },
      legs: {
        tile: bTiles.legs[3],
        x: 76,
        y: 165
      }
    },
    gfpf: {
      translate: {
        x: 230,
        y: 220
      },
      rotate: {
        angle: -80,
        x: -360,
        y: 150
      },
      body: {
        tile: bTiles.body[4],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 15,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 15,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 137,
        y: 38
      },
      beak: {
        tile: bTiles.beak[5],
        x: 158,
        y: 60
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 158
      },
      legs: {
        tile: bTiles.legs[3],
        x: 76,
        y: 165
      }
    },
    gfpg: {
      hidden: true
    },

    flya: {
      translate: {
        x: 20,
        y: 20
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[0],
        x: 30,
        y: 90
      },
      rightWing: {
        tile: bTiles.rightWing[0],
        x: 30,
        y: 100
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[1],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 76,
        y: 165
      }
    },
    flyb: {
      translate: {
        x: 40,
        y: 40
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[1],
        x: 21,
        y: 82
      },
      rightWing: {
        tile: bTiles.rightWing[1],
        x: 21,
        y: 92
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[2],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 74,
        y: 163
      }
    },
    flyc: {
      translate: {
        x: 60,
        y: 60
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 11,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 11,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[1],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[3],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 76,
        y: 165
      }
    },
    flyd: {
      translate: {
        x: 80,
        y: 80
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[0],
        x: 30,
        y: 90
      },
      rightWing: {
        tile: bTiles.rightWing[0],
        x: 30,
        y: 100
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[1],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 76,
        y: 165
      }
    },
    flye: {
      translate: {
        x: 100,
        y: 100
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[1],
        x: 21,
        y: 82
      },
      rightWing: {
        tile: bTiles.rightWing[1],
        x: 21,
        y: 92
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[2],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 74,
        y: 163
      }
    },
    flyf: {
      translate: {
        x: 120,
        y: 120
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 11,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 11,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[1],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[3],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 76,
        y: 165
      }
    },
    flyg: {
      translate: {
        x: 160,
        y: 160
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[0],
        x: 30,
        y: 90
      },
      rightWing: {
        tile: bTiles.rightWing[0],
        x: 30,
        y: 100
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[1],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 76,
        y: 165
      }
    },
    flyh: {
      translate: {
        x: 180,
        y: 180
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[1],
        x: 21,
        y: 82
      },
      rightWing: {
        tile: bTiles.rightWing[1],
        x: 21,
        y: 92
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[2],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 74,
        y: 163
      }
    },
    flyi: {
      translate: {
        x: 200,
        y: 200
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 11,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 11,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[1],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[3],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 76,
        y: 165
      }
    },
    flyj: {
      translate: {
        x: 240,
        y: 240
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[0],
        x: 30,
        y: 90
      },
      rightWing: {
        tile: bTiles.rightWing[0],
        x: 30,
        y: 100
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[1],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[5],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 76,
        y: 165
      }
    },
    flyk: {
      translate: {
        x: 260,
        y: 260
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[1],
        x: 21,
        y: 82
      },
      rightWing: {
        tile: bTiles.rightWing[1],
        x: 21,
        y: 92
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[2],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[4],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 74,
        y: 163
      }
    },
    flyl: {
      translate: {
        x: 280,
        y: 280
      },
      body: {
        tile: bTiles.body[2],
        x: 51,
        y: 6
      },
      leftWing: {
        tile: bTiles.leftWing[2],
        x: 11,
        y: 72
      },
      rightWing: {
        tile: bTiles.rightWing[2],
        x: 11,
        y: 82
      },
      eye: {
        tile: bTiles.eye[5],
        x: 146,
        y: 38
      },
      beak: {
        tile: bTiles.beak[1],
        x: 162,
        y: 62
      },
      tail: {
        tile: bTiles.tail[3],
        x: 16,
        y: 156
      },
      legs: {
        tile: bTiles.legs[2],
        x: 76,
        y: 165
      }
    }
  };

})();

var fighter = fighter || {};
fighter.config = fighter.config || {};
fighter.config.bird = fighter.config.bird || {};

fighter.config.bird.animations = (function() {

  var bframes = fighter.config.bird.frames;

  return {
    idle: {
      runTimes: 0,
      framesPerStep: 7,
      frames: [
        bframes.a
      ]
    },
    getAngry: {
      runTimes: 1,
      framesPerStep: 4,
      frames: [
        bframes.a,
        bframes.b,
        bframes.c,
        bframes.d,
        bframes.e,
        bframes.f
      ]
    },
    calmDown: {
      runTimes: 1,
      framesPerStep: 7,
      frames: [
        bframes.f,
        bframes.e,
        bframes.d,
        bframes.c,
        bframes.b,
        bframes.a
      ]
    },
    angry: {
      runTimes: 0,
      framesPerStep: 4,
      frames: [
        bframes.e,
        bframes.f
      ]
    },
    beginHitRight: {
      runTimes: 1,
      framesPerStep: 3,
      frames: [
        bframes.hre,
        bframes.hrf,
        bframes.hrg
      ]
    },
    endHitRight: {
      runTimes: 1,
      framesPerStep: 1,
      frames: [
        bframes.hrd,
        bframes.hrd,
        bframes.hrd
      ]
    },
    revertHitRight: {
      runTimes: 1,
      framesPerStep: 1,
      frames: [
        bframes.hrc,
        bframes.hrb,
        bframes.hra
      ]
    },
    beginHitLeft: {
      runTimes: 1,
      framesPerStep: 3,
      frames: [
        bframes.hle,
        bframes.hlf,
        bframes.hlg
      ]
    },
    endHitLeft: {
      runTimes: 1,
      framesPerStep: 1,
      frames: [
        bframes.hld,
        bframes.hld,
        bframes.hld
      ]
    },
    revertHitLeft: {
      runTimes: 1,
      framesPerStep: 1,
      frames: [
        bframes.hlc,
        bframes.hlb,
        bframes.hla
      ]
    },
    getHit: {
      runTimes: 1,
      framesPerStep: 3,
      frames: [
        bframes.hurtA,
        bframes.hurtB,
        bframes.hurtB,
        bframes.hurtB,
        bframes.hurtA
      ]
    },
    finalPunch: {
      runTimes: 1,
      framesPerStep: 3,
      frames: [
        bframes.fpa,
        bframes.fpb,
        bframes.fpc,
        bframes.fpd,
        bframes.fpd
      ]
    },
    frozenFinalPunch: {
      runTimes: 0,
      framesPerStep: 3,
      frames: [
        bframes.fpd
      ]
    },
    getFinalPunch: {
      runTimes: 1,
      framesPerStep: 1,
      frames: [
        bframes.hurtA,
        bframes.gfpa,
        bframes.gfpb,
        bframes.gfpc
      ]
    },
    frozenGetFinalPunch: {
      runTimes: 0,
      framesPerStep: 3,
      frames: [
        bframes.gfpc
      ]
    },
    finishGetFinalPunch: {
      runTimes: 1,
      framesPerStep: 1,
      frames: [
        bframes.gfpd,
        bframes.gfpe,
        bframes.gfpf,
        bframes.gfpg
      ]
    },
    hidden: {
      runTimes: 0,
      framesPerStep: 1,
      frames: [
        bframes.gfpg
      ]
    },
    flyAway: {
      runTimes: 1,
      framesPerStep: 3,
      frames: [
        bframes.flya,
        bframes.flyb,
        bframes.flyc,
        bframes.flyd,
        bframes.flye,
        bframes.flyf,
        bframes.flyg,
        bframes.flyh,
        bframes.flyi,
        bframes.flyj,
        bframes.flyk,
        bframes.flyl
      ]
    },
    test: {
      runTimes: 0,
      framesPerStep: 3,
      frames: [
        bframes.flya,
        bframes.flyb
      ]
    }
  };

})();

var fighter = fighter || {};
fighter.config = fighter.config || {};
fighter.config.text = fighter.config.text || {};

fighter.config.text.sizes = {

	hitNbo: {
		width: 60,
		height: 60
	},
	hits: {
		width: 60,
		height: 60
	}
};

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
var fighter = fighter || {};
fighter.config = fighter.config || {};
fighter.config.clock = fighter.config.clock || {};

fighter.config.clock.sizes = {

	sphere: {
		width: 100,
		height: 100
	},
	number: {
		width: 40,
		height: 50
	},
	legend: {
		width: 110,
		height: 25
	},
	time: {
		width: 50,
		height: 20
	}
};

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

var fighter = fighter || {};

fighter.repository = (function(){
	var resources = {},
			loaded = 0,
			getCount = function(){return Object.keys(resources).length;};
	
	var events = {
		complete: function(){},
		report: function(){},
		error: function(){}
	};

	var imageLoaded = function() {
		var prg = (++loaded * 100) / getCount();
		events.report(prg);
		if (prg >= 100) events.complete();
	};
	
	var imageFailed = function(evt, etc){
		events.error(evt, etc);				
	};

	return {
		on: function(eventName, callback){
			if (events[eventName])
			events[eventName] = callback;
			return this;
		},
		
		loadOne: function(name, callback, errorCallback){
			var cb = (callback || function(){}),
				errorCb = (errorCallback || function(){});
			
			if (!name) throw "Parameter 'name' not specify";
			
			if (resources[name]){
				this[name] = new Image();
				this[name].onload = cb;
				this[name].onerror = errorCb;
				this[name].src = resources[name];
				if (this[name].complete) cb();
			} else throw "Resource " + name + " not found!. Use addReource() before load.";
			return this;
		},
		
		load: function(){
			loaded = 0;
			for (var img in resources) {
				this[img] = new Image();
				this[img].onload = imageLoaded;
				this[img].onerror = imageFailed;
				this[img].src = resources[img];
				if (this[img].complete) imageLoaded();
			}
			return this;
		},
		
		addResources: function(newResources){
			for(var r in newResources){
				if (resources.hasOwnProperty(r)) throw 'The resource ' + r + ' already exists.';
				resources[r] = newResources[r];
			}
			return this;
		},
		
		clear: function(){
			var i = getCount();
			do {
				if (this[resources[i]]){
					this[resources[i]] = null;
					delete this[resources[i]];
				}
			} while (i--);
			resources = {};
		}
		
	};
	
})();



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


var fighter = fighter || {};

fighter.Animation = function(options){
	var resName = options.resName,

		frames = options.frames,
		runTimes = options.runTimes || 0,
		framesPerStep = options.framesPerStep || 1,
		framesPerRound = options.framesPerRound || 0,
		
		currentStep = 0,
		firstStep = options.firstStep || 0,
		lastStep = frames.length - 1,
		
		running = false,
		rounds = 0,
		updTimes = 0,
		movingRound = false,
		
		endCallbacks = [];
		if (options.endCallback)
			endCallbacks.push(options.endCallback);

	this.update = function() {
		updTimes++;
		
		if (framesPerRound && movingRound){
			if (updTimes > framesPerRound){
				updTimes = 0;
				movingRound = false;
				rounds++;
			}
		}
		else if (updTimes > framesPerStep) {
			updTimes = 0;
			
			currentStep++;
			if (currentStep > lastStep){
				currentStep = 0;
			
				if (runTimes && runTimes === rounds)
					this.stop();
				
				movingRound = true;
			}
		}
	};
	
	this.draw = function(x, y, bW, bH, dir) {
		var ctx = fighter.match.context(),
			sizes = fighter.config.bird.sizes,
			image = fighter.repository[resName],
			frm = frames[currentStep],
			members = ['leftWing', 'leftPunch', 'legs', 'tail', 'body', 'eye', 'beak', 'rightPunch', 'rightWing', 'fire'];

		if (!frm.hidden) {
			for (var i=0; i< members.length; i++){
				var mName = members[i],
					mSize = sizes[mName],
					mFrm = frm[mName];

				if(!mFrm) continue;

				var w = mSize.width,
					h = mSize.height,

					tx = mFrm.tile.x,
					ty = mFrm.tile.y,

					cx = mFrm.x + x,
					cy = mFrm.y + y;

				ctx.save();

				if (dir === -1){
					ctx.translate(x*2 + bW, 0);
					ctx.scale(-1, 1);
				}

				if (frm.rotate){
					if (dir === -1){
						ctx.translate(x/2 - bW, (y*2.4 - bH) - (frm.rotate.y*-1));
						ctx.rotate(frm.rotate.angle * Math.PI / 180);
					}
					else {
						ctx.translate(x + frm.rotate.x, y + frm.rotate.y);
						ctx.rotate(frm.rotate.angle * Math.PI / 180);
					}
				}

				if (frm.translate){
					cx += (-1 *dir) * (frm.translate.x * dir);
					cy += (-1 *dir) * (frm.translate.y * dir);
				}
				
				ctx.drawImage(image, tx, ty, w, h, cx, cy, w, h);
				ctx.restore();
			}
		}
	};
	
	this.start = function() {
		rounds = 1;
		updTimes = 0;
		currentStep = firstStep;
		running = true;
	};
	
	this.kill = function() {
		running = false;
	};

	this.stop = function() {
		running = false;
		for(var i=0; i< endCallbacks.length; i++)
			endCallbacks[i]();
	};

	this.isRunning = function() {
		return running;
	};
	
	this.addEndCallback = function(callback) {
		for(var i=0; i< endCallbacks.length; i++)
			endCallbacks[i] = null;

		endCallbacks = [];
		endCallbacks.push(callback);
	};
};



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

    if (life === 100 && oponent.life() < 100 && oponent.life() >= 98)
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

  this.reset = function(){
    punchs = 0;
    life = 0;
    statusBar = $('.statusBar.' + side);

    animations = {};
    currentAnimation = 'idle';
    createAnimations();

    hitManager.clear();
  };
};




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
        if (cY == fromY)
          hiding = false;
      }
      else if (showing){
        cY += vel;
        if (cY == toY)
          showing = false;
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

var fighter = fighter || {};

fighter.stage = (function(){
	var birdL, birdR;

  var createLifeBars = function(){
    $('div.statusBar').remove();

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

    if (birdL && birdR){
      birdL.reset();
      birdR.reset();
    }
    else {
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
    }
  };

	return {
		create: function(){
      $('#fighter-ctn').css('background', 'url(../img/bg.png)');
			
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




var fighter = fighter || {};

fighter.splash = (function(){
	var loadingP = 1,
		loadingI = null,
		currPer = 0,
		movingNbs = null;

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
		},

		tweet: function(){
			$('div.tuits').remove();

			var tuits = "<div class='left t0'></div> \
									<div class='left t1'></div> \
									<div class='right t0'></div> \
									<div class='right t1'></div>";

			$('<div>')
				.addClass('tuits')
				.append(tuits)
				.appendTo('#fighter-ctn');
		},

		cover: function() {
			if (!$('div.cover').length)
				$('<div>').addClass('cover').appendTo('#fighter-ctn');
		},

		waiting: function() {
			var phrase = 'Next fight in';
			$('div.waitingMsg, div.waitingSecs').remove();

			$('<div>')
				.addClass('waitingMsg')
				.text(phrase)
				.appendTo('#fighter-ctn');

			$('<div>')
				.addClass('waitingSecs')
				.appendTo('#fighter-ctn');
		},

		win: function() {
			var msg = 'Wins!';
			$('div.winMsg, div.winWord').remove();

			$('<div>')
				.addClass('winWord')
				.appendTo('#fighter-ctn');

			$('<div>')
				.addClass('winMsg')
				.text(msg)
				.appendTo('#fighter-ctn');
		},

		draw: function() {
			var msg = 'Draw!!';
			$('div.draw').remove();

			$('<div>')
				.addClass('draw')
				.text(msg)
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
		},

		tweet: function(callback, options){
			var side = options.from,
				word = options.word,
				tweets = options.tweets,
				tuits = $('div.tuits');

			function buildTweet(idx){
				var formTw = tweets[idx].text.replace(new RegExp(word,'gi'), "<span>" + word + "</span>");
				return "<label>@" + tweets[idx].user.name + "</label><br/>" + formTw;
			}

			if (tweets[0])
				$('.' + side + '.t0', tuits).html(buildTweet(0));

			if (tweets[1])
				$('.' + side + '.t1', tuits).html(buildTweet(1));
		},

		cover: function(callback, options){
			var action = options.action || 'hide';

			if (action === 'show') 
				$('div.cover').removeClass('opaque').addClass('show');
			else if (action === 'opaque') 
				$('div.cover').removeClass('show').addClass('opaque');
			else if (action === 'hide') 
				$('div.cover').removeClass('opaque').removeClass('show');
		},

		bigcover: function(callback, options){
			var action = options.action || 'show',
				perc = options.percentage || 0;

			if (action === 'show') {
				clearInterval(loadingI);
				loadingI = setInterval(function(){
					loadingP++;
					if (loadingP === 4)
						loadingP = 1;

					var text = "Loading ";
					for(var i=0; i< loadingP; i++){
						text += '.';
					}

					$('div.loading').text(text);

				}, 1000);
			}
			else if (action === 'hide') {
				clearInterval(loadingI);
				clearInterval(movingNbs);
				$('div.loadingP').text('100%');
				$('div.loading').add('div.loadingP').removeClass('show');

				setTimeout(function(){
					$('div.bigcover').removeClass('show');
					if (callback) callback();
				}, 500);
				return;
			}
			else if (action === 'update') {
				clearInterval(movingNbs);
				movingNbs = setInterval(function(){
					currPer++;
					if (currPer === perc){
						clearInterval(movingNbs);
					}

					$('div.loadingP').text(currPer + '%');
				}, 50);
			}
		},

		waiting: function(callback, options){
			var action = options.action || 'hide';

			if (action === 'show') 
				$('div.waitingMsg, div.waitingSecs').addClass('show');
			else 
				$('div.waitingMsg, div.waitingSecs').removeClass('show');
		},

		win: function(callback, options) {
			var action = options.action || 'hide',
				winner = options.winner || '';

			if (action === 'show')  {
				$('div.winWord').text(winner);
				$('div.winWord, div.winMsg').addClass('show');
			}
			else 
				$('div.winWord, div.winMsg').removeClass('show');
		},

		draw: function(callback) {
			$('div.draw').addClass('show');

			setTimeout(function(){
				$('div.draw').removeClass('show');
				if (callback) callback();
			}, 1500);
		}
	};

	return {

		create: function(){
			init.ready();
			init.fight();
			init.hit();
			init.knockout();
			init.timesup();
			init.tweet();
			init.cover();
			init.waiting();
			init.win();
			init.draw();
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
          setIdle();
          break;
        case states.waiting:
          fighter.splash.run('cover', { action: 'show'});
          setIdle();
          setTimeout(function(){
            fighter.splash.run('cover', { action: 'opaque'});
            fighter.splash.run('waiting', { action: 'show'});
          }, 900);
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

      fighter.splash.run('draw', function(){

        setTimeout(function(){
          fighter.match.end();
        },3000);

      });
    },

    timesUp: function(callback){

      fighter.clock.stop();
      fighter.splash.run('timesup', callback);
    },

    winTimesUp: function(won, loose, word){

      fighter.stage.birds[loose]().flyAway();        
      fighter.stage.birds[won]().calmDown();

      fighter.splash.run('win', { action: 'show', winner: word});

      setTimeout(function(){
        fighter.match.end();
      },3000);
    },

    winPunch: function(who, word){

      fighter.stage.birds[who]().finalPunch(function(){
        fighter.clock.stop();

        fighter.splash.run('knockout', function(){
          fighter.splash.run('win', { action: 'show', winner: word});
          
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


var fighter = fighter || {};

fighter.manager = (function() {
  var cfg,
    canvasId,
    lastState,
    currState,
    currQueue;

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
        wRight = $.trim(txtRight.val());

      if (!wLeft.length){
        txtLeft.addClass('error').attr('title', emptyMsg);
        return;
      }

      if (!wRight.length){
        txtRight.addClass('error').attr('title', emptyMsg);
        return;
      }

      if (wLeft === wRight){
        txtLeft.add(txtRight).addClass('error')
          .attr('title', 'The same words wont be fun, huh?');
        return; 
      }

      for (var i=0; i< currQueue.length; i++){
        var q = currQueue[i];
        if ((q[0] === wLeft || q[1] === wLeft) && (q[0] === wRight || q[1] === wRight)) {
          txtLeft.add(txtRight).addClass('error')
            .attr('title', 'That fight is already on the queue!');
          return;
        }
      }
      
      //TODO: change to a AJAX POST
      socket.emit('addFight', [wLeft, wRight]);
      
      txtLeft.val('');
      txtRight.val('');
    }

    if (disabled) {
      $('#go').off('click').hide();
      
      txtLeft.add(txtRight)
        .addClass('locked')
        .val(lockedMsg)
        .attr('readonly', true)
        .attr('title', why);
    }
    else {
      $('#go').off('click').on('click', onGoClick).show();
      
      txtLeft.add(txtRight)
        .removeClass('locked')
        .val('')
        .attr('readonly', false)
        .attr('title', '');
    }
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

      if(queue.length >= cfg.maxQueue){
        manageGO(true, 'Figths Queue is full, wait for current fight to end');
      }
      else manageGO(false);
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
