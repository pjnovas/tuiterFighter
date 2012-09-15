
var socket = io.connect('http://localhost');

socket.on('start', function (init) {

	fighter.manager.on('ready', function(){
    fighter.manager.update(init.current);

		socket.on('change', function(state){
			fighter.manager.update(state);
		});

    socket.on('clockTick', function(time){
      fighter.manager.clockTick(time);
    });

	}).load('canvasFight', init.config);

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

