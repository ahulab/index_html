var timer;
var running = true;

var slopeX = 2;
var slopeY = 1;
var x = 1;

var $greeting = $('.greeting');
var $bouncing_image = $('.bouncing_image');

windowHeight = $(window).height() - $bouncing_image.width();
windowWidth = $(window).width() - $bouncing_image.width();

var startPos = function(){
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() - $('.bouncing_image').width();
  var startingHeight = Math.floor(Math.random() * h);
  return startingHeight;    
}

var y = startPos();

var reverse = function(direction) {
  return direction *= -1;
}

// really ugly function for bouncing the image
var bouncingBeauty = function() {
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

  $bouncing_image.css({ 
    left: (x+= slopeX)+'px', 
    bottom: (y+= slopeY)+'px' 
  });
}

var start = function() {
  timer = setInterval(bouncingBeauty, 10);
}

$(document).ready(function(){
  $bouncing_image.css('bottom', startPos() + 'px');
  $bouncing_image.css('visibility', 'visible');

  start();
})

$(window).on('resize', function() {
  windowHeight = $(window).height() - $('.bouncing_image').width();
  windowWidth = $(window).width() - $('.bouncing_image').width();
})

$bouncing_image.click(function() {
  if (running) {
    clearInterval(timer);

    var greetingPos = $greeting.position();
    var imgWidth = $bouncing_image.width();
    $bouncing_image.animate({
      left: $(window).width()/2 - imgWidth/2,
      bottom: $(window).height()/2 - imgWidth/2
    })

  }
  else {
    var currentImgPos = $bouncing_image.position();
    x = currentImgPos.left;
    y = currentImgPos.top;
    start();
  }
  running = !running;
  
  $greeting.toggleClass('-is--hidden'); 
  $bouncing_image.toggleClass('rotate');
});
