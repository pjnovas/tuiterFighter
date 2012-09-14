
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