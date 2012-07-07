
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
	console.log(q);
});

$(document).on('ready', function(){

	$('#keywords').select2({tags:[]});

	$.get('partials/_keyWordContainer.html', function(templates) {
	  $('body').append(templates);
	});

	$('#go').on('click', function(){
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
