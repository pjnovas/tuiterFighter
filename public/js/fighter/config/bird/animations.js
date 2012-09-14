
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
