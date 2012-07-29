var events = require('events');

function Fight(options){
  this.tu = options.tuitter;

  this.keys = options.keywords;
  this.keywords = {};  
  for (var i=0; i<options.keywords.length; i++) {
    var key = options.keywords[i];
    
    this.keywords[key] = {
      keyword: key,
      counter: 0,
      color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
      tweets: []
    };
  }

  this.clock = {
    time: options.fightTime,
    current: 0,
    startTime: null,
    endTime: null
  };

  this.timer;
}

module.exports = Fight;
Fight.prototype = new events.EventEmitter;

Fight.prototype.start = function(){
  var self = this;

  if (!self.stream){
    self.tu.filter({track: self.keys}, function(stream){
      streaming.call(self, stream);
    });
  }
  else {
    self.stream.emit('restart', {track: self.keys});
  }

  self.clock.startTime = new Date();

  self.timer = setInterval(function(){
    self.clock.current+=1000;
    if (self.clock.current > self.clock.fightTime){
      self.stream.emit('end');
      clearInterval(self.timer);
      self.clock.endTime = new Date();
      self.emit('finish', self.keywords);
    }
  }, 1000);

};

function streaming(stream){
  var self = this;

  stream.on('tweet', function(data){

    for(var key in self.keywords){

      if(data.text.indexOf(self.keywords[key].keyword) >= 0){
        
        self.keywords[key].counter++;

        self.keywords[key].tweets.unshift({
          text: data.text,
          user: {
            name: data.user.screen_name,
            image: data.user.profile_image_url
          }
        });

        if (self.keywords[key].tweets.length > 5) {
          self.keywords[key].tweets.pop();  
        }

        self.emit('tweet', self.keywords[key]);
      }
    }

  });

  stream.on('error', function(err){
    console.log(err);
  });
}