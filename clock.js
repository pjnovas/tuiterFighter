
var events = require('events');

function Clock(_time){
  this.time = _time; //in miliseconds
  this.current = 0;
  this.startTime = null;
  this.endTime = null;

  this.step = 1000; //a second
  this.timer;
}

module.exports = Clock;
Clock.prototype = new events.EventEmitter;

Clock.prototype.start = function(){
	var self = this;

	self.stop();
	self.startTime = new Date();

  self.timer = setInterval(function(){

    self.current += self.step;
    self.emit('tick', {
	    time: self.time,
	    current: self.current,
	    startTime: self.startTime
	  });
    
    if (self.current > self.time){
			clearInterval(self.timer);
			self.endTime = new Date();
      
      self.emit('timeup');
    }
  }, self.step);

};

Clock.prototype.stop = function(){
	clearInterval(this.timer);
	this.current = 0;
	this.endTime = new Date();
};

