
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

