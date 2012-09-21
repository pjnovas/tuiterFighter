var events = require('events'),
  fightStates = require('./fightStates.js');

function Fight(options){
  this.tu = options.tuitter;

  this.tweetsQ = options.tweetsQ || 2;
  this.keys = options.keywords;
  this.taker = options.lifeTaker || 2;
  this.stream = null;
  this.last = {
    left: 1,
    right: 1
  };
  
  this.birds = {
    left: {
      word: this.keys[0].toLowerCase(),
      life: 100,
      tweets: [],
      hit: false
    },
    right: {
      word: this.keys[1].toLowerCase(),
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
  var self = this,
    rgLeft = new RegExp("\\b" + self.birds.left.word.toLowerCase() + "\\b",'i'),
    rgRight = new RegExp("\\b" + self.birds.right.word.toLowerCase() + "\\b",'i'),
    count = 0;

  stream.on('tweet', function(data){
    var twText = data.text,
      isLeft = false,
      isRight = false,
      which = '',
      oposite = '';

    if (rgLeft.test(twText)) {
      isLeft = true;
      which = 'left';
      oposite = 'right';
    }

    if (rgRight.test(twText)) {
      isRight = true;
      which = 'right';
      oposite = 'left';
    }

    if (!(isLeft && isRight) || (!isLeft && !isRight)) {

      var curr = (self.last[which] === 0) ? 1: 0;
      self.last[which] = curr;

      self.birds[which].tweets[curr] = {
        text: twText,
        user: {
          name: data.user.screen_name,
          image: data.user.profile_image_url
        }
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