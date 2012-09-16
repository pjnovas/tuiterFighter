
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

  $('#go').on('click', function(){

    var wLeft = $('#wordLeft').val(),
      wRight = $('#wordRight').val();

    socket.emit('addFight', [wLeft, wRight]);
    
    $('#wordLeft').val('');
    $('#wordRight').val('');    
  });

});

