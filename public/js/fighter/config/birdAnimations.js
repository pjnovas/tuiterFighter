
var fighter = fighter || {};
fighter.config = fighter.config || {};

fighter.config.birdAnimations = {
  idle: {
    runTimes: 0,
    framesPerStep: 7,
    frames: [
      fighter.config.birdFrames.a
    ]
  },
  getAngry: {
    runTimes: 1,
    framesPerStep: 4,
    frames: [
      fighter.config.birdFrames.a,
      fighter.config.birdFrames.b,
      fighter.config.birdFrames.c,
      fighter.config.birdFrames.d,
      fighter.config.birdFrames.e,
      fighter.config.birdFrames.f
    ]
  },
  calmDown: {
    runTimes: 1,
    framesPerStep: 7,
    frames: [
      fighter.config.birdFrames.f,
      fighter.config.birdFrames.e,
      fighter.config.birdFrames.d,
      fighter.config.birdFrames.c,
      fighter.config.birdFrames.b,
      fighter.config.birdFrames.a
    ]
  },
  angry: {
    runTimes: 0,
    framesPerStep: 4,
    frames: [
      fighter.config.birdFrames.e,
      fighter.config.birdFrames.f
    ]
  },
  beginHitRight: {
    runTimes: 1,
    framesPerStep: 3,
    frames: [
      fighter.config.birdFrames.hre,
      fighter.config.birdFrames.hrf,
      fighter.config.birdFrames.hrg
    ]
  },
  endHitRight: {
    runTimes: 1,
    framesPerStep: 1,
    frames: [
      fighter.config.birdFrames.hrd,
      fighter.config.birdFrames.hrd,
      fighter.config.birdFrames.hrd
    ]
  },
  revertHitRight: {
    runTimes: 1,
    framesPerStep: 1,
    frames: [
      fighter.config.birdFrames.hrc,
      fighter.config.birdFrames.hrb,
      fighter.config.birdFrames.hra
    ]
  },
  beginHitLeft: {
    runTimes: 1,
    framesPerStep: 3,
    frames: [
      fighter.config.birdFrames.hle,
      fighter.config.birdFrames.hlf,
      fighter.config.birdFrames.hlg
    ]
  },
  endHitLeft: {
    runTimes: 1,
    framesPerStep: 1,
    frames: [
      fighter.config.birdFrames.hld,
      fighter.config.birdFrames.hld,
      fighter.config.birdFrames.hld
    ]
  },
  revertHitLeft: {
    runTimes: 1,
    framesPerStep: 1,
    frames: [
      fighter.config.birdFrames.hlc,
      fighter.config.birdFrames.hlb,
      fighter.config.birdFrames.hla
    ]
  },
  getHit: {
    runTimes: 1,
    framesPerStep: 3,
    frames: [
      fighter.config.birdFrames.hurtA,
      fighter.config.birdFrames.hurtB,
      fighter.config.birdFrames.hurtB,
      fighter.config.birdFrames.hurtB,
      fighter.config.birdFrames.hurtA
    ]
  },
  test: {
    runTimes: 0,
    framesPerStep: 20,
    frames: [
      fighter.config.birdFrames.hurtA,
      fighter.config.birdFrames.hurtB,
      fighter.config.birdFrames.hurtB,
      fighter.config.birdFrames.hurtB,
      fighter.config.birdFrames.hurtA
    ]
  }
};
