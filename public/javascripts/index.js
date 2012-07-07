var tuiters = tuiters || {};

tuiters.fight = (function() {
	var fightResult = {};
	var total = 0

	return {
		getFightPercentage: function () {
			total++;
			$.each(counters, function(e){
				fightResult[e] = this*100/total;
			});
			return fightResult;
		},
		reset: function () {
			fightResult = {};
			total = 0; 
		}
	};
}) ();

tuiters.render = (function () {
	return {
		horizontalBars: function() {
			$.each(tuiters.fight.getFightPercentage(), function(e){
			var div = $('#' + e);

				if (!div.length) {
					div = $('<div id=' + e + '>');
					div.css('background-color',  getRandomColor());
					div.addClass('horizontalBar');
					div.appendTo('#bars');
				}

				div.text(e + ': ' + redondear(this, 2)) 
				div.css('width', this + '%');
			})
		},
		verticalBars: function() {
			$.each(tuiters.fight.getFightPercentage(), function(e){

				var div = $('#' + e);

				if (!div.length) {
					div = $('<div id=' + e + '>');
					div.css('background-color',  getRandomColor());
					div.addClass('verticalBar');

					div.appendTo($('<div id="contentBar' + e + '">').addClass('contentBar').appendTo('#bars'));
				}
				div.empty();
				var span = $('<span>');
				span.css('position', 'absolute');
				span.css('bottom', '10px');
				span.addClass('resultBarText');
				//span.text(e + ': ' + redondear(this, 2)).appendTo(div); 
				span.text(e).appendTo(div); 
				div.css('height', this + '%');
			})
		}
	};
}) ();

var socket = io.connect('http://localhost'),
	counters = {};
	
socket.on('tweet', function (q) {
	if(!window.counters[q.keyword])
		window.counters[q.keyword] = 0;
	window.counters[q.keyword] ++;
	rebind();
});

$(document).on('ready', function(){

	$('#keywords').select2({tags:[]});

	$('#go').on('click', function(){
		$('#tweets').empty();
		$('#bars').empty();
		tuiters.fight.reset();
		window.counters = {};
		socket.emit('newSearch', $('#keywords').val().split(','));
	});
});

function rebind(){
	$('#tweets').empty();
	$.each(counters, function(e){
		$('<p>').text(e + ' : ' + this).appendTo('#tweets');
	});

	//tuiters.render.horizontalBars();
	tuiters.render.verticalBars();
}

function redondear(cantidad, decimales) {
	return Math.round(cantidad * Math.pow(10, decimales)) / Math.pow(10, decimales);
} 
function getRandomColor() {
	return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}