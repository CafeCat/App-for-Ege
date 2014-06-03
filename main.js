var settings = {
  rows: 3,
  columns: 5,
  viewWidth: 0,
  viewHeight: 0,
  pieceTemplate: '',
  cards:null,
  cellWidth: function(){
    return settings.viewWidth/settings.columns;
  },
  cellHeight: function(){
    return settings.viewHeight/settings.rows;
  }
};
var ani = {
  crtCellInx:0,
  aniInterval:null,
  crtCardIndex:0
};
$(document).ready(function() {
  settings.viewWidth = $('#myView').width();
  settings.viewHeight = $('#myView').height();
  settings.pieceTemplate = $('#myView').find('div.template:first-child').prop('outerHTML');
  $.get('cards.json',function(data){
    settings.cards = data;
    console.log(data);
    loadCard(ani.crtCardIndex);
  });
  
  setTimeout(function(){ 
    startAnimation();
  },200);
  
  function startAnimation(){
    ani.aniInterval = setInterval(function(){
      $('#myView').find('.card:eq('+ani.crtCellInx+')').addClass('flipped');
      ani.crtCellInx++;
      if(ani.crtCellInx>(settings.columns*settings.rows)-1){
        //clearInterval(ani.aniInterval);
        ani.crtCellInx=0;
        ani.crtCardIndex++;
        console.log(ani.crtCardIndex+" "+Object.keys(settings.cards).length);
        if(ani.crtCardIndex===Object.keys(settings.cards).length){
          ani.crtCardIndex = 0;
          console.log("reset");
        }
        loadNextCard(ani.crtCardIndex);
      }
    },100);
  }
  
  function loadCard(cardIndex){
    $('#myView').empty();
    var piece = '';
    console.log(settings.cards[cardIndex]);
    for (var i = 0; i < (settings.columns * settings.rows); i++) {
      piece = $(settings.pieceTemplate);
      $(piece).css({
        'width':settings.cellWidth()+'px',
        'height':settings.cellHeight()+'px'
      });
      $(piece).find('.front').append('<img src="cardSlices/c' + i + settings.cards[cardIndex][0] + '" style="width:' + settings.cellWidth() + 'px;height:' + settings.cellHeight() + 'px"/>');
      $(piece).find('.back').append('<img src="cardSlices/c' + i + settings.cards[cardIndex][1] + '" style="width:' + settings.cellWidth() + 'px;height:' + settings.cellHeight() + 'px"/>');
      $('#myView').append($(piece).prop('outerHTML'));
    }
  }
  function loadNextCard(cardIndex){
    var image = settings.cards[cardIndex];
    var pw = settings.viewWidth / settings.columns;
    var ph = settings.viewHeight / settings.rows;
    var index=0;
    
    $('.card').removeClass('flipped');
    $('.card img').css({
      'width':pw+'px',
      'height':ph+'px'
    });
    
    $('#myView').find('.card').each(function(){
//      console.log(index+" "+cardIndex);
      $(this).find('.front img').attr('src','cardSlices/c'+ index + settings.cards[cardIndex][0]);
      $(this).find('.back img').attr('src','cardSlices/c'+ index + settings.cards[cardIndex][1]);
      //$(this).removeClass('flipped');
      index++;
    });
  }

});



