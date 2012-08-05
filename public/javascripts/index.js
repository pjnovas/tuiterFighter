
var socket = io.connect('http://localhost');

socket.on('tweet', function (keyword) {
  var key = keyword.keyword;
  window.keywords[key] = keyword;
  
  calculatePercentages();
  rebind();
});

socket.on('tick', function (clock) {
  var ms = clock.time - clock.current;

  if (ms < 0){
    $('#clock').text('00:00');
    return;
  }

  var x = ms / 1000;

  var seconds = x % 60;
  x /= 60;
  var minutes = Math.floor(x % 60);

  function ftNum(num){
    return (num < 10) ? "0" + num: num; 
  }

  $('#clock').text(ftNum(minutes) + ':' + ftNum(seconds));
});

socket.on('start', function (status) {
  bindQueue(status.queueFights);

  keywords = status.currentFight;
  window.keywords = {};
  $('section', '#results').remove();

  window.keywords = keywords;

  $('#clock').text('00:00');
  
  rebind();
});

socket.on('finish', function (winner) {
  console.log('THE WINNER IS!!! ------->' + winner.keyword);
});
 
socket.on('fightAdded', function (queue) {
  bindQueue(queue);
});

function calculatePercentages() { 
  total = 0;
  for(var i in window.keywords) {
    total += window.keywords[i].counter || 0;
  }

  for(var i in window.keywords) {
    window.keywords[i].percentage = 
      roundIt(window.keywords[i].counter*100/total, 0);
  }
}

function bindQueue(queue){
  var ul = $('#nextFights');
  $('li', ul).remove();

  var lis = $.mustache($.trim($('#queueFights-tmpl').html()), {fights: queue});
  $(lis).appendTo(ul);
}

$(document).on('ready', function(){
  window.keywords = {};
  $('#keywords').select2({tags:[]});

  $.get('partials/_keyWordContainer.html', function(templates) {
    $('body').append(templates);
  });

  $('#go').on('click', function(){
    socket.emit('addFight', $('#keywords').val().split(','));
    $('#keywords').val('').select2({tags:[]}).val('');
  });

  $(window).resize(function(){
    $('.select2-container').css('width', '80%');
  });

  $(document).on('click', 'ul.tweets li', function(){
    var $tweet = $(this);
    $('.floatingTw').remove();
    var div = $('<div>').addClass('floatingTw').append($tweet.html());
    div.click(function(){
      $(this).remove();
    });

    $('body').append(div);
  });
});

function rebind(){

  var keyLen = 0;
  $.each(window.keywords, function(e){

    var seccion = $('#sec' + this.keyword);
    if(!seccion.length) {
      var keyCtn = $.mustache($.trim($('#seccionKey-tmpl').html()), this);
      var tuitKeyCtn = $.mustache($.trim($('#tuitKey-tmpl').html()), this);
      $(keyCtn).appendTo('#results');
      $(tuitKeyCtn).appendTo($('#tuitDiv' + this.keyword));
    }
    else {
      $('#tuitDiv' + this.keyword).empty();
      var tuitKeyCtn = $.mustache($.trim($('#tuitKey-tmpl').html()), this);
      $(tuitKeyCtn).appendTo($('#tuitDiv' + this.keyword));

      $('#bar' + this.keyword).css('height', this.percentage + '%');
      $('#bar' + this.keyword).text((this.percentage || 0) + '%');
    }

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

  $('section', '#results').removeClass();
  $('section', '#results').addClass(size).addClass('alpha').addClass('columns');
}

function roundIt(amm, dec) {
  return Math.round(amm * Math.pow(10, dec)) / Math.pow(10, dec);
} 


