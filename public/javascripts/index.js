var tuiters = tuiters || {};

tuiters.fight = (function() {
  var fightResult = {};
  var total = 0

  return {
    getFightPercentage: function (keywords, keyword) { 
      total = 0;
      for(var i in keywords) total += keywords[i].counter || 0;

      fightResult[keyword.keyword] = keywords[keyword].counter*100/total;
      return fightResult[keyword.keyword];
    },
    reset: function () {
      fightResult = {};
      total = 0; 
    }
  };
}) ();

var socket = io.connect('http://localhost');

socket.on('tweet', function (keyword) {
  var key = keyword.keyword;
  window.keywords[key] = keyword;
  
  var p = tuiters.fight.getFightPercentage(window.keywords, key);
  window.keywords[key].percentage = roundIt(p, 0);
  
  rebind();
});

socket.on('tick', function (clock) {
  var ms = clock.time - clock.current;
  var x = ms / 1000;

  var seconds = x % 60;
  x /= 60;
  var minutes = Math.floor(x % 60);
  /*x /= 60;
  hours = x % 24;
  x /= 24;
  days = x;*/

  $('#clock').text(minutes + ' : ' + seconds);
});

socket.on('start', function (keywords) {
  window.keywords = {};
  $('section', '#results').remove();
  console.log(keywords);
  window.keywords = keywords;

  $('#clock').text('000000');
  
  rebind();
});

socket.on('finish', function (winner) {
  console.log('THE WINNER IS!!! ------->' + winner.keyword);
});
 
socket.on('fightAdded', function (nextFights) {

});


$(document).on('ready', function(){
  window.keywords = {};
  $('#keywords').select2({tags:[]});

  $.get('partials/_keyWordContainer.html', function(templates) {
    $('body').append(templates);
  });

  $('#go').on('click', function(){
    socket.emit('addFight', $('#keywords').val().split(','));
    $('#keywords').select2({tags:[]}).val('');
  });

  $(window).resize(function(){
    $('.select2-container').css('width', '80%');
  });

  $(document).on('click', 'ul.tweets li', function(){
    var $tweet = $(this);
    $('.floatingTw').remove();
    var div = $('<div>').addClass('floatingTw').append($tweet.html());
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


