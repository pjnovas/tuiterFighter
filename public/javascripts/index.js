
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

	$('#keywords').select2({tags:[]});

	$('#go').on('click', function(){
		$('#tweets').empty();
		window.counters = {};
		socket.emit('newSearch', $('#keywords').val().split(','));
	});

	$(window).resize(function(){
		$('.select2-container').css('width', '80%');
	});
});

function rebind(){
	$('*', '#tweets').remove();
	$.each(counters, function(e){
		$('<p>').text(e + ' : ' + this).appendTo('#tweets');
	});
}
