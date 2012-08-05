var events = require('events');

function Fight(options){
  this.tu = options.tuitter;

  this.tweetsQ = options.tweetsQ || 3;
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

}

module.exports = Fight;
Fight.prototype = new events.EventEmitter;

Fight.prototype.start = function(){
  var self = this;

  if (!self.stream){
    self.tu.filter({track: self.keys}, function(stream){
      self.stream = stream;
      streaming.call(self, stream);
    });
  }
  else {
    self.stream.emit('restart', {track: self.keys});
  }

};

Fight.prototype.stop = function(){
  this.stream.emit('end');
  this.emit('finish', getWinner.call(this));
};

function getWinner(){
  var max = -1,
    winner = {};

  for (var key in this.keywords){
    var keyw = this.keywords[key];
    if (keyw.counter > max){
      max = keyw.counter;
      winner = keyw;
    }
  }

  return winner;
}

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

        if (self.keywords[key].tweets.length > self.tweetsQ) {
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