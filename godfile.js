
var Tuiter = require("tuiter");

exports.init = function(user, emit){


	
	tu.filter({track: ['lol']}, function(stream){

	  // tweets :)
	  stream.on('tweet', emit); /* function(data){
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
 
