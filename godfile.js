/*
var Tuiter = require("tuiter"),
  tu = new Tuiter(require('./twitterKey.json'));
  
exports.goAhead = function(keywords, emit) {
  var stream;

  function fight(_stream){
    stream = _stream;

    stream.on('tweet', function(data){
      for(var i = 0; i < keywords.length; i++){
        if(data.text.indexOf(keywords[i])>=0) {
          emit(keywords[i], data);  
        }
      } 
    });

    stream.on('error', function(err){
      console.log('tuiter error');
      console.dir(err);
    });
  }

  if (!stream) {
    tu.filter({track: keywords}, fight);
  }
  else {
    stream.emit('restart', {track: keywords});
  }

};
 
*/