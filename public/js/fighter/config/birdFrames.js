
var fighter = fighter || {};
fighter.config = fighter.config || {};

fighter.config.birdFrames = {
  a: {
    body: {
      tile: fighter.config.birdTiles.body[0],
      x: 50,
      y: 20
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[0],
      x: 30,
      y: 90
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[0],
      x: 30,
      y: 100
    },
    eye: {
      tile: fighter.config.birdTiles.eye[0],
      x: 125,
      y: 50
    },
    beak: {
      tile: fighter.config.birdTiles.beak[0],
      x: 142,
      y: 72
    },
    tail: {
      tile: fighter.config.birdTiles.tail[0],
      x: 20,
      y: 180
    },
    legs: {
      tile: fighter.config.birdTiles.legs[0],
      x: 75,
      y: 175
    }
  },
  b: {
    body: {
      tile: fighter.config.birdTiles.body[1],
      x: 51,
      y: 12
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[1],
      x: 21,
      y: 82
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[1],
      x: 21,
      y: 92
    },
    eye: {
      tile: fighter.config.birdTiles.eye[1],
      x: 130,
      y: 42
    },
    beak: {
      tile: fighter.config.birdTiles.beak[1],
      x: 153,
      y: 64
    },
    tail: {
      tile: fighter.config.birdTiles.tail[1],
      x: 20,
      y: 165
    },
    legs: {
      tile: fighter.config.birdTiles.legs[1],
      x: 76,
      y: 175
    }
  },
  c: {
    body: {
      tile: fighter.config.birdTiles.body[1],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[2],
      x: 11,
      y: 72
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[2],
      x: 11,
      y: 82
    },
    eye: {
      tile: fighter.config.birdTiles.eye[2],
      x: 130,
      y: 36
    },
    beak: {
      tile: fighter.config.birdTiles.beak[2],
      x: 152,
      y: 60
    },
    tail: {
      tile: fighter.config.birdTiles.tail[2],
      x: 26,
      y: 157
    },
    legs: {
      tile: fighter.config.birdTiles.legs[2],
      x: 76,
      y: 165
    }
  },
  d: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[3],
      x: 15,
      y: 72
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[3],
      x: 15,
      y: 82
    },
    eye: {
      tile: fighter.config.birdTiles.eye[3],
      x: 145,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[3],
      x: 163,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[3],
      x: 16,
      y: 157
    },
    legs: {
      tile: fighter.config.birdTiles.legs[3],
      x: 76,
      y: 165
    }
  },
  e: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[3],
      x: 15,
      y: 72
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[3],
      x: 15,
      y: 82
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  f: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[4],
      x: 15,
      y: 72
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[4],
      x: 15,
      y: 82
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[3],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hra: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[1],
      x: 15,
      y: 80
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[5],
      x: 25,
      y: 85
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hrb: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[2],
      x: 15,
      y: 80
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[6],
      x: 75,
      y: 85
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hrc: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[3],
      x: 15,
      y: 80
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[7],
      x: 95,
      y: 70
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hrd: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[4],
      x: 15,
      y: 80
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[8],
      x: 125,
      y: 30
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hre: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[4],
      x: 15,
      y: 80
    },
    rightPunch: {
      tile: fighter.config.birdTiles.rightPunch[0],
      x: -18,
      y: 30
    },
    fire: {
      tile: fighter.config.birdTiles.fire[0],
      x: 200,
      y: 0
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hrf: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[4],
      x: 15,
      y: 80
    },
    rightPunch: {
      tile: fighter.config.birdTiles.rightPunch[1],
      x: -18,
      y: 30
    },
    fire: {
      tile: fighter.config.birdTiles.fire[1],
      x: 200,
      y: 0
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hrg: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[4],
      x: 15,
      y: 80
    },
    rightPunch: {
      tile: fighter.config.birdTiles.rightPunch[1],
      x: -18,
      y: 30
    },
    fire: {
      tile: fighter.config.birdTiles.fire[2],
      x: 200,
      y: 0
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hla: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[5],
      x: 25,
      y: 85
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[1],
      x: 15,
      y: 80
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hlb: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[6],
      x: 75,
      y: 85
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[2],
      x: 15,
      y: 80
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hlc: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[7],
      x: 95,
      y: 70
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[3],
      x: 15,
      y: 80
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hld: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[8],
      x: 125,
      y: 30      
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[4],
      x: 15,
      y: 80
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hle: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftPunch: {
      tile: fighter.config.birdTiles.leftPunch[0],
      x: -18,
      y: 30     
    },
    fire: {
      tile: fighter.config.birdTiles.fire[0],
      x: 200,
      y: 0
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[4],
      x: 15,
      y: 80
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hlf: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftPunch: {
      tile: fighter.config.birdTiles.leftPunch[1],
      x: -18,
      y: 30      
    },
    fire: {
      tile: fighter.config.birdTiles.fire[1],
      x: 200,
      y: 0
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[4],
      x: 15,
      y: 80
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hlg: {
    body: {
      tile: fighter.config.birdTiles.body[2],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[8],
      x: 125,
      y: 30      
    },
    fire: {
      tile: fighter.config.birdTiles.fire[2],
      x: 200,
      y: 0
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[4],
      x: 15,
      y: 80
    },
    eye: {
      tile: fighter.config.birdTiles.eye[4],
      x: 146,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[4],
      x: 164,
      y: 63
    },
    tail: {
      tile: fighter.config.birdTiles.tail[4],
      x: 16,
      y: 156
    },
    legs: {
      tile: fighter.config.birdTiles.legs[4],
      x: 76,
      y: 165
    }
  },
  hurtA: {
    body: {
      tile: fighter.config.birdTiles.body[3],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[2],
      x: 15,
      y: 72
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[2],
      x: 15,
      y: 82
    },
    eye: {
      tile: fighter.config.birdTiles.eye[5],
      x: 140,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[5],
      x: 160,
      y: 60
    },
    tail: {
      tile: fighter.config.birdTiles.tail[5],
      x: 16,
      y: 158
    },
    legs: {
      tile: fighter.config.birdTiles.legs[3],
      x: 76,
      y: 165
    }
  },
  hurtB: {
    body: {
      tile: fighter.config.birdTiles.body[4],
      x: 51,
      y: 6
    },
    leftWing: {
      tile: fighter.config.birdTiles.leftWing[2],
      x: 15,
      y: 72
    },
    rightWing: {
      tile: fighter.config.birdTiles.rightWing[2],
      x: 15,
      y: 82
    },
    eye: {
      tile: fighter.config.birdTiles.eye[5],
      x: 137,
      y: 38
    },
    beak: {
      tile: fighter.config.birdTiles.beak[5],
      x: 158,
      y: 60
    },
    tail: {
      tile: fighter.config.birdTiles.tail[5],
      x: 16,
      y: 158
    },
    legs: {
      tile: fighter.config.birdTiles.legs[3],
      x: 76,
      y: 165
    }
  }
};