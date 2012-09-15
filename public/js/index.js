
var socket = io.connect('http://localhost');

socket.on('start', function (config) {
	
	fighter.manager.on('ready', function(){

		socket.on('change', function(state){
			console.dir(state);
			fighter.manager.update(state);
		});

	}).load('canvasFight', config);

});

$(function(){

  $('#keywords').select2({tags:[]});

  $.get('partials/_keyWordContainer.html', function(templates) {
    $('body').append(templates);
  });

  $('#go').on('click', function(){
    socket.emit('addFight', $('#keywords').val().split(','));
    $('#keywords').val('').select2({tags:[]}).val('');
  });

});

