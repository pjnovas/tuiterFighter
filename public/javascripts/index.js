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
	if(!window.keywords[q.keyword]) {
		window.keywords[q.keyword] = {
			keyword: q.keyword,
			counter: 0,
			tweets: []
		};
	}
	
	window.keywords[q.keyword].counter++;
	window.keywords[q.keyword].tweets.push({
		text: q.data.text,
		user: {
			name: q.data.user.name,
			image: q.data.user.profile_image_url
		}
	});

	rebind();
});

$(document).on('ready', function(){

	$('#keywords').select2({tags:[]});

	$.get('partials/_keyWordContainer.html', function(templates) {
	  $('body').append(templates);
	});

	$('#go').on('click', function(){
		$('#tweets').empty();
		$('#bars').empty();
		tuiters.fight.reset();
		window.counters = {};
		$('section', '#results').remove();
		window.keywords = {};
		socket.emit('newSearch', $('#keywords').val().split(','));
	});

	$(window).resize(function(){
		$('.select2-container').css('width', '80%');
	});
});

function rebind(){
	$('section', '#results').remove();

	var keyLen = 0;
	$.each(window.keywords, function(e){
		var keyCtn = $.mustache($.trim($('#tuitKey-tmpl').html()), this);
		$(keyCtn).appendTo('#results');
		keyLen++;
	});

	//tuiters.render.horizontalBars();
	tuiters.render.verticalBars();
	var size = Math.floor(16 / keyLen);

	switch(size){
		case 1: size = "one"; break;
		case 2: size = "two"; break;
		case 3: size = "three"; break;
		case 4: size = "four"; break;
		case 5: size = "five"; break;
		case 6: size = "six"; break;
		case 7: size = "seven"; break;
		case 8: size = "eight"; break;
		case 16: size = "sixteen"; break;
	}

	$('section', '#results').addClass(size).addClass('alpha').addClass('columns')
}

function redondear(cantidad, decimales) {
	return Math.round(cantidad * Math.pow(10, decimales)) / Math.pow(10, decimales);
} 
function getRandomColor() {
	return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}
