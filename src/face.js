var timer;
var running = true;

var slopeX = 2;
var slopeY = 1;
var x = 1;

var $greeting = $('.greeting');
var $alex = $('.alex');

windowHeight = $(window).height() - $alex.width();
windowWidth = $(window).width() - $alex.width();

var startPos = function(){
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() - $('.alex').width();
  var startingHeight = Math.floor(Math.random() * h);
  return startingHeight;    
}

var y = startPos();

var reverse = function(direction) {
  return direction *= -1;
}

// really ugly function for bouncing my face
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

  $alex.css({ 
    left: (x+= slopeX)+'px', 
    bottom: (y+= slopeY)+'px' 
  });
}

var start = function() {
  timer = setInterval(bouncingBeauty, 10);
}

$(document).ready(function(){
  $alex.css('bottom', startPos() + 'px');
  $alex.css('visibility', 'visible');

  start();
})

$(window).on('resize', function() {
  windowHeight = $(window).height() - $('.alex').width();
  windowWidth = $(window).width() - $('.alex').width();
})

$alex.click(function() {
  if (running) {
    clearInterval(timer);

    var greetingPos = $greeting.position();
    var alexWidth = $alex.width();
    $alex.animate({
      left: $(window).width()/2 - alexWidth/2,
      bottom: $(window).height()/2 - alexWidth/2
    })

  }
  else {
    var currentFacePos = $alex.position();
    x = currentFacePos.left;
    y = currentFacePos.top;
    start();
  }
  running = !running;
  
  $greeting.toggleClass('-is--hidden'); 
  $alex.toggleClass('rotate');
});
