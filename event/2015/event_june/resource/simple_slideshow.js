$(function() {
  var setImg = '#slide';
  var fadeSpeed = 1200;
  var switchDelay = 4000;

  $(setImg).children('img').css({opacity: '0'});
  $(setImg + ' img:first')
      .stop().animate({opacity: '1', zIndex: '20'}, fadeSpeed);

  setInterval(function() {
    $(setImg + ' :first-child').animate({opacity: '0'}, fadeSpeed)
        .next('img').animate({opacity: '1'}, fadeSpeed)
        .end().appendTo(setImg);
  }, switchDelay);
});// http://sedoriplan.com/jquery-fadein-fadeout-image/
