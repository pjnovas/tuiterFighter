
var socket = io.connect('http://localhost');
socket.on('tweet', function (data) {
	/*
	if((data.text.indexOf('pija') >= 0 || data.text.indexOf('poronga') >= 0) &&
		data.text.indexOf('gusta') >= 0)
	*/
  		console.log(data.text);
});
