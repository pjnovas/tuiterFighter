var socket = io.connect('http://localhost'),
	counters = {};
	
socket.on('tweet', function (q) {
	if(!window.counters[q.keyword])
		window.counters[q.keyword] = 0;
	window.counters[q.keyword] ++;
	rebind();
	console.log(q);
});

$(document).on('ready', function(){
	$('#go').on('click', function(){
		$('#tweets').empty();
		window.counters = {};
		socket.emit('newSearch', $('#keywords').val().split(','));
	});
});

function rebind(){
	$('#tweets').empty();
	$.each(counters, function(e){
		$('<p>').text(e + ' : ' + this).appendTo('#tweets');
	});
}
