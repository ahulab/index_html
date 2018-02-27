var startPos = function(){
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() - $('.alex').width();
  var startingHeight = Math.floor(Math.random() * h);
  return startingHeight;    
}

var reverse = function(direction) {
  return direction *= -1;
}

$(document).ready(function(){
  $('.alex').css('bottom', startPos() + 'px');
  $('.alex').css('visibility', 'visible');

  var slopeX = 2;
  var slopeY = 1;
  var x = 1;
  var y = startPos();

  // really ugly function for bouncing my face
  bouncingBeauty = function() {
    if (x > windowWidth) {
      x = windowWidth;
      slopeX = reverse(slopeX);
    }
    else if (x < 0) {
        x = 0;
        slopeX = reverse(slopeX);
    } 
    else if (y > windowHeight) {
      y = windowHeight;
      slopeY = reverse(slopeY);
    }
    else if (y < 0) {
      y = 0;
      slopeY = reverse(slopeY);
    }
    $('.alex').css({ left: (x+= slopeX)+'px', bottom: (y+= slopeY)+'px' });
  }

  windowHeight = $(window).height() - $('.alex').width();
  windowWidth = $(window).width() - $('.alex').width();

  setInterval(bouncingBeauty, 3)
});

$(window).on('resize', function() {
  windowHeight = $(window).height() - $('.alex').width();
  windowWidth = $(window).width() - $('.alex').width();
})