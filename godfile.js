
var Tuiter = require("tuiter");


	
exports.goAhead = function(keywords, emit){
		var tu = new Tuiter(require('./twitterKey.json'));
	
	tu.filter({track: keywords}, function(stream){

	  // tweets :)
	  stream.on('tweet', function(data){
	  	for(var i = 0; i < keywords.length; i++){
	  		if(data.text.indexOf(keywords[i])>=0)
	  			emit(keywords[i], data);	
	  	}	
	  	
	  }); /* function(data){
	    //res.send(data);
	  });*/
	
	  // deleted statuses data
	  stream.on('delete', function(del){
	    //console.log(del);
	  });
	
	  // errors
	  stream.on('error', function(err){
	    console.log(err);
	  });
	});

};
 
