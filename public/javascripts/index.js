var tuiters = tuiters || {};

tuiters.fight = (function() {
  var fightResult = {};
  var total = 0

  return {
    getFightPercentage: function (keywords, keyword) { 
      total++;

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

socket.on('tweet', function (q) {
  console.log(q);
  window.keywords[q.keyword] = q;  
  window.keywords[q.keyword].percentage = redondear(tuiters.fight.getFightPercentage(window.keywords, q.keyword), 0);
  
  //tuiters.render.horizontalBars(window.keywords[q.keyword]);
  //tuiters.render.verticalBars(window.keywords[q.keyword]);
  rebind();
});

$(document).on('ready', function(){

  $('#keywords').select2({tags:[]});

  $.get('partials/_keyWordContainer.html', function(templates) {
    $('body').append(templates);
  });

  $('#go').on('click', function(){
    window.keywords = {};
    $('section', '#results').remove();
    socket.emit('addFight', $('#keywords').val().split(','));
  });

  $(window).resize(function(){
    $('.select2-container').css('width', '80%');
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
      $('#bar' + this.keyword).text(this.percentage + '%');
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

function redondear(cantidad, decimales) {
  return Math.round(cantidad * Math.pow(10, decimales)) / Math.pow(10, decimales);
} 


