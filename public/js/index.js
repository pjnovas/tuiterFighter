
var socket = io.connect('http://localhost');

socket.on('start', function (init) {

  function checkQueue(q){
    if(q.length >= init.config.maxQueue){
      manageGO(true, 'Figths Queue is full, wait for current fight to end');
    }
    else manageGO(false);
  }

	fighter.manager.on('ready', function(){
    checkQueue(init.queue);

    fighter.manager.update(init.current);
    fighter.manager.updateQueue(init.queue);

		socket.on('change', function(state){
			fighter.manager.update(state);
		});

    socket.on('clockTick', function(time){
      fighter.manager.clockTick(time);
    });

    socket.on('queueUpdated', function (queue) {
      fighter.manager.updateQueue(queue);
      checkQueue(queue);
    });

	}).load('canvasFight', init.config);

});

function manageGO(disabled, why){
  var txtLeft = $('#wordLeft'), 
    txtRight = $('#wordRight'),
    lockedMsg = 'LOCKED';

  function onGoClick(e){
    var wLeft = txtLeft.val(),
      wRight = txtRight.val();

    socket.emit('addFight', [wLeft, wRight]);
    
    txtLeft.val('');
    txtRight.val('');
  }

  if (disabled) {
    $('#go').off('click').hide();
    
    txtLeft.add(txtRight)
      .addClass('locked')
      .val(lockedMsg)
      .attr('readonly', true)
      .attr('title', why);
  }
  else {
    $('#go').off('click').on('click', onGoClick).show();
    
    txtLeft.add(txtRight)
      .removeClass('locked')
      .val('')
      .attr('readonly', false)
      .attr('title', '');
  }
}