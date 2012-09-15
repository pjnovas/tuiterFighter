var events = require('events'),
  fightStates = require('./fightStates.js');

function Fight(options){
  this.tu = options.tuitter;

  this.tweetsQ = options.tweetsQ || 2;
  this.keys = options.keywords;
  this.taker = options.lifeTaker || 2;
  this.stream = null;

  this.birds = {
    left: {
      word: this.keys[0],
      life: 100,
      tweets: [],
      hit: false
    },
    right: {
      word: this.keys[1],
      life: 100,
      tweets: [],
      hit: false
    }
  };
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
  this.emit('finish');
};

Fight.prototype.getBirds = function(){
  return this.birds;
};

function streaming(stream){
  var self = this;

  stream.on('tweet', function(data){
    var twText = data.text,
      isLeft = false,
      isRight = false,
      which = '',
      oposite = '';

    if (twText.indexOf(self.birds.left.word) >= 0){
      isLeft = true;
      which = 'left';
      oposite = 'right';
    }

    if (twText.indexOf(self.birds.right.word) >= 0) {
      isRight = true;
      which = 'right';
      oposite = 'left';
    }

    if (!(isLeft && isRight) || (!isLeft && !isRight)) {

      self.birds[which].tweets.unshift({
        text: twText,
        user: {
          name: data.user.screen_name,
          image: data.user.profile_image_url
        }
      });

      if (self.birds[which].tweets.length > self.tweetsQ) {
        self.birds[which].tweets.pop();  
      }
      
      self.birds[oposite].life -= self.taker;

      self.birds[which].hit = true;
      
      self.emit('tweet', {
        state: fightStates.tweet,
        birds: self.birds
      });
      
      self.birds[which].hit = false;

      if (self.birds[oposite].life <= 0){
        self.birds[oposite].life = 0;
        self.stop();
      }
    }

  });


  stream.on('error', function(err){
    //console.log('Tuiter Error' + err);
    //console.dir(err);
  });

}